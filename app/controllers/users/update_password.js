const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const User = require('../../models/users/user');

exports.updatePassword = async (req, res, next) => {
    const { password, passwordCurrent } = req.body;
    const {id}=req.params

    try {
        // Get user from collection
        const user = await User.findById(id).select('+password');

        // Check if the posted password is correct
        if (!user || !(await user.correctPassword(passwordCurrent, user.password))) {
            return next(new AppError('Your current password is incorrect.', 401));
        }

        // Update the password
        user.password = password;
        user.passwordConfirm = password;
        await user.save();

        // Log in user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        return res.json({
            status: 'success',
            token: token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
