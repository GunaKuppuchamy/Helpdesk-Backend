const jwt = require('jsonwebtoken');
const SECRET_KEY = 'key_to_authenticate';
const REFRESH_SECRET_KEY = 'yek_terces_hserfer';
const User = require('../Models/employees');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');



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
      maxAge: 10 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      maxAge: 10 * 60 * 1000,
    });
    // console.log("logged");
    return res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};









const middleWare = (req, res, next) => {
  console.log("MWC")

  const token = req.cookies.access_token;
  console.log(token)
  if (!token) {
    const refreshToken = cookieParser(req.cookies.refresh_token);
      console.log(refreshToken)

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token missing' });
    }
    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
      // console.log(user);
      if (err) {
        return res.json({ message: 'Invalid or expired refresh token' });
      }
      const newAccessToken = jwt.sign({ empid: user.empid, email: user.email }, SECRET_KEY, { expiresIn: '1m' });
      res.cookie('access_token', newAccessToken, {
        maxAge: 1 * 60 * 1000,
      });
      req.userid = user.empid; 
      console.log("User (from refresh):", user);
      next();
      // return res.json({ message: 'Access token refreshed' });
    });
  } else {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired access token' });
      }
      // req.user = user;
     req.userid = user.empid; 
      console.log("User (from refresh):", user);
      next();
      //return res.status(200).json({ message: 'valid' });
    });
  }

}

const refreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }
  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    if (err) {
      return res.json({ message: 'Invalid or expired refresh token' });
    }
    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '2m' });
    res.cookie('access_token', newAccessToken, {
      maxAge: 2 * 60 * 1000,
    });
    next();
    // return res.json({ message: 'Access token refreshed' });
  });
};

const logout = (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: false,
    secure: false,
    sameSite: 'none',
  });

  res.clearCookie('refresh_token', {
    httpOnly: false,
    secure: false,
    sameSite: 'none',
  });
  return res.json({ message: 'Logged out successfully' });

};







module.exports = { login, refreshToken, logout, middleWare }






