const mongoose = require('mongoose');

const compareListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const Comparelist = mongoose.model("Comparelist", compareListSchema);
module.exports = Comparelist;