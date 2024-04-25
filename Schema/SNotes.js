const mongoose=require("mongoose")
const SNotesSchema=mongoose.Schema({
    //UNIQUE FOR CLASS
    code:{
        type:String,
        require:true,
    },
    //UNIQUE FOR STUDENT
    sid:{
        type:String,
        require:true,
    },
    para:{
        type:String,
        require:true,
    }
},{timestamps:true});
const SNotes=mongoose.model('StudentNotes',SNotesSchema);
module.exports=SNotes; 