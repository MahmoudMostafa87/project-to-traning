const validatid=require("../../middleware/validationId");
const mongoose=require("mongoose");

describe("test id for any user in params",()=>{

    it("id valid",()=>{
        const res={};
        const req={
            params:{id:mongoose.Types.ObjectId.generate(20)}
        }
        const next=jest.fn();

        const code=validatid(req,res,next);

        expect(code).toHaveBeenCalled();
    })
    
    it("id not valid",()=>{
        const res={};
        const req={
            params:{id:mongoose.Types.ObjectId.generate(20)}
        }

        const next=jest.fn();
        
        req.params.id=undefined;
        const code=validatid(req,res,next);
        expect(code.message).toBe("enter good id");
    
    })

})
