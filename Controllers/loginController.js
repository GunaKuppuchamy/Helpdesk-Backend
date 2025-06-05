// const bcrypt=require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');

// const SECRET_KEY = 'your_secret_key';

// const login=(req,res)=>{
//   user={
//     username:"guna",
//     password:"12345"
//   }
//          const { username, password } = req.body;
//           if (username === user.username && password === user.password) {
//     // Create JWT payload
//     const payload = { id: user.id, username: user.username };

//     // Sign token (expires in 1 hour)
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' });

//     // Set cookie (HTTP-only, Secure in production)
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // only send cookie over HTTPS in prod
//       sameSite: 'strict', // helps against CSRF
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     return res.json({ message: 'Logged in successfully' });
//   }

//   res.status(401).json({ message: 'Invalid credentials' });
// };




// module.exports={login}