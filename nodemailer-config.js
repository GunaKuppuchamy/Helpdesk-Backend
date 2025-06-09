const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'itteamilink@gmail.com',
    pass: 'aehl cdqf zxai rgud' 
  }
});

module.exports = transporter;

