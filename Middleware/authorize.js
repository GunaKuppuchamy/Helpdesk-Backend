// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'key_to_authenticate';
// const REFRESH_SECRET_KEY = 'yek_terces_hserfer';

// const middleWare = (req, res,next) => {
//     console.log("MWC")
//   const token = req.cookies.access_token;
//   if (!token) {
//     const refreshToken = req.cookies.refresh_token;
//     if (!refreshToken) {
//       return res.status(401).json({ message: 'Refresh token missing' });
//     }
//     jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
//       console.log(user);
//       if (err) {
//         return res.json({ message: 'Invalid or expired refresh token' });
//       }
//       const newAccessToken = jwt.sign({ empid: user.empid, email: user.email }, SECRET_KEY, { expiresIn: '1m' });
//       res.cookie('access_token', newAccessToken, {
//         httpOnly: false,
//         secure: false,
//         sameSite: 'Strict',
//         maxAge: 1 * 60 * 1000,
//       });
        
//       // return res.json({ message: 'Access token refreshed' });
//     });
//   }else{
//     jwt.verify(token, SECRET_KEY, (err, user) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid or expired access token' });
//       }
//       req.user = user;
//       next();
//     });
//   }

// }

//   module.exports=middleWare;
