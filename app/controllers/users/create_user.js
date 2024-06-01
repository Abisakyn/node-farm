const User = require('../../models/users/user');
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(200).json({ newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
