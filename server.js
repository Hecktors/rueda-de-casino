import sslRedirect from "heroku-ssl-redirect"
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
require("dotenv").config({})

app.use(sslRedirect())
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "client/build")))

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const connection = mongoose.connection
connection.once("open", () => console.log("MongoDB connection established successfully"))

const userRouter = require("./routes/user")
const movesRouter = require("./routes/moves")
const audiosRouter = require("./routes/audios")

app.use("/users", userRouter)
app.use("/moves", movesRouter)
app.use("/audios", audiosRouter)

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "client/build", "index.html")))

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client/build", "index.html")))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
