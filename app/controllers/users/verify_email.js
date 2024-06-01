const User = require('../../models/users/user');
const Helpers = require('../../utils/helpers')

exports.verifyEmail = async(req,res)=>{
    const email = req.body.email;
    const helper = new Helpers();

    try{
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        const otp = await helper.generateOTP();

        user.OTP = otp

        const emailResponse = await helper.sendEmail(user.email,'Email verification',`Kindly use the otp below to verify your email: ${otp}`)

        if(!emailResponse){
            return res.status(500).json({message:'Email not sent'})
        }
        user.isVerified = true

        await user.save();

        return res.status(200).json({message:'Email sent successfully'})

    }catch (error){
        res.status(500).json({error:error.message})
    }
}
