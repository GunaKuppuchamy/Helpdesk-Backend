const jwt = require('jsonwebtoken');
const SECRET_KEY = 'key_to_authenticate';
const REFRESH_SECRET_KEY = 'yek_terces_hserfer';
const User = require('../Models/employees');
const bcrypt = require('bcryptjs');
const ForgotUser = require('../Models/User')
const nodemailer = require('../nodemailer-config')

const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    const credentials = await User.findOne({ email: email });

    if (!credentials) {
      return res.status(404).json({ message: 'No user found' });
    }

    const isMatched = await bcrypt.compare(password, credentials.password);

    if (!isMatched) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { empid: credentials.empid, email: credentials.email };
    console.log(payload);

    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '20m' });

    // Set cookies
    res.cookie('access_token', accessToken, {
      httponly: true,
      maxAge: 1 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
       httponly: true,
      maxAge: 20 * 60 * 1000,
    });
    return res.status(200).json({ message: 'Logged in successfully', role: credentials.role, empid: credentials.empid });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


const middleWare = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token missing' });
    }
    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
      }
      const newAccessToken = jwt.sign({ empid: user.empid, email: user.email }, SECRET_KEY, { expiresIn: '1m' });
      res.cookie('access_token', newAccessToken, {
        maxAge: 5 * 60 * 1000,
      });
      req.userid = user.empid;
      next();
    });
  } else {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired access token' });
      }
      req.userid = user.empid;
      next();
    });
  }
}


const logout = (req, res) => {
  console.log("Logout called");
  // Clear cookies
   res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  return res.json({ message: 'Logged out successfully' });

};


//OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let targetUser = await ForgotUser.findOne({ email });
    if (!targetUser) {
      const tempPassword = await bcrypt.hash('temp123', 10);
      targetUser = new ForgotUser({ email, password: tempPassword });
    }


    targetUser.otp = otp;
    targetUser.otpTimestamp = new Date();
    await targetUser.save();

    const mailOptions = {
      from: 'itteamilink@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP for password reset is: ${otp}`
    };

    nodemailer.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(' Mail error:', err);
        return res.status(500).json({ message: 'Failed to send OTP', error: err.toString() });
      }

      res.status(200).json({ message: 'OTP sent successfully' });
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err.toString() });
  }
};


const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const targetUser = await ForgotUser.findOne({ email });

    if (!targetUser || targetUser.otp !== otp) return res.json({ valid: false });

    const now = new Date();
    const diff = (now - targetUser.otpTimestamp) / 1000; // seconds
    if (diff > 300) return res.json({ valid: false }); // 5 minutes

    res.json({ valid: true });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const targetUser = await User.findOne({ email });

    if (!targetUser) return res.status(404).send('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    targetUser.password = hashedPassword;

    
    await targetUser.save();
    res.status(200).json({ message: 'Password Updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};



module.exports={login,logout,middleWare,sendOtp,verifyOtp,resetPassword}
