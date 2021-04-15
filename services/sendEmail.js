const nodemailer = require("nodemailer")

async function sendEmail(data) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PW,
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
