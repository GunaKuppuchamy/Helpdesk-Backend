const jwt = require('jsonwebtoken');
const SECRET_KEY = 'key_to_authenticate';
const REFRESH_SECRET_KEY='yek_terces_hserfer'
const User = require('../Models/employees');
const bcrypt=require('bcryptjs');
const ForgotUser = require('../Models/User');
// const nodemailer = require('../nodemailer-config');


const login = async (req, res) => {
 
  const { email, password, role } = req.body;
  // console.log(req.body);
 
  try {
    const credentials = await User.findOne({ email: email, role: role });
 
    if (!credentials) {
      return res.status(404).json({ message: 'No user found' });
    }
 
    const isMatched = await bcrypt.compare(password, credentials.password);
 
    if (!isMatched) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
 
    const payload = { empid: credentials.empid, email: credentials.email };
 
    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '10m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '10m' });
 
    // Set cookies
    res.cookie('access_token', accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 10 * 60 * 1000,
    });
 
    res.cookie('refresh_token', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 10 * 60 * 1000,
    });
    // console.log("logged");
    return res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }
  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    if (err) {
        return res.json({ message: 'Invalid or expired refresh token' });
    }
    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {expiresIn: '2m'});
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'Strict',
      maxAge: 2 * 60 * 1000,
    });

    return res.json({ message: 'Access token refreshed' });
  });
};

const logout = (req, res) => {
     res.clearCookie('access_token', {
    httpOnly: true,
    secure: false, 
    sameSite: 'Strict',
  });

  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: false, 
    sameSite: 'Strict',
  });
    return res.json({ message: 'Logged out successfully' });

};

const middleWare = (req, res) => {    
const token = req.cookies.access_token;
  if (!token){
     return res.json({ message: 'Token required' });
  }
  jwt.verify(token, SECRET_KEY, (err,user) => {
    console.log("called");
    if (err) {
        return res.json({ message: 'Expired or invalid token' });
    }else{
        console.log("success");
        return res.json({message:'verified'});
    }
    // req.user=user;
    // next(); 
  });
};



//OPT
//  Send OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    
    let targetUser = await ForgotUser.findOne({ email });

    if (!targetUser) {
      const tempPassword = await bcrypt.hash('temp123', 10);
      targetUser = new ForgotUser({ email, password: tempPassword });
    }

    targetUser.otp = otp;
    targetUser.otpTimestamp = new Date();
    await targetUser.save();

    const mailOptions = {
      from: 'logeshjr18@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP for password reset is: ${otp}`
    };

    nodemailer.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Mail error:', err);
        return res.status(500).send('Failed to send OTP');
      }
      res.sendStatus(200);
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Verify OTP
const verifyOtp = async (req, res) =>{
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

// ✅ Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const targetUser = await ForgotUser.findOne({ email });

    if (!targetUser) return res.status(404).send('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    targetUser.password = hashedPassword;
    targetUser.otp = null;
    targetUser.otpTimestamp = null;
    await targetUser.save();

    res.sendStatus(200);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


module.exports={login,refreshToken,logout,middleWare,sendOtp,verifyOtp,resetPassword}