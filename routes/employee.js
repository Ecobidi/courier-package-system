const router = require('express').Router()
const EmployeeController = require('../controllers/employee')

router.get('/', EmployeeController.getAllEmployeesPage)

router.get('/new', EmployeeController.createEmployeePage)

router.post('/new', EmployeeController.createEmployee)

router.get('/remove/:employee_id', EmployeeController.removeEmployee)

module.exports = router