const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please tell us your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please tell us your last name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
                //This only works on User.create and User.save
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not same!'
        }
    },
    passwordChangedAt: Date
})

//Encrypt the password
userSchema.pre('save', async function(next) {
    //only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    //Hash the password with cost factor of 12 which means the algorithm will perform 2^12 iterations of hashing.
    this.password = await bcrypt.hash(this.password, 12);
    //Delete Password Confirm field
    this.passwordConfirm = undefined;
    next();
})

//Instance method is a method that is available on all documents
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

//check whether user has changed password after the token was issued
userSchema.methods.changedPasswordAfter = async function(JWTTimeStamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimeStamp+1 < changedTimestamp
    }

    return false;
}

const User = mongoose.model('User', userSchema);
module.exports = User;