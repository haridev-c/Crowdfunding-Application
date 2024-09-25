const express = require("express");

const authenticate = require("../middlewares/authentication.middleware");
const {
  createOrder,
  verifyPayments,
} = require("../controllers/payment.controller");
const paymentRouter = express.Router();

paymentRouter.post("/create-order", authenticate, createOrder);
paymentRouter.post("/verify-payment", authenticate, verifyPayments);

module.exports = paymentRouter;
