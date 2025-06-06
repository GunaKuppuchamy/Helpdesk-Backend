const mongoose =require('mongoose')
const TicketSchema = new mongoose.Schema({
    userid:{type:String, required:true},
   ticketid:{type:String, required:true},
   subject:{type:String, required:true},
   description:{type:String, required:true},
   raiseddate:{type:Date, required:true},
   duedate:{type:Date, required:true},
   status:{type:String, required:true},
   priroty:{type:String, required:true},
   categeory:{type:String, required:true},
   itid:{type:String, required:true},
 
});
module.exports=mongoose.model("tickets",TicketSchema);