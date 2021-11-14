const bodyPaymentSchemaInit = {
  sourceId: '',
  locationId: '',
  orderId: undefined,
  buyerEmailAddress: undefined,
  referenceId: undefined,
  note: undefined,
  amount: undefined,
  currency: undefined,
  idempotencyKey: undefined,
  verificationToken: undefined,
};

const lineItemSchema = {
  name: '',
  quantity: '0',
  note: '',
  itemType: 'ITEM', //ALWAYS ITEM
  basePriceMoney: {
    amount: 0,
    currency: 'USD', //USD OR QAR
  },
};

const bodyOrderSchemaInit = {
  locationId: '',
  referenceId: '',
  lineItems: [lineItemSchema],
};

const reqBodyPaymentSchema = (req) => {
  let body = bodyPaymentSchemaInit;

  body.sourceId = req.body.sourceId ? req.body.sourceId : '';
  body.locationId = req.body.locationId ? req.body.locationId : '';
  body.orderId = req.body.orderId ? req.body.orderId : undefined;

  body.amount = req.body.amount ? req.body.amount : undefined;
  body.currency = req.body.currency ? req.body.currency : undefined;
  body.idempotencyKey = req.body.idempotencyKey ? req.body.idempotencyKey : undefined;
  body.verificationToken = req.body.verificationToken ? req.body.verificationToken : undefined;

  if (body.sourceId === '' || body.locationId === '' || body.orderId === undefined) {
    throw new Error('Invalid body content. Please check source Id, location Id and order id');
  }

  return body;
};

const reqBodyOrderSchema = (req) => {
  let body = bodyOrderSchemaInit;

  body.locationId = req.body.locationId ? req.body.locationId : '';
  body.referenceId = req.body.referenceId ? req.body.referenceId : undefined;
  body.lineItems = req.body.lineItems ? req.body.lineItems : [];

  if (body.referenceId === '' || body.locationId === '') {
    throw new Error('Invalid body content. Please check reference id or location id.');
  }

  return body;
};

module.exports = { reqBodyPaymentSchema, bodyPaymentSchemaInit, reqBodyOrderSchema, bodyOrderSchemaInit };
