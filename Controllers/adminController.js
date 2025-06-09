const User = require('../Models/employees');
const bcrypt=require('bcryptjs');


const createUser = async (req, res) => {
  // console.log(req.body);
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

const deleteUser=async(req,res)=>{
try {
    const deleted = await User.deleteOne({empid:req.params.empId });
if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error in deleting User', error: err.message });
  }
}

//To Update User Detail
const updateUser=async (req,res)=>{
  // console.log("called");
  try {
    const {empid,name,email,password,phoneno,bu,role}=req.body;

      const updatedUser = await User.updateOne({empid:req.params.empId}, {empid:empid,name:name,email:email,password:password,phoneno:phoneno,bu:bu,role:role});
      if (updatedUser.modifiedCount===0) {
        return res.status(404).json({ message: 'User not found or no any modified data' });
      }
      res.status(200).json({ message: 'User updated', data: updatedUser });
    } catch (err) {
      res.status(500).json({ message: 'Error in updating user', error: err.message });
    }
}

//To get All users details
const getUser=async (req,res)=>{
  try{
  const users=await User.find();
  return res.status(200).json(users);
  }catch(err){
    return res.status(500).json({ message: 'Error in fetching Users', error: err.message });
  }
}

//get User By Id
const getUserById = async (req,res) =>{
  try{
    const user = await User.findOne({empid:req.params.empid});
    return res.status(200).json(user);
  }
  catch(err)
  {
    return res.status(500).json({message : 'Error While fetching user By ID',error : err.message})
  }
}


//get It members
const getItMembers=async (req,res)=>{
  try{
   const itMembers=await User.find({role:'it'});
   return res.json(itMembers)
  }catch(err)
  {
    return res.status(500).json({message : 'Error While fetching user',error : err.message})
  }
}

module.exports = { createUser, deleteUser, updateUser, getUser , getUserById,getItMembers};

module.exports = { createUser, deleteUser, updateUser, getUser , getUserById};