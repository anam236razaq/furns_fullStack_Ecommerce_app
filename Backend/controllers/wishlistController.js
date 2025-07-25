const Wishlist = require('../models/WishlistModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.addToWishlist = catchAsync(async(req, res) => {
    const {userId, productId} = req.body;

    const wishlist = await Wishlist.findOneAndUpdate(
        {userId},
        {$addToSet: {products: productId}}, // add to array and Prevents duplicate entries
        {new: true, upsert: true} // Creates wishlist if not found
    )

    res.status(200).json({
        status: "success",
        message: "added to wishlist",
        data: { wishlist }
    });

})

exports.removeFromWishlist = catchAsync(async(req, res, next) => {
    const {userId, productId} = req.body;

    const wishlist = await Wishlist.findOneAndUpdate(
        {userId},
        {$pull: {products: productId}}, // Removes product from array
        {new: true}
    )

    if(!wishlist){
        return next(new AppError("Wishlist not found", 404));
    }

    res.status(200).json({
        status: 'success',
        message: "removed from wishlist",
        data: {wishlist}
    })
})


exports.getWishlist = catchAsync(async(req, res, next) => {
    const {userId} = req.params;

    const wishlist = await Wishlist.findOne({userId}).populate('products');

    if(!wishlist){
        return next (new AppError("Wishlist not found", 404));
    }

    res.status(200).json({
        status: 'success',
        data: {wishlist}
    })
})