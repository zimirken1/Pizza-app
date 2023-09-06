const {Schema, model, mongoose} = require('mongoose')

const Order = new Schema({
    items: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pizza'

    }],
    createdAt: { type: Date, default: Date.now() },
    status: {type: String, required: true, default: "Принят"},
    //user: {type: mongoose.Schema.Types.ObjectId}
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Order', Order)

