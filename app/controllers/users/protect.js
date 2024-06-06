const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const User = require('../../models/users/user');

exports.protect = async (req, res, next) => {
    try {
        // Get token and check if it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('Unauthorized: No token provided', 401));
        }

        // Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        if (!decoded) {
            return next(new AppError('Unauthorized: Invalid token', 401));
        }

        // Check if user still exists
        const currentUser = await User.findById(decoded.id);
        console.log('Current User:', currentUser);

        if (!currentUser) {
            return next(new AppError('The user belonging to this token does not exist', 401));
        }

        
        
        
        //Check if user changed password after token was issued (optional)
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('User recently changed password! Please log in again.', 401));
        }

        //grant access to the protected route

        req.user = currentUser;

        next();
    } catch (error) {
        console.error('Error in protect middleware:', error);
        return next(new AppError('Unauthorized: Token verification failed', 401));
    }
};

exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action',403))
        }
        next()
    }
}
