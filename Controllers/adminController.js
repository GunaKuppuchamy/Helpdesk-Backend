const User = require('../Models/employees');

const createUser = async (req, res) => {
  const { empid, name, email, password, phoneno, bu, role } = req.body;
  if (!empid || !name || !email || !password ||!phoneno || !bu ||!role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const newUser = new User({empid, name, email, password, phoneno, bu ,role});
    await newUser.save();
    // await User.create(newUser);
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createUser };
