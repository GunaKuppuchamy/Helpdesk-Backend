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

//To get by id
router.get("/getby/:id",userController.getbyid);

//To update by id
router.put("/putby/:id",userController.putbyid);

//To delete by id
router.delete("/deleteby/:id",userController.deletebyid);

//To login
// router.post("/login",logincontroller.login);

//To get user tickets
router.get('/tickets/user/:userid', userController.getuserticket);


module.exports=router;

