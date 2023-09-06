const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const pizzaRouter = require('./pizzaRouter')
const orderRouter = require('./orderRouter')

router.use('/pizza',pizzaRouter)
router.use('/order', orderRouter)
router.use('/user', authRouter)

module.exports = router