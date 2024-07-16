const jwt = require('jsonwebtoken');
const User = require('../../models/users/user');
const AppError = require('../../utils/appError');

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return next(new AppError('Please enter email and password', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Password or email is incorrect', 401));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true, // cookie cannot be accessed or modified in any way by the browser
            secure: false, // only accept https
            sameSite: 'none'
        };

        res.cookie('jwt', token, cookieOptions);

         
        user.password = undefined;

        return res.json({
            status: 'success',
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
