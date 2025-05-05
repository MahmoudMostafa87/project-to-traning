const logger=require("../startup/logging");


module.exports=(err,req,res,next)=>{
    logger.error(err.message);
    next();
}