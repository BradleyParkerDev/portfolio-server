const nodemailer = require('nodemailer');
const { google } = require('googleapis'); // Import google object from googleapis

// Load your Gmail credentials from environment variables
const MY_EMAIL = process.env.GMAIL_EMAIL;
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;




// Create a new OAuth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Set the OAuth2 client credentials
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


// Create a Nodemailer transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: MY_EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
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
    console.log(MY_EMAIL)
    const mailOptions = {
      from: messageObject.emailAddress,
      to: MY_EMAIL,
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







