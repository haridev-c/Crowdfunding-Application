// third-party libraries
require("console-stamp")(console, {
  format: ":date(yyyy/mm/dd HH:MM:ss.l)",
});
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//custom modules
const userRouter = require("./routers/userRouter");
const campaignRouter = require("./routers/campaignRouter");
const paymentRouter = require("./routers/paymentRouter");
const donationRouter = require("./routers/donationRouter");

const app = express();

// middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://sparkfund.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes setup
app.use("/user", userRouter);
app.use("/campaign", campaignRouter);
app.use("/payments", paymentRouter);
app.use("/donation", donationRouter);

// database connection
mongoose.connect(process.env.CONN_STRING).then(console.log("Connected to db"));

// opening up port
app.listen(5050, () => {
  console.log("Server listening at http://localhost:5050");
});
