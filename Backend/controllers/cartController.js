/*const Cart = require('./../models/cartModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getCart = catchAsync(async(req, res, next) => {
    const cart = await Cart.findOne({user:req.params.userId}).populate('user').populate('items.product');

    if(!cart){
        return next(new AppError('Cart not found!', 400));
    }

    res.status(200).json({
        status: 'success',
        data: {cart: cart || {items: []}}
    })
});

exports.addItemToCart = catchAsync(async(req, res, next) => {
    const {item} = req.body;
    let cart = await Cart.findById(req.params.id);

    if(!cart){
        cart = await Cart.create({items: [item]});
    }else{
        const existingItem = cart.items.find((i)=> i.name === item.name);

        if(existingItem){
            existingItem.quantity+=item.quantity;
        }else{
            cart.items.push(item);
        }
        await cart.save();
    }

    res.status(200).json({
        status: 'success',
        data: {cart}
    })
})

exports.deleteFromCart = catchAsync(async(req, res, next) => {
    const {itemId} = req.params;
    const cart =await Cart.findById(req.body.id);

    if(!cart){
        return next(new AppError('Cart Not found', 404));
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json({
        status: 'success',
        data: {cart}
    })
})

exports.clearCart = catchAsync(async(req, res, next) => {
    const {id} = req.body;
    const cart = await Cart.findById(id);

    if(!cart){
        return next(new AppError('Cart not found', 404));
    }

    cart.items =[];
    await cart.save();

    res.status(200).json({
        status:'success',
        message: 'Cart cleared successfully'
    })
})*/