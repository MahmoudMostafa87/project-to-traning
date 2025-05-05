const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const studentSchema=new mongoose.Schema({
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
        min:6,
        max:25,
    },
    level:{
        type:String,
        enum:['first','secound','third','forth'],
        required:true,
    },
    address:{
        type:String,
        required:true,
        match:/^([a-zA-Z\u0600-\u06FF0-9\s\-\/\\,.'()#&]{1,50})(\s[a-zA-Z\u0600-\u06FF0-9\s\-\/\\,.'()#&]{1,50}){2,10}$/
    }
})

studentSchema.methods.stuentToken=function(){
const token=jwt.sign({id:this._id},process.env.Private_KEY,{expiresIn:'30d'})
return token;
}

const Stuednt=mongoose.model("Student",studentSchema);


module.exports=Stuednt



//addresses 
//"123 Main St, Apt 4B, New York"

// "45 West/21st Street, Floor 3"

// "Building 5, Office #203"
