const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User =require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res,  message) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        message,
        token,
        data: {user}
    });
}

exports.signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
    });

    createSendToken(newUser, 201, res, 'User created successfully')
})

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;

    //check if email and password exists
    if(!email || !password){
        return next(new AppError('Please provide email and password', 404));
    }

    //check if user exists and password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email and password', 401));
    }

    //if everything ok, send token to client
    createSendToken(user, 200, res, 'You have been successfully logged in');
})

exports.protect = catchAsync(async(req, res, next) => {
    //Getting token and check if it exists there
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new AppError('You are not logged in! Please login to get access', 401));
    }

    //Token Verification means if someone has manipulated data or token has already been expired.
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    //check if user still exist
   const currentUser = await User.findById(decoded.id);
    if(!currentUser) return next(new AppError('The user belonging to this token does no longer exist', 401));

    //check if user changed password after token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User currently changed password. Please login again!', 401));
    }

    // Grant access to protected route
    req.user = currentUser; 
    next();
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action', 401));
        }
        next();

    }
}