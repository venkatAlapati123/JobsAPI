const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    companyname:{
        type:String,
        required:[true,'Company name is required']
    },
    position:{
        type:String,
        required:[true,'position is required']
    },
    Status:{
        type:String,
        enum:['Interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:String,
        ref:'user',
        required:[true,'Please provide user']
    }
},{timestamps:true});
module.exports=mongoose.model('Job',jobSchema);