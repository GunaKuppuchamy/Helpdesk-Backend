const express=require('express')
const router=express.Router()
const adminController=require('../Controllers/adminController');
const userController = require('../Controllers/userController');
const logincontroller=require('../Controllers/loginController')

//To add Empoloyee
router.post("/addemp",logincontroller.middleWare,adminController.createUser);

//To add new ticket
router.post("/addticket",logincontroller.middleWare,userController.addticket);

//To get tickets
router.get("/getticket",logincontroller.middleWare,userController.getticket);

//To get ticker by id
router.get("/getTicket/:id",userController.getbyid);

//To update by id
router.put("/updateTicket/:id",logincontroller.middleWare,logincontroller.middleWare);

//To delete by id
router.delete("/delete/:id",userController.deletebyid);

//To clear cookie while logout
router.post("/logout",logincontroller.logout);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);

//To get user tickets
router.get('/tickets/user',logincontroller.middleWare, userController.getuserticket);

//To get It team tickets
router.get('/tickets/it',logincontroller.middleWare, userController.getItTicket);

//To get It members
router.get('/itMembers',adminController.getItMembers)

// //To get user tickets
// router.get('/tickets/user/:userid', userController.getuserticket);

//To get It team tickets
router.get('/tickets/it/:itid', userController.getItTicket);

//To get all User Details
router.get("/getUsers",logincontroller.middleWare,adminController.getUser);

//To delete  User 
router.delete("/deleteUser/:empId",logincontroller.middleWare,adminController.deleteUser);

//To update  User Detail
router.put("/updateUser/:empId",logincontroller.middleWare,adminController.updateUser);


//To get User By Id
router.get("/getUserByID/:empid",adminController.getUserById);


//Authentication and Authorization

//To login
router.post("/login",logincontroller.login);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);




router.post('/sendotp', logincontroller.sendOtp);
router.post('/verifyotp', logincontroller.verifyOtp);
router.post('/resetpassword', logincontroller.resetPassword);


router.post('/sendotp', logincontroller.sendOtp);
router.post('/verifyotp', logincontroller.verifyOtp);
router.post('/resetpassword', logincontroller.resetPassword);

module.exports=router;

