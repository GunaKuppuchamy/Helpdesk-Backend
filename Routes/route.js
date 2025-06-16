const express=require('express')
const router=express.Router()
const adminController=require('../Controllers/adminController');
const userController = require('../Controllers/userController');
const logincontroller=require('../Controllers/loginController')

// Ticket Methods

//To add new ticket
router.post("/addticket",logincontroller.middleWare,userController.addTicket);

//To get tickets
router.get("/getticket",logincontroller.middleWare,userController.getTicket);

//To get ticket by id
router.get("/getTicket/:id",logincontroller.middleWare,userController.getTicketByid);

//To update by id
router.put("/updateTicket/:id",logincontroller.middleWare,userController.updateTicketById);


//User Methods

//To add Empoloyee
router.post("/addemp",logincontroller.middleWare,adminController.createUser);

//To get all User Details
router.get("/getUsers",logincontroller.middleWare,adminController.getUsers);

//To delete  User 
router.delete("/deleteUser/:empId",logincontroller.middleWare,adminController.deleteUser);

//To update  User Detail
router.put("/updateUser/:empId",logincontroller.middleWare,adminController.updateUser);

//To get User By Id
router.get("/getUserByID/:empid",logincontroller.middleWare, adminController.getUserById);

//To get user tickets
router.get('/tickets/user',logincontroller.middleWare, userController.getUserTickets);

//To get It team tickets
router.get('/tickets/it',logincontroller.middleWare, userController.getItTicket);

//To get Current Logged In User

router.get('/currentUser', logincontroller.middleWare, userController.getCurrentUser);


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

//To clear cookie while logout
router.post("/logout",logincontroller.logout);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);

module.exports=router;

