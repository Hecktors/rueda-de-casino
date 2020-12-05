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

// app.get("/api/levels", async (req, res) => {
//   var gtts = new gTTS("Buinvinido a la salsa app", "es-us");
//   gtts.save("data/audio/test.mp3", function (err, result) {
//     if (err) {
//       throw new Error(err);
//     }
//     console.log("Success! Open file /data/audio/test.mp3 to hear result.");
//   });
//   res.sendFile(__dirname + "/data/pensum.json");
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
