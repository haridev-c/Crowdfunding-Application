const express = require("express");

const { authenticate } = require("../controllers/auth.controller");
const {
  createOrder,
  verifyPayments,
} = require("../controllers/payment.controller");
const paymentRouter = express.Router();

paymentRouter.post("/create-order", authenticate, createOrder);
paymentRouter.post("/verify", authenticate, verifyPayments);

module.exports = paymentRouter;
