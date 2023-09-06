const Router = require('express')
const orderController = require("../controllers/orderController");
const roleMiddleware = require("../Middleware/roleMiddleware");
const router = new Router()

router.post('/', orderController.createOrder)
router.get('/getAll',roleMiddleware(['Admin']), orderController.getOrders)
router.get('/', orderController.getUserOrders)
router.post('/finish', orderController.finishOrder)
module.exports = router