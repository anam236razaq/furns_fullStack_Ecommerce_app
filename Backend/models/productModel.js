const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: [true, 'A Product must have a name'],
        minLength: [10, 'A Product name must have more or equal than 10 characters'],
        maxLength: [40, 'A Product name must have less or equal than 40 characters'],
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
    },
    startSaleDate: {
        type: Date
    },
    endSaleDate: {
        type: Date
    },
    saleStatus: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Expired"]
    },
    stock: {
        type: [String, Number],
        required: true,
    },
    img: String,
    sku: {
        type: String,
        default: null,
    },
    discount: String,
    category: String,
    relatedCategory: String,
    type: [String],
    size: [String],
    color: [String],
    longDescription: String,
    reviews: [
        {
            name: {type: String, required: true},
            review: {type: String, required: true},
            rating: {type: Number, min: 1, max: 5, required: true},
        }
    ],
    faqs: [
        {
            customerName: {type: String, required: true},
            sellerName: {type: String, required: true},
            questionTime: { type: Date, required: true },
            answerTime: { type: String, required: true },
            question: { type: String, required: true },
            answer: { type: String, required: true },
        }
    ],
    topSellQuantity: Number,
    topSellAmount: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;