const Pizza = require('../models/Pizza')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
class PizzaController {
    async create(req, res, next) {
        try {
            const {name, price, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const pizza = new Pizza({name, img: fileName, price, description})
            await pizza.save();
            return res.json(pizza)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const name = req.body.name
            console.log(name)
            await Pizza.deleteOne({name: `${name}`})
            return res.status(200).json({message: "Удалено успешно"})
            }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const pizzas = await Pizza.find()
        return res.json(pizzas)
    }

    async getOne(req, res) {
        const {id} = req.params
        const pizza = await Pizza.findOne({_id: `${id}`})
        return res.json(pizza)
    }
}

module.exports = new PizzaController()