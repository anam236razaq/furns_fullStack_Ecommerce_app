const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Comparelist = require('../models/CompareListModel');

exports.addToComparelist = catchAsync(async(req, res) => {
    const {userId, productId} = req.body;

    const comparelist = await Comparelist.findOneAndUpdate(
        {userId},
        {$addToSet: {products: productId}}, // add to array and Prevents duplicate entries
        {new: true, upsert: true} // Creates wishlist if not found
    )

    res.status(200).json({
        status: "success",
        message: "added to comparelist",
        data: { comparelist }
    });

})

exports.removeFromComparelist = catchAsync(async(req, res, next) => {
    const {userId, productId} = req.body;

    const comparelist = await Comparelist.findOneAndUpdate(
        {userId},
        {$pull: {products: productId}}, // Removes product from array
        {new: true}
    )

    if(!comparelist){
        return next(new AppError("Comparelist not found", 404));
    }

    res.status(200).json({
        status: 'success',
        message: "removed from comparelist",
        data: {comparelist}
    })
})


exports.getComparelist = catchAsync(async(req, res, next) => {
    const {userId} = req.params;

    const comparelist = await Comparelist.findOne({userId}).populate('products');

    if(!comparelist){
        return next (new AppError("Comparelist not found", 404));
    }

    res.status(200).json({
        status: 'success',
        data: { comparelist }
    })
})