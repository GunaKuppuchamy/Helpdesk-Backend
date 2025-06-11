const mongoose =require('mongoose')
const TicketSchema = new mongoose.Schema({
    userid:{type:String, required:true},
   ticketid:{type:String, required:true,unique:true},
   subject:{type:String, required:true},
   description:{type:String, required:true},
   raiseddate:{type:Date, required:true},
   duedate:{type:Date, required:true},
   status:{type:String, required:true,enum:['open','onHold','closed','cancelled']},
   priroty:{type:String, required:true,enum:['high','low','medium']},
   categeory:{type:String, required:true,enum:['Software','Hardware','Network','Asset Request','Email']},
   itid:{type:String, required:true},
 
});
module.exports=mongoose.model("tickets",TicketSchema);