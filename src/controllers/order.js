const { Order, OrderItem } = require('../models');

// create order
const createOrder = async (req, res) => {
    try {
        const {name, phone, address, status, payment_method, payment_status, total_price, delivery_fee, notes, items} = req.body;
        
        const order = await Order.create({name, phone, address, status, payment_method, payment_status, total_price, delivery_fee, notes});

        const orderItems = items.map((e) => ({
                order_id: order._id, 
                food_id: e._id, 
                quantity: e.quantity, 
                unit_price: e.unit_price
        }));

        await OrderItem.insertMany(orderItems)

        res.status(201).json(order);

    } catch(err){
        res.status(500).json({message: err.message});
    }
}

// get all
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json({
            total: orders.length,
            data: orders
        });

    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// get one order
const getOneOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const order = await Order.findById(id);

        res.status(200).json(order);

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { createOrder, getOneOrder, getAllOrders }