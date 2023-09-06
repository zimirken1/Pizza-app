const {Schema, model} = require('mongoose')

const Pizza = new Schema({
    name: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true}
})

module.exports = model('Pizza', Pizza)

