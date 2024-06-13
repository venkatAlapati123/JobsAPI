require('dotenv').config()
const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const userschema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Enter username'],
        minLength:3,
        maxLength:20
    },
    Email: {
        type: String,
        required: [true, 'Enter Email'],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Enter a valid email'],
        unique:true
    },
    Password:{
        type: String,
        required: [true, 'Enter Password'],
        
    }
})

userschema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.Password =await bcrypt.hash(this.Password, salt);
    next()
})

userschema.methods.comparePassword=async function(enteredpassword){
    const ismatched=await bcrypt.compare(enteredpassword,this.Password);
    return ismatched
}


module.exports=mongoose.model('jobmodel',userschema)