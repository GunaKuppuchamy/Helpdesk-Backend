const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const routes=require('./Routes/route')

const url="mongodb+srv://team5:12345@helpdesk.auegrbh.mongodb.net/helpdesk";
mongoose.connect(url).then(()=>{
    const app=express();
    console.log("connected");
    app.use(cors())
    app.use(express.json())
    app.use("/",routes)
    app.listen(3002,()=>{
        console.log("Success");
    })
})