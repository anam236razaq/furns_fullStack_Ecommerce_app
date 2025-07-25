const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../models/productModel');
//const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');

dotenv.config({path: './config.env'});

mongoose.connect(process.env.DATABASE_LOCAL)
.then(() => console.log("DB Connection Successful"));

//READ JSON File
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));
//const cart = JSON.parse(fs.readFileSync(`${__dirname}/cart.json`, 'utf-8'));
const orders = JSON.parse(fs.readFileSync(`${__dirname}/orders.json`, 'utf-8'));

//IMPORT Data into DB
const importData = async() => {
    try{
        const updatedProducts = products.map((product)=> ({
            ...product,
            img: `http://127.0.0.1:3000${product.img}`,
        })); 
        await Product.insertMany(updatedProducts);

        //Importing orders
        for(const order of orders){ 
            //creating orderItems and getting their Ids
            const orderItemIds =[];
            for(const item of order.orderItems){
                const orderItem =new OrderItem(item);
                const savedItem = await orderItem.save();
                orderItemIds.push(savedItem._id);
            }

            //Create order with orderItemIds
            const newOrder = new Order({...order, orderItems: orderItemIds});
            await newOrder.save();
        }

        //await Cart.create(cart);
        console.log('Data Sucessfully loaded');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

//Delete data from DB
const deleteData = async () => {
    try{
        await Product.deleteMany();
        //await Cart.deleteMany();
        await OrderItem.deleteMany();
        await Order.deleteMany();
        console.log("Data Sucessfully Deleted");
    }catch(err){
        console.log(err);
    }
    process.exit();
}

console.log(process.argv);

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}