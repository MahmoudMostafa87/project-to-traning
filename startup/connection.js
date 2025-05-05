const mongoose=require("mongoose");
const loggers = require("./logging");

module.exports=()=>{
    mongoose.connect(process.env.URL_MONGO)
    .then((result) => {
        loggers.log("info","connect now");
    }).catch((err) => {
        loggers.error(err);
        process.exit(0);
    });
}