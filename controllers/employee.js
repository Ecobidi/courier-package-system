const path = require('path')
const EmployeeService = require('../services/employee')

class EmployeeController {

  static async getAllEmployeesPage(req, res) {
    if (req.query.search && req.query.search.length > 1) {
      let employees = await EmployeeService.findByName(req.query.search) 
      return res.render('employees', {employees}) 
    }
    let employees = await EmployeeService.findAll()
    res.render('employees', {employees})
  }

  static async createEmployeePage(req, res) {
    res.render('employees-new', { error_msg: req.flash('error_msg') })
  }

  static async createEmployee(req, res) {
    let dao = req.body
    if (dao.password != dao.retype_password) {
      req.flash('error_msg', 'Passwords do not match')
      return res.redirect('/employees/new')
    }
    try {
      // check for same username
      let sameUsername1 = await EmployeeService.findByUsername(dao.username)
      if (sameUsername1) {
        req.flash('error_msg', 'Username is already taken')
        return res.redirect('/employees/new')
      }
      if (req.files) {
        let file = req.files.photo
        let extname = path.extname(file.name)
        let filename = 'user_' + new Date().getMilliseconds() + extname
        await file.mv(process.cwd() + '/uploads/images/' + filename)
        dao.photo = filename
        await EmployeeService.create(dao)
      } else {
        await EmployeeService.create(dao)
      }
      res.redirect('/employees')
    } catch (err) {
      console.log(err)
      res.redirect('/employees')
    }
  }

  static async removeEmployee(req, res) {
    try {
      await EmployeeService.removeOne(req.params.employee_id)
      res.redirect('/employees')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/employees')
    }
  }

}

module.exports = EmployeeController