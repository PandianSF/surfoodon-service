const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
//const { Pool, Client } = require   ("pg");

const app = express();
const PORT = process.env.port || 3000;

/**const Pool = new Pool({
  type: "postgres",
  user: "pandianr",
  host: "localhost",
  password: "root",
  port: 5432,
}); **/

app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));

app.post("/mail", (req, res) => {
  const { name, email, subject, text } = req.body;
  console.log("req======>>>>", req.body);

  const mailTransporter = nodemailer.createTransport({
    //service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "ponpandian94@gmail.com",
      pass: "zpjeixxdmdqpqgoe",
    },
  });
  const mailDetails = {
    from: `"${name}"<${email}>`,
    to: "ponpandian94@gmail.com",
    subject: `From "${name}"<${email}>: ${subject}`,
    text: req.body.text,
  };
  console.log("=====>", mailDetails);
  mailTransporter.sendMail(mailDetails, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      res.send({
        status: "Success",
        message: "Message sent successfully!",
        data: info.response,
      });
    }
  });
  const genDetails = {
    from: "ponpandian94@gmail.com",
    to: `<${email}>`,
    subject: "Thank you for your querying to Surfoodon",
    text: `Dear ${name}, 

  Thank you for contacting us through our website's contact form. We have received your message, and we appreciate your interest in Surfoodon.

  Our team will review your inquiry and get back to you as soon as possible. If your message requires a response, you can expect to hear from us within the next 1-2 business days.

  In the meantime, feel free to explore our website for more information about our services.

  Once again, thank you for reaching out to us. We look forward to assisting you!,

Best Regards,
PonPandian R
ponpandian94@gmail.com`,
  };
  mailTransporter.sendMail(genDetails, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      res.send({
        status: "Success",
        message: "Auto generated email sent successfully",
      });
    }
  });
  //setTimeout(mailTransporter.sendMail(genDetails), 5000);
});

app.post("/donateFood", (req, res) => {
  const { name, email, phoneNumber } = req.body;
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Server started!");
});
