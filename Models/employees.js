const mongoose =require('mongoose')
const UserSchema = new mongoose.Schema({
   empid:{type:String, required:true,unique:true},
   name:{type:String, required:true},
   email:{type:String, required:true,unique:true},
   password:{type:String, required: true},  
   phoneno:{type:String, required:true},
   bu:{type:String, required:true, enum:['DATA','DEX','ILD','IT','HR','SIMS','IAT']},
    role:{type:String, required:true,enum:['it','admin','user']}
 
});
module.exports=mongoose.model("employees",UserSchema);