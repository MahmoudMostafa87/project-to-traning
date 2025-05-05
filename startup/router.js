const error=require("../middleware/error");
const home=require("../router/home");
const doctor=require("../router/doctor");
const student=require("../router/student");

module.exports=(app)=>{
    app.use("/",home);//done
    app.use("/doctors",doctor);//done
    app.use("/student",student);//done
    app.use(error);
}

