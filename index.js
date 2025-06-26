

require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes/route');
const cookieParser = require('cookie-parser');
const setupSwagger = require('./swagger'); 


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
    setupSwagger(app);

    app.listen(port, () => {
       
        
        console.log(`Server running on port ${port}`);
    });
});
