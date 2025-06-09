const mongoose =require('mongoose')
const TicketSchema = new mongoose.Schema({
    userid:{type:String },
   ticketid:{type:String },
   subject:{type:String },
   description:{type:String },
   raiseddate:{type:String },
   duedate:{type:String },
   status:{type:String },
   priroty:{type:String },
   category:{type:String }
//    itid:{type:String },
 
});
module.exports=mongoose.model("tickets",TicketSchema);