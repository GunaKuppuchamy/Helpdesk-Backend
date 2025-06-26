// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const routes = require('./Routes/route');
// const cookieParser = require('cookie-parser');

// const url = "mongodb+srv://team5:12345@helpdesk.auegrbh.mongodb.net/helpdesk";
// mongoose.connect(url).then(() => {
//     const app = express();
//     app.use(cors({
//         origin: 'http://localhost:4200',
//         credentials: true,
//     }));
    
//     app.use(express.json())
//     app.use(cookieParser())
//     app.use("/", routes)
//     app.listen(3002, () => {
//         console.log("connected");
//     })
// })


require('dotenv').config(); // Add this at the very top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes/route');
const cookieParser = require('cookie-parser');

// Load from .env instead of hardcoding
const url = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(url).then(() => {
    const app = express();

    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true,
    }));

    app.use(express.json());
    app.use(cookieParser());
    app.use("/", routes);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
