const mongoose=require('mongoose');
const ASchema=mongoose.Schema({
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
const AS=mongoose.model('Assignment',ASchema);
module.exports=AS; 