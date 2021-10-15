// require express
const express = require('express')
const app = express()

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

// listen to port
app.listen(port, () => {
  console.log(`Express is listening to http://localhost:${port}`)
})

// set route
app.get('/', (req, res) => {
  res.redirect('/')
})