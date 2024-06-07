const User = require('../../models/users/user');
const crypto =require('crypto');
const jwt = require('jsonwebtoken');


exports.resetPassword = async(req,res,next)=>{
    const {tokens,newPassword,passwordConfirm}=req.body;
    try{

        //get user based on the token
        const hashedToken = crypto.createHash('sha256').update(tokens).digest('hex');
        const user = await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        //set the new password if token has not expired and their is a user
        user.password =  newPassword;
        user.passwordConfirm =  passwordConfirm;
        user.passwordResetToken =  undefined;
        user.passwordResetExpires= undefined;
        await user.save();
        //update the changedPasswordAt property for the user


        //log the user in, send JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        return res.json({
            status: 'success',
            token: token
        });

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}