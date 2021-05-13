const path = require('path')
const UserService = require('../services/user')

class UserController {

  static async getAllUsersPage(req, res) {
    let users = await UserService.findAll()
    res.render('users', {users})
  }

  static async createUserPage(req, res) {
    res.render('users-new', { error_msg: req.flash('error_msg') })
  }

  static async createUser(req, res) {
    let dao = req.body
    if (dao.password != dao.retype_password) {
      req.flash('error_msg', 'Passwords do not match')
      return res.redirect('/users/new')
    }
    try {
      // check for same username
      let sameUsername1 = await UserService.findByUsername(dao.username)
      if (sameUsername1) {
        req.flash('error_msg', 'Username is already taken')
        return res.redirect('/users/new')
      }
      if (req.files) {
        let file = req.files.photo
        let extname = path.extname(file.name)
        let filename = 'user_' + new Date().getMilliseconds() + extname
        await file.mv(process.cwd() + '/uploads/images/' + filename)
        dao.photo = filename
        await UserService.create(dao)
      } else {
        await UserService.create(dao)
      }
      res.redirect('/users')
    } catch (err) {
      console.log(err)
      res.redirect('/users')
    }
  }

  static async removeUser(req, res) {
    try {
      await UserService.removeOne(req.params.user_id)
      res.redirect('/users')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/users')
    }
  }

}

module.exports = UserController