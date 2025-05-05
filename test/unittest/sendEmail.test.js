const sendEmail=require("../../utils/sendEmil");

//test email and validateId
describe("send email function",()=>{
    it('test if data valid and email valid',()=>{
        const url=sendEmail("example@gmail.com","test send mail function",`<h1>done test by jest</h1>`);
        expect(url).toBe(url)
    });

    it('test if data not valid and email not valid',()=>{
        const error=sendEmail("example555555555555555@gmail.com","test send mail function",`<h1>done test by jest</h1>`);
        expect(error).toBe(error);
    });

    it('test if data not valid and email not valid',()=>{
        const url=sendEmail(null,"test send mail function",`<h1>done test by jest</h1>`);
        expect(()=>{url}).toThrow()
    });

})