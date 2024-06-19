const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5050, () => {
  console.log("Server listening at http://localhost:5050");
});
