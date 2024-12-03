const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        min:4
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})
const User=model('User',UserSchema);

module.exports=User;

