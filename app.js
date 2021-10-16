// require express
const express = require('express')
const app = express()

// require body-parser
const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))

// require express-handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// require static files
app.use(express.static('public'))

// set port
const port = 3000

// require mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/login-basic')
const db = mongoose.connection
db.once('error', () => {
  console.log('Mongodb error!')
})
db.once('open', () => {
  console.log('Mongodb connected!')
})

// require user model
const Users = require('./models/user')

// listen to port
app.listen(port, () => {
  console.log(`Express is listening to http://localhost:${port}`)
})

// set route
// get login page
app.get('/', (req, res) => {
  res.render('index')
})

// post login page
app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  Users.find({ email, password })
    .lean()
    .then(result => {
      if (result.length) {
        const firstName = result[0].firstName
        res.render('welcome', { firstName })
      } else {
        const loginFail = true
        res.render('index', { loginFail })
      }
    })
})