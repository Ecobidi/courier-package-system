const CustomerModel = require('../models/customer')

class CustomerService {

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return CustomerModel.find({$or: [{surname: pattern}, {other_names: pattern}]})
  }

  static async findById(id) {
    return CustomerModel.findById(id)
  }
  
  static async findAll() {
    return CustomerModel.find()
  }

  static async create(dao) {
    return CustomerModel.create(dao)
  }

  static async removeOne(id) {
    return CustomerModel.findByIdAndRemove(id)
  }

}

module.exports = CustomerService