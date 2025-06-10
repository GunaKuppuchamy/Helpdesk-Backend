const express=require('express')
const router=express.Router()
const adminController=require('../Controllers/adminController');
const userController = require('../Controllers/userController');
const logincontroller=require('../Controllers/loginController')

//To add Empoloyee
router.post("/addemp",logincontroller.middleWare,adminController.createUser);

//To add new ticket
router.post("/addticket",logincontroller.middleWare,userController.addTicket);

//To get tickets
router.get("/getticket",logincontroller.middleWare,userController.getTicket);

//To get ticket by id
router.get("/getTicket/:id",logincontroller.middleWare,userController.getTicketByid);

//To update by id
router.put("/updateTicket/:id",logincontroller.middleWare,userController.updateTicketById);

//To delete by id
// router.delete("/delete/:id",logincontroller.middleWare,userController.deletebyid);

//To clear cookie while logout
router.post("/logout",logincontroller.logout);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);

//To get user tickets
router.get('/tickets/user',logincontroller.middleWare, userController.getUserTickets);

//To get It team tickets
router.get('/tickets/it',logincontroller.middleWare, userController.getItTicket);

//To get It members
// router.get('/itMembers',logincontroller.middleWare,adminController.getItMembers)

// //To get user tickets
// router.get('/tickets/user/:userid', userController.getuserticket);

//To get It team tickets
// router.get('/tickets/it/:itid', userController.getItTicket);

//To get all User Details
router.get("/getUsers",logincontroller.middleWare,adminController.getUsers);

//To delete  User 
router.delete("/deleteUser/:empId",logincontroller.middleWare,adminController.deleteUser);

//To update  User Detail
router.put("/updateUser/:empId",logincontroller.middleWare,adminController.updateUser);


//To get User By Id
router.get("/getUserByID/:empid",adminController.getUserById);


//Authentication and Authorization

//To login
router.post("/login",logincontroller.login);

//To logout
router.post("/logout",logincontroller.logout);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);

//To Send OTP
router.post('/sendotp', logincontroller.sendOtp);

//To Verify OTP
router.post('/verifyotp', logincontroller.verifyOtp);

//To Reset Password
router.post('/resetpassword', logincontroller.resetPassword);

module.exports=router;

