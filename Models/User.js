
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  otp: String,
  otpTimestamp: Date
});

module.exports = mongoose.model('User', userSchema);
