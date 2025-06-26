const express=require('express')
const router=express.Router()
const adminController=require('../Controllers/adminController');
const userController = require('../Controllers/userController');
const logincontroller=require('../Controllers/loginController')

//Ticket Routes

/**
 * @swagger
 * /addticket:
 *   post:
 *     summary: Add a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created successfully
 */
router.post("/addticket",logincontroller.middleWare,userController.addTicket);

/**
 * @swagger
 * /getticket:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: List of tickets
 */
router.get("/getticket",logincontroller.middleWare,userController.getTicket);

/**
 * @swagger
 * /getTicket/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket details
 */
router.get("/getTicket/:id",logincontroller.middleWare,userController.getTicketByid);

/**
 * @swagger
 * /updateTicket/{id}:
 *   put:
 *     summary: Update ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 */
router.put("/updateTicket/:id",logincontroller.middleWare,userController.updateTicketById);

//User Routes

/**
 * @swagger
 * /addemp:
 *   post:
 *     summary: Add a new employee
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */


router.post("/addemp",logincontroller.middleWare,adminController.createUser);

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/getUsers",logincontroller.middleWare,adminController.getUsers);

/**
 * @swagger
 * /deleteUser/{empId}:
 *   delete:
 *     summary: Delete user by employee ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: empId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/deleteUser/:empId",logincontroller.middleWare,adminController.deleteUser);

/**
 * @swagger
 * /updateUser/{empId}:
 *   put:
 *     summary: Update user by employee ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: empId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/updateUser/:empId",logincontroller.middleWare,adminController.updateUser);

/**
 * @swagger
 * /getUserByID/{empid}:
 *   get:
 *     summary: Get user by employee ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: empid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 */
router.get("/getUserByID/:empid",logincontroller.middleWare, adminController.getUserById);

/**
 * @swagger
 * /tickets/user:
 *   get:
 *     summary: Get tickets for current user
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: List of user's tickets
 */
router.get('/tickets/user',logincontroller.middleWare, userController.getCurrentUserTickets);

/**
 * @swagger
 * /currentUser:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Current user details
 */
router.get('/currentUser', logincontroller.middleWare, userController.getCurrentUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */


//Login Routes
router.post("/login",logincontroller.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout",logincontroller.logout);

/**
 * @swagger
 * /middleware:
 *   post:
 *     summary: Verify token middleware
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token verified
 */
router.post("/middleware",logincontroller.middleWare);

/**
 * @swagger
 * /sendotp:
 *   post:
 *     summary: Send OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post('/sendotp', logincontroller.sendOtp);

/**
 * @swagger
 * /verifyotp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post('/verifyotp', logincontroller.verifyOtp);

/**
 * @swagger
 * /resetpassword:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post('/resetpassword', logincontroller.resetPassword);


//To clear cookie while logout
router.post("/logout",logincontroller.logout);

//middleware to verify token
router.post("/middleware",logincontroller.middleWare);

module.exports=router;

