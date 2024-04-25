const mongoose=require('mongoose');
const NSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    code:{
        type:String,
        require:true,
    },//TEACHER ID-HEAD
    head:{
        type:String,
        require:true,
    },
    pdf:{
        type:String,
        require:true,
    }
},{timestamps:true});
const NOTES=mongoose.model('Notes',NSchema);
module.exports=NOTES; 