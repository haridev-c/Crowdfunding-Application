const Razorpay = require("razorpay");
const crypto = require("crypto");

//create orders
const createOrder = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started createOrders func in payment.controller.js file");
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log("Error creating order");
        console.log(error);
        return res.json({ success: false, serverMsg: "Error creating order" });
      } else {
        res.json({
          success: true,
          serverMsg: "Order created successfully",
          order,
        });
      }
    });
  } catch (error) {
    console.log(
      "Some error occured in createOrder func in payments.controller.js file"
    );
    console.log(error);
    res.json({ success: false, serverMsg: "Internal server error" });
  }
};

//verify payments
const verifyPayments = async (req, res) => {
  console.log("- - - - - - - - - - - - - - - ");
  console.log("Started verifyPayments func in payment.controller.js file");
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    console.log("Verifying signatures");
    if (razorpay_signature === expectedSign) {
      console.log("Signature verified; sending success response");
      return res.json({
        success: true,
        serverMsg: "payment verified successfully",
      });
    } else {
      console.log("Signature verification failed; sending failure response");
      return res.json({
        success: false,
        serverMsg: "Payment verification failed",
      });
    }
  } catch (error) {
    console.log(
      "Some error occured in verifyPayments func in payment.controller.js file"
    );
    console.log(error);
    res.json({ success: false, serverMsg: "Internal server error" });
  }
};

module.exports = { createOrder, verifyPayments };
