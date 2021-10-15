// require mongoose
const mongoose = require('mongoose')

// require User model
const User = require('../user')

// set seed user
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

// connect mongodb
mongoose.connect('mongodb://localhost/login-basic')
const db = mongoose.connection
db.on('error', () => {
  console.log('Mongodb error!')
})

// add seeds
db.once('open', () => {
  console.log('Mongodb connected!')
  User.insertMany(users)
    .then(() => {
      console.log('seeder done')
    })
})