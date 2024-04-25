const mongoose=require('mongoose');
const QSchema=mongoose.Schema({
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
const QUIZ=mongoose.model('Quiz',QSchema);
module.exports=QUIZ; 