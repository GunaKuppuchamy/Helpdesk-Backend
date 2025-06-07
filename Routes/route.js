const express=require('express')
const router=express.Router()
const adminController=require('../Controllers/adminController');
const userController = require('../Controllers/userController');
const logincontroller=require('../Controllers/loginController')

//To add Empoloyee
router.post("/addemp",adminController.createUser);

//To add new ticket
router.post("/addticket",userController.addticket);

//To get tickets
router.get("/getticket",userController.getticket);

//To get ticker by id
router.get("/getuser/:id",userController.getbyid);

//To update by id
router.put("/updateTicket/:id",userController.putbyid);

//To delete by id
router.delete("/delete/:id",userController.deletebyid);

//To login
router.post("/login",logincontroller.login);

//To refresh access Token
router.post("/refresktk",logincontroller.refreshToken);

//To clear cookie while logout
router.post("/logout",logincontroller.logout);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);

//To get user tickets
router.get('/tickets/user/:userid', userController.getuserticket);

//To get all User Details
router.get("/getUsers",adminController.getUser);

//To delete  User 
router.delete("/deleteUser/:empId",adminController.deleteUser);

//To update  User Detail
router.put("/updateUser/:empId",adminController.updateUser);

module.exports=router;

