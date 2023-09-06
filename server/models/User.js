const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    address: {type: String, required: true},
    phone: {type: String, required: true}
})

module.exports = model('User', User)