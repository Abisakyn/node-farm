const { compareSync } = require('bcryptjs')
const User = require('../../models/users/user')
const AppError =require('../../utils/appError')

exports.loginUser = async (req, res)=>{
    const {email,password}=req.body

    try{
        if(!email ||!password){
            next(new AppError('please enter email and password',400))
        }
        const user = await User.findOne({ email: email, isVerified: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found or not verified' });
        }

        const isPassword = await compareSync(password, user.password)

        if(!isPassword){
            return res.status(404).json({error:'Password is incorrect'})
        }

        return res.json({message:"Login successful"})

    }catch(error){
        res.status(500).json({error:error.message})
    }
}