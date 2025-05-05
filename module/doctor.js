const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const doctorSchema=new mongoose.Schema({ 
    fileInfo:{
        path:{
            type:String,
            required:true,
        },
        file:{
            type:String,
            required:true,
        },
        contentType:{
            type:String,
            required:true,
        }
    },
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:15
    },
    age:{
        type:Number,
        required:true,
        min:25,
        max:60,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        minlength:9,
        maxlength:11,
        match:/^01[0125]\d{8}$/
    },
    email:String
});

doctorSchema.methods.doctorToken=function(){
const token=jwt.sign({id:this._id},process.env.Private_KEY,{expiresIn:'30d'})
return token;
}

const Doctor=mongoose.model("Doctor",doctorSchema);


module.exports=Doctor;