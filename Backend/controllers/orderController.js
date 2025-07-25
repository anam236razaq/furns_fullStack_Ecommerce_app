const Order = require('./../models/orderModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const OrderItem = require('../models/orderItemModel');

exports.getAllOrders = catchAsync(async(req, res) => {
    const orders = await Order.find().populate('user', 'firstName lastName');

    res.status(200).json({
        status: 'success',
        data: {orders}
    })
});

exports.getOrder = catchAsync(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName')
    .populate({ path: 'orderItems', populate: {path: 'product', select: 'name'}});

    if(!order){
        return next(new AppError('No Order found with that Id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {order}
    })
})

exports.createOrder = catchAsync(async(req, res) => {
    //creating orderItems and save them
    const orderItems = await Promise.all(req.body.orderItems.map(async (orderItem) => {
        const newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        return await newOrderItem.save();
    }));

    //Calculating total Price
    let totalPrice =0;
    for(const orderItem of orderItems){
        const item = await OrderItem.findById(orderItem._id).populate('product', 'price salePrice');
        const price = item.product.salePrice || item.product.price;
        totalPrice+= price * item.quantity;
    }

    let order = new Order({
        orderItems: orderItems.map(item => item._id),
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice,
        user: req.body.user
    })

    order = await order.save();

    if(!order){
        return next(new AppError('The order cannot be created', 400));
    }

    res.status(201).json({
        status: 'success',
        data: {order}
    })
})

exports.updateOrder = catchAsync(async(req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});

    if(!order){
        return next(new AppError('No order found with that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {order}
    })
})

exports.deleteOrder = catchAsync(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new AppError('No order found with that id', 404));
    }

    await Promise.all(order.orderItems.map(async (orderItem) => {
        await OrderItem.findByIdAndDelete(orderItem);
    }));

    await order.deleteOne({_id: req.params.id});

    res.status(200).json({
        status: 'success',
        data: null
    })
})