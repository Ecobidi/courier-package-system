const router = require('express').Router()
// const { body } = require('express-validator')
const UserController = require('../controllers/user')

router.get('/', UserController.getAllUsersPage)

router.get('/new', UserController.createUserPage)

router.post('/new', UserController.createUser)

router.get('/remove/:user_id', UserController.removeUser)

module.exports = router