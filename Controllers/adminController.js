const User = require('../Models/employees');
const bcrypt=require('bcryptjs');


const createUser = async (req, res) => {
  const { empid, name, email, password, phoneno, bu, role } = req.body;
  if (!empid || !name || !email || !password ||!phoneno || !bu ||!role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  let hashedpassword;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
     hashedpassword=await bcrypt.hash(password,12);
    const newUser = new User({empid, name, email, password:hashedpassword, phoneno, bu ,role});
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createUser };
