const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3001;
const app = express();
require("dotenv").config({});

app.use(express.static(path.join(__dirname, "client/build")));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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

const movesRouter = require("./routes/moves");
const audiosRouter = require("./routes/audios");
app.use("/moves", movesRouter);
app.use("/audios", audiosRouter);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
