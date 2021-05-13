let express = require('express')
let expressSession = require('express-session')
let fileupload = require('express-fileupload')
let connectFlash = require('connect-flash')
let mongoose = require('mongoose')

let { APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, domain, owner_mat_no, owner_name} = require('./config') 

const states = require('./config/states')

// routes
const { LoginRouter, UserRouter, OrderRouter, EmployeeRouter, CustomerRouter, StationRouter } = require('./routes')

// models
const OrderModel = require('./models/order')
const EmployeeModel = require('./models/employee')
const CustomerModel = require('./models/customer')
const StationModel = require('./models/station')
const UserModel = require('./models/user')

// connect to mongodb database
mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())

app.use(fileupload())

// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
}))
app.use(connectFlash())

app.use((req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user || { username: 'test' }
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME
  app.locals.port = PORT
  app.locals.domain = domain + ':' + PORT
  app.locals.states = states
  next()
})

// routes

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.username = ''
  res.redirect('/login')
})

let getDashboard = async (req, res) => {
  try {
    let orders_count = await OrderModel.count()
    let customers_count = await CustomerModel.count()
    let employees_count = await EmployeeModel.count()
    let stations_count = await StationModel.count()
    let users_count = await UserModel.count()
    res.render('dashboard', {orders_count, customers_count, employees_count, users_count, stations_count})
  } catch (err) {
    console.log(err)
    res.render('dashboard', {
      customers_count: 0,
      orders_count: 0, employees_count: 0, users_count: 0, stations_count: 0,
    })
  }
}

app.get('/', getDashboard)

app.get('/dashboard', getDashboard)

app.use('/employees', EmployeeRouter)

app.use('/orders', OrderRouter)

app.use('/customers', CustomerRouter)

app.use('/stations', StationRouter)

app.use('/users', UserRouter)


app.listen(PORT, () => { console.log(`${APPNAME} running on port ${PORT}`) })