const status=require("../utils/statuscode");
const logger=require("../startup/logging")

module.exports=(handler)=>{
    return async(req,res)=>{
        try{
            await handler(req,res);
        }catch(ex){
            logger.error(ex)
            res.status(500).json({message:status(500)});
        }
    }
}