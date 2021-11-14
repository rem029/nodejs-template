const { response, request } = require("express");
const retry = require("async-retry");
const { nanoid } = require("nanoid");

const now = require("../__helpers/now");
const logger = require("../__helpers/logger");
const { ApiError, square } = require("../__services/square");
const { validateBodyPaymentSchema } = require("../__helpers/validateBodySchema");

exports.createPayment = async (res = response, req = request) => {
  await retry(async (bail, attempt) => {
    try {
      if (attempt > 10) return res.status(400).send("Could not complete operation.");
      const bodyPayment = await validateBodyPaymentSchema(req);

      console.log(bodyPayment);
      logger.info(`Creating payment ${attempt}`);

      logger.info("Setting up payment");
      const idempotencyKey = bodyPayment.idempotencyKey || nanoid();
      const payment = {
        idempotencyKey,
        locationId: bodyPayment.locationId,
        sourceId: bodyPayment.sourceId,
        // While it's tempting to pass this data from the client
        // Doing so allows bad actor to modify these values
        // Instead, leverage Orders to create an order on the server
        // and pass the Order ID to createPayment rather than raw amounts
        // See Orders documentation: https://developer.squareup.com/docs/orders-api/what-it-does
        buyerEmailAddress: "elawrenceponce@gmail.com",
        note: "PLATE_XXXX123456 paid for violation",
        billingAddress: {
          addressLine1: "Doha, Qatar",
          addressLine2: "",
          addressLine3: "",
          firstName: "TestFirstName",
          lastName: "TestLastName",
          email: "email@email.com",
        },
        orderId: bodyPayment.orderId,
        amountMoney: {
          // the expected amount is in cents, meaning this is $1.00.
          amount: bodyPayment.amount,
          // If you are a non-US account, you must change the currency to match the country in which
          // you are accepting the payment.
          currency: bodyPayment.currency,
        },
      };

      console.log("payment settings", payment);

      // VerificationDetails is part of Secure Card Authentication.
      // This part of the payload is highly recommended (and required for some countries)
      // for 'unauthenticated' payment methods like Cards.

      if (bodyPayment.verificationToken) {
        payment.verificationToken = bodyPayment.verificationToken;
      }

      logger.info("Initializing payment");

      const { result, statusCode } = await square.paymentsApi.createPayment(payment);
      logger.info("Payment succeeded!", { result, statusCode });
      console.log("Payment succeeded!", { ...result });
      const paymentResponse = {
        status: statusCode,
        success: true,
        payment: {
          id: result.payment.id,
          status: result.payment.status,
          receiptUrl: result.payment.receiptUrl,
          orderId: result.payment.orderId,
        },
      };

      return res.status(200).json(paymentResponse);
    } catch (error) {
      console.log(error.errors);
      logger.error(`error while making payment ${error}`);

      if (error instanceof ApiError) {
        logger.error(`payment error ${JSON.parse(error)}`);
        bail(JSON.stringify(error.errors));
        return res.status(400).json(error.message);
      } else {
        logger.error(`Error creating payment on attempt ${attempt}: ${error}`);
        throw error;
      }
    }
  });
};
