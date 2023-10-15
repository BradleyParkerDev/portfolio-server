const nodemailer = require('nodemailer');
// Configure the SMTP transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'realbradley91@gmail.com',
      pass: process.env.GMAIL_PASSWORD, // Access the Gmail password from environment variables
    },
  });

const contact = async (req, res, next) =>{
    const messageObject = { 
        name: req.body.name, 
        emailAddress: req.body.emailAddress, 
        subject: req.body.subject, 
        message: req.body.message
    } 
    console.log(messageObject)
    const mailOptions = {
      from: messageObject.emailAddress,
      to: 'realbradley91@gmail.com',
      subject: messageObject.subject,
      text: `Name: ${messageObject.name}\nEmail: ${messageObject.emailAddress}\nMessage: ${messageObject.message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Email sending failed');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });

}
module.exports = { contact }







