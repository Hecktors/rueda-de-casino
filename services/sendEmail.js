const nodemailer = require("nodemailer")

async function sendEmail(data) {
  try {
    let transporter = nodemailer.createTransport({
      host: "",
      port: 587,
      secure: false,
      auth: {
        user: "",
        pass: "",
      },
    })
    await transporter.sendMail(data)
    return true
  } catch (err) {
    console.log("error", err)
    return false
  }
}

module.exports = sendEmail
