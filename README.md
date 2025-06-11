# Helpdesk Ticketing System
## Backend
1. Description
A full-stack web application designed to manage support tickets within an organization. It allows users to raise tickets, IT teams to resolve them, and admins to oversee the entire process efficiently.

**1. Controllers:**
  * authController.js: Manages login, token, OTP, and password reset.
  * ticketController.js: Handles ticket creation, updates, status, and email on close.
  * userController.js: Manages user CRUD and listing IT members.

**2. Models:**
  * employees.js: Defines user structure (empid, name, role, etc.).
  * tickets.js: Defines ticket structure (subject, description, status, etc.)
  * users.js: Defines minimal structure of user for the feature forget password (email, otp, timestamp)
    
**3. Routes:**
  * routes.js: Routes for login, OTP, tokens, creating, updating, viewing tickets and managing users.
    
**4. File Structure:**
<pre>
  /Helpdesk-Backend
│
├── controllers/
│   ├── authController.js
│   ├── ticketController.js
│   └── userController.js
│
├── models/
│   ├── employees.js
│   └── tickets.js
│
├── routes/
│   ├── authRoute.js
│   ├── ticketRoute.js
│   └── userRoute.js
│
├── middleware/
│   └── auth.js
│
├── app.js or server.js
└── .env

</pre>

**5. Run:**
  * Install necessary libraries
  * cmd: node index.js
    
