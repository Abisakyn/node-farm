const User = require('../../models/users/user')
const Helper=require('../../utils/helpers')

const helpers  = new Helper();
exports.forgotPassword = async (req,res,next)=>{
     const email =req.body.email;

     try{
    //get user based on POSTed email
        const user =await User.findOne({ email: email})
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
    //create token
    const token = await user.createPasswordResetToken();

    await user.save({validateBeforeSave:false});
    //send it to user email

    const emailResponse =await helpers.sendEmail(email,'Reset Token','Reset Token')
    if(!emailResponse){
        return res.status(500).json({message:'Email not sent'})
    }
    return res.status(200).json({message:'Success',user})
     }catch(error){
        return res.status(500).json({message: error.message});
     }

}