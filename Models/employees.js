const mongoose =require('mongoose')
const UserSchema = new mongoose.Schema({
   empid:{type:String, required:true},
   name:{type:String, required:true},
   email:{type:String, required:true},
   password:{type:String, required: true},  
   phoneno:{type:String, required:true},
   bu:{type:String, required:true},
    role:{type:String, required:true}

});
module.exports=mongoose.model("employees",UserSchema);