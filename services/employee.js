const EmployeeModel = require('../models/employee')

class EmployeeService {

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return EmployeeModel.find({$or: [{surname: pattern}, {other_names: pattern}]})
  }

  static async findByUsername(username) {
    return EmployeeModel.findOne({username})
  }
  
  static async findAll() {
    return EmployeeModel.find()
  }

  static async create(dao) {
    return EmployeeModel.create(dao)
  }

  static async removeOne(id) {
    return EmployeeModel.findByIdAndRemove(id)
  }

}

module.exports = EmployeeService