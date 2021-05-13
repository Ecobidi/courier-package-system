const router = require('express').Router()
const OrderController = require('../controllers/order')

router.get('/', OrderController.getOrdersPage)

router.get('/new', OrderController.createOrderPage)

router.post('/new', OrderController.createOrder)

router.get('/track-order', OrderController.getTrackOrderPage)

router.get('/update/:order_id', OrderController.updateOrderPage)

router.post('/update/:order_id', OrderController.updateOrder)

router.get('/view', OrderController.getOrderDetailsPage)

router.get('/remove/:order_id', OrderController.removeOrder)

module.exports = router