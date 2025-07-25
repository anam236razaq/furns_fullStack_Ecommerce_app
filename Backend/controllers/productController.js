const Product = require('./../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllProducts = catchAsync(async(req, res) => {
    let query = Product.find();

    if(req.query.sort){
    const features = new APIFeatures(Product.find(), req.query).sort();
    query = features.query;
    }

    if(req.query.page || req.query.limit){
        const features = new APIFeatures(Product.find(), req.query).paginate();
        query = features.query;
        }
    
    const products = await query;

    res.status(200).json({
        status: 'success',
        data: {products}
    })
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new AppError('No Product find with that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {product}
    })
});

exports.createProduct = catchAsync (async (req, res) => {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct,
        }
    })
});

exports.updateProduct = catchAsync(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true
    })

    if(!product) {
        return next(new AppError('No Product find with that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product   
        }
    })
});

exports.deleteProduct = catchAsync( async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product){
        return next(new AppError('No product find with that id', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
});

exports.getRelatedProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new AppError('No Product find with that id', 404));
    }

    const relatedProducts = await Product.find({
        relatedCategory: product.relatedCategory,
        _id: {$ne: product._id},
    }).limit(4);

    res.status(200).json({
        status: 'success',
        data: {relatedProducts}
    })
});

