const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'logeshjr18@gmail.com',
    pass: '12345' 
  }
});

module.exports = transporter;

