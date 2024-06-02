const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, //when you want to converte the entered email to lowercase
        validate:[validator.isEmail,'please enter a valid email'] // when you want to use a custom validator
    },
    photo:{
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            //this only works on save!!
            validator: function(value) {
                return value === this.password;
            },
            message: 'Passwords are not the same'
        }
    },
    OTP:{
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
});

userSchema.pre('save', async function(next) {

    //only run this function if password is actually modified
    if(!this.isModified('password'))return next();

    //hash is asyn while hashSync is synchronous which can lead to an event loop
    //hash the password
    this.password = await bcryptjs.hash(this.password, 12);

    //delete the passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});


module.exports = mongoose.model("User", userSchema);
