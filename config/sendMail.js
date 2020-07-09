var nodemailer = require('nodemailer');
require('dotenv').config();

function sendMail(to,subject,text){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

var mailOptions = {
  from: process.env.EMAIL,
  to: to,
  subject: subject,
  text: text
};

return new Promise(function(resolve,reject){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          reject(error);
        } else {
          resolve('Email sent: ' + info);
        }
})
});}

module.exports = sendMail;