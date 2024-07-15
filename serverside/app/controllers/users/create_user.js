const jwt = require('jsonwebtoken');
const User = require('../../models/users/user');
const bcryptjs = require('bcryptjs');

exports.signup = async (req, res) => {
    const { name, email, password, passwordConfirm, role } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const newUser = new User({
            name,
            email,
            password,
            passwordConfirm,
            role 
        });

        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        await newUser.save();

        return res.status(201).json({ newUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
