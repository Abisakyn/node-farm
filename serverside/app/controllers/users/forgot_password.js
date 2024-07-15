const User = require('../../models/users/user')
const Helper=require('../../utils/helpers')

const helpers  = new Helper();
exports.forgotPassword = async (req,res,next)=>{
     const email =req.body.email;

     try{
        const user =await User.findOne({ email: email})
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
  
    const token = await user.createPasswordResetToken();

    await user.save({validateBeforeSave:false});

    const emailResponse =await helpers.sendEmail(email,'Reset Token',`Reset Token:${token}`);
    if(!emailResponse){
        return res.status(500).json({message:'Email not sent'})
    }
    return res.status(200).json({message:'Success',user})
     }catch(error){
        return res.status(500).json({message: error.message});
     }

}