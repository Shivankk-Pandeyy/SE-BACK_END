const mongoose=require('mongoose');
const Connect=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/studylabs");
        console.log("MONGO DB CONNECTED");
    }
    catch(err){
        console.log(err);
    }
}
module.exports=Connect;