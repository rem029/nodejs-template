const { response, request } = require('express');
const retry = require('async-retry');
const { nanoid } = require('nanoid');
const JSONbig = require('json-bigint');
const firebase = require('../__services/firebase');

const logger = require('../__helpers/logger');
const { ApiError, square } = require('../__services/square');
const { validateBodyOrderSchema } = require('../__helpers/validateBodySchema');

const fs = firebase.firestore();
const fsCollectionFines = fs.collection('fines');

const schemaFines = {
  orderItems: {}, //object
  orderId: '', //string
  orderIndex: [], //array of strings
  plateNumber: '', //string
};

exports.createOrder = async (res = response, req = request) => {
  await retry(async (bail, attempt) => {
    try {
      if (attempt > 10) return res.status(400).send('Could not complete operation.');
      const bodyOrder = await validateBodyOrderSchema(req);

      logger.info(`Creating order ${attempt}`);
      logger.info(`Creating order for ${JSON.stringify(bodyOrder)}`);

      // const idempotencyKey = bodyPayment.idempotencyKey || nanoid();
      const idempotencyKey = nanoid();
      const order = {
        order: {
          locationId: bodyOrder.locationId,
          referenceId: bodyOrder.referenceId,
          lineItems: bodyOrder.lineItems,
        },
        idempotencyKey,
      };

      const { result, statusCode } = await square.ordersApi.createOrder(order);

      logger.info(`Order Created ${result.order.netAmounts.totalMoney.amount}`);

      //saving to firestore starts here
      const newFineToInsert = fsCollectionFines.doc();

      const newFineSchema = { ...schemaFines };
      newFineSchema.orderIndex = ['strings from order name'];
      newFineSchema.orderId = result.order.id;
      newFineSchema.orderItems = result.order.lineItems;
      newFineSchema.plateNumber = result.order.referenceId;

      await newFineToInsert.set(newFineSchema);

      logger.info(`Order saved to firestore for ${result.order.referenceId}`);
      //saving to firestore ends here

      const orderResponse = {
        status: statusCode,
        success: true,
        order: JSON.parse(JSONbig.stringify(result.order)),
      };

      return res.status(200).send(orderResponse);
    } catch (error) {
      logger.error(`error while creating order ${error}`);

      if (error instanceof ApiError) {
        logger.error(error.errors);
        bail(error);
        return res.status(400).send(error.message);
      } else {
        logger.error(`Error creating order on attempt ${attempt}: ${ex}`);
        throw error;
      }
    }
  });
};
