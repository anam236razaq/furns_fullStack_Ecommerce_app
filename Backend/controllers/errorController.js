const AppError = require("../utils/appError");

//for handling Invalid Database ID's
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 404);
}

//for handling duplicate database fields
const handleDuplicateFieldsDB = err => {
    const value = Object.keys(err.keyValue)[0];
    const message = `The ${value} already exist. Please use another value`;
    return new AppError(message, 400);
}

//for handling Validation errors
const handleValidationErrorDB = err=> {
    const errors = Object.values(err.errors).map(el=> el.message);
    const message = `Invalid Input Data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

// for handling invalid token
const handleJWTError = () => 
    new AppError('Invalid token. Please login again!', 401);

//  for handling if token has expired
const handleExpiredError = () =>
    new AppError('Your token has expired. Please login again!', 401);

const sendError = (err, res) => {

    //Operational Errors: Send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }else{

        //Programming Errors
        res.status(500).json({
            status: 'error',
            message: "Something Went Wrong"
        });
        }
}


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    let error = { ...err };  
    error.message = err.message;
    
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleExpiredError();

    sendError(error, res);
};