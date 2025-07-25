const express= require('express');
const morgan = require('morgan'); //logging details about http requests
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter=require('./routes/productRoutes');
//const cartRouter = require('./routes/cartRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const comparelistRouter = require('./routes/comparelistRoutes');
const app= express();

//Set Security HTTP Headers
app.use(helmet({crossOriginResourcePolicy: {policy: "cross-origin"}}));

//Enable CORS

app.use(cors());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json()); // parse incoming JSON rquests
app.use(express.static(`${__dirname}/public`));

//Limit requests
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
})
app.use('/api', limiter);


//Data Sanitization against NOSQL query injection
app.use(mongoSanitize());

//Data Sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(hpp()); //if there are multiple parameters in a request, then return data for first parameter by default.

app.use('/api/v1/products', productRouter);
//app.use('/api/v1/cart', cartRouter );
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/wishlist', wishlistRouter);
app.use('/api/v1/comparelist', comparelistRouter);

//Middleware for handling unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;