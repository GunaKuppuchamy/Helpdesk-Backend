const express=require('express')
const router=express.Router()
const adminController=require('../Controllers/adminController');
const userController = require('../Controllers/userController');
const logincontroller=require('../Controllers/loginController')

//To add Empoloyee
router.post("/addemp",logincontroller.middleWare);

//To add new ticket
router.post("/addticket",userController.addticket);

//To get tickets
router.get("/getticket",userController.getticket);

//To get ticker by id
router.get("/getTicket/:id",userController.getbyid);

//To update by id
router.put("/updateTicket/:id",userController.putbyid);

//To delete by id
router.delete("/delete/:id",userController.deletebyid);

//To clear cookie while logout
router.post("/logout",logincontroller.logout);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);
//To get user tickets
// router.get('/tickets/user/:userid',mware, userController.getuserticket);
router.get('/tickets/user',logincontroller.middleWare, userController.getuserticket);

//To get It team tickets
router.get('/tickets/it/:itid', userController.getItTicket);

//To get It members
router.get('/itMembers',adminController.getItMembers)

//To get user tickets
router.get('/tickets/user/:userid', userController.getuserticket);

//To get It team tickets
router.get('/tickets/it/:itid', userController.getItTicket);

//To get all User Details
router.get("/getUsers",adminController.getUser);

//To delete  User 
router.delete("/deleteUser/:empId",adminController.deleteUser);

//To update  User Detail
router.put("/updateUser/:empId",adminController.updateUser);

//To send OTP
router.post("/sendotp",logincontroller.sendOtp);

//To verify OTP
router.post("/verify-otp", logincontroller.verifyOtp);

//To reset password
router.post("/reset-password", logincontroller.resetPassword);
//To get User By Id
router.get("/getUserByID/:empid",adminController.getUserById);


//Authentication and Authorization

//To login
router.post("/login",logincontroller.login);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);

//To refresh access Token
// router.post("/refresktk",logincontroller.refreshToken);

module.exports=router;

