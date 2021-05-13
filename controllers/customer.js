const CustomerService = require('../services/customer')

class CustomerController {

  static async getAllCustomersPage(req, res) {
    if (req.query.search && req.query.search.length > 1) {
      let customers = await CustomerService.findByName(req.query.search) 
      return res.render('customers', {customers}) 
    }
    let customers = await CustomerService.findAll()
    res.render('customers', {customers})
  }

  static async createCustomerPage(req, res) {
    res.render('customers-new')
  }

  static async createCustomer(req, res) {
    let dao = req.body
    try {
      await CustomerService.create(dao)
      res.redirect('/customers')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/customers')
    }
  }

  static async removeCustomer(req, res) {
    try {
      await CustomerService.removeOne(req.params.customer_id)
      res.redirect('/customers')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/customers')
    }
  }

}

module.exports = CustomerController