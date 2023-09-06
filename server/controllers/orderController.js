const Order = require('../models/Order')
const ApiError = require('../error/ApiError')
const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const User = require('../models/User')
class OrderController {
    async createOrder(req, res) {
        try {
            const {items} = req.body
            const token = req.headers.authorization.split(" ")[1]
            const {id: userId} = jwt.verify(token, secret)
            const user = await User.findById(userId);
            //const data = JSON.parse(req.body);
            // Создание нового объекта заказа на основе тела POST-запроса
            const order = new Order({items: items, createdBy: user});
            // Сохранение заказа в базе данных
            const savedOrder = await order.save();

            res.send(savedOrder);
        } catch(error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getUserOrders(req, res) {
        const token = req.headers.authorization.split(" ")[1]
        const {id: userId} = jwt.verify(token, secret)
        const user = await User.findById(userId);
        const order = await Order.find({createdBy: user})
            .populate('createdBy')
            .populate('items',)
            .exec()
        //.populate('items')
        return res.json(order)
    }

    async getOrders(req, res) {
        const order = await Order.find({status: "Принят"})
            .populate('createdBy')
            .populate('items',)
            .exec()
        return res.json(order)
    }

    async finishOrder(req, res) {
        const id = req.body.id
        await Order.updateOne({_id: `${id}`}, {$set: {status: "Завершён"}})
        return res.status(200).json({message: "Обновлено успешно"})
    }
}

module.exports = new OrderController()