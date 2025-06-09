const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes/route');
const cookieParser = require('cookie-parser');

const url = "mongodb+srv://team5:12345@helpdesk.auegrbh.mongodb.net/helpdesk";
mongoose.connect(url).then(() => {
    const app = express();
    console.log("connected");
    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true,
    }));
    
    app.use(express.json())
    app.use(cookieParser())
    app.use("/", routes)
    app.listen(3002, () => {
        console.log("Success");
    })
})