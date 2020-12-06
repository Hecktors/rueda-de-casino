const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

require("dotenv").config({});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB connection established successfully")
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
