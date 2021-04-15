const nodemailer = require("nodemailer")

async function sendEmail(data) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.strato.de",
      port: 587,
      secure: false,
      auth: {
        user: "no-reply@hecktors.de",
        pass: "Vh34trmE#2439",
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
