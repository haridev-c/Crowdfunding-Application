const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

mongoose.connect(process.env.CONN_STRING).then(console.log("Connected to db"));

app.listen(5050, () => {
  console.log("Server listening at http://localhost:5050");
});
