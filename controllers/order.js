const OrderService = require('../services/order')
const StationService = require('../services/station')

class OrderController {

  static async getOrdersPage(req, res) {
    let orders = await OrderService.findAll()
    res.render('orders', {orders})
  }

  static async getOrderDetailsPage(req, res) {
    try {
      let order = req.query.order_id ? await OrderService.findById(req.query.order_id) : req.query.tracking_id ? await OrderService.findByTrackingId(req.query.tracking_id) : null
      if (! order) {
        req.flash('error_msg', 'Invalid Order Tracking ID Was Provided!')
        return res.redirect('/track-orders')
      }
      res.render('order', {order})
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Unexpected Error Occurred! Please Try Again.')
      return res.redirect('/track-orders')
    }
  }

  static async getTrackOrderPage(req, res) {
    res.render('track-order')
  }
 
  static async createOrderPage(req, res) {
    let order_label = `OD-${new Date().getTime()}`
    res.render('orders-new', {order_label})
  }

  static async createOrder(req, res) {
    let dao = req.body
    dao.status = 'In-Transit'
    dao.locations = [dao.origin]
    try {
      await OrderService.create(dao)
      res.redirect('/orders')
    } catch (err) {
      console.log(err)
      res.redirect('/orders')
    }
  }

  static async updateOrderPage(req, res) {
    let order = await OrderService.findById(req.params.order_id)
    let stations = await StationService.findAll()
    res.render('orders-update', {order, stations})
  }

  static async updateOrder(req, res) {
    let dao = req.body
    let newLocation = dao.current_town
    newLocation += dao.nearest_station ? ` -> ${dao.nearest_station}` : ''
    try {
      let ans = await OrderService.updateLocationAndStatus(req.params.order_id, newLocation, dao.status)
      res.redirect('/orders')
    } catch (err) {
      console.log(err)
      res.redirect('/orders')
    }
  }

  static async cancelOrder(req, res) {
    try {
      await OrderService.cancelOrder(req.query.order_id)
      res.redirect('/orders')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/orders')
    }
  }

  static async removeOrder(req, res) {
    try {
      await OrderService.removeOne(req.params.student_id)
      res.redirect('/orders')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/orders')
    }
  }

}

module.exports = OrderController