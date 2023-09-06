const Router = require('express')
const router = new Router()
const pizzaController = require('../controllers/pizzaController')
const checkRole = require('../Middleware/roleMiddleware')

router.post('/', checkRole('Admin'), pizzaController.create)
router.get('/', pizzaController.getAll)
router.get('/:id', pizzaController.getOne)
router.post('/delete', checkRole('Admin'), pizzaController.delete)

module.exports = router