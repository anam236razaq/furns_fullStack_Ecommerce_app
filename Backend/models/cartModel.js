/*const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: Number,
        }
    ],
    totalPrice: Number,
});      

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;*/