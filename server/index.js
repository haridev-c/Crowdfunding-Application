const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

//router imports
const userRouter = require("./routers/userRouter");
const campaignRouter = require("./routers/campaignRouter");
const paymentRouter = require("./routers/paymentRouter");
const donationRouter = require("./routers/donationRouter");
const authRouter = require("./routers/authRouter");

const PORT = process.env.PORT || 5050;

const app = express();

// configure express app settings
app.set("trust proxy", 1); //tells express server to trust first proxy servers like Nginx, Heroku, Render

// middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

// routes setup
app.use("/api/user", userRouter);
app.use("/api/campaign", campaignRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/donation", donationRouter);
app.use("/auth", authRouter);

// serve the built react app
app.use(express.static(path.join(__dirname, "views")));
app.get("*", (req, res) => {
  const indexFile = path.join(__dirname, "views", "index.html");
  res.sendFile(indexFile);
});

// database connection
mongoose.connect(process.env.CONN_STRING).then(console.log("Connected to db"));

// opening up port
app.listen(PORT, () => {
  console.log("Server listening at port " + PORT);
});
