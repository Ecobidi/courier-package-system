const OrderModel = require('../models/order')

class OrderService {
  
  static async findById(id) {
    return OrderModel.findById(id)
  }

  static async findByTrackingId(t_id) {
    return OrderModel.findOne({order_label: t_id})
  }
  
  static async findAll() {
    return OrderModel.find({})
  }

  static async cancelOrder(order_id) {
    return OrderModel.findByIdAndUpdate(order_id, {$set: {status: 'Cancelled'}})
  }

  static async updateLocationAndStatus(order_id, location, status) {
    let order = await OrderModel.findById(order_id)
    location && order.locations.push(location)
    order.status = status
    return order.save()
  }

  static async create(dao) {
    return OrderModel.create(dao)
  }

  static async removeOne(id) {
    return OrderModel.findByIdAndRemove(id)
  }

}

module.exports = OrderService