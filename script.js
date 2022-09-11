
// Sequelize is an ORM for MySQL, Mongoose is an ODM for MongoDB - they work in the same way

// require the mongoose module
const mongoose = require('mongoose')

// To set up a mongoose connection, we need to connect to a mongoDB database
// if it's a database on your local device, just write 'mongodb://localhost/nameOfDatabase'
// the second argument is a callback function that is executed everytime the mongoose connection is made
// third argument is a callback function that is executed if there is an error in the connection
mongoose.connect('mongodb://localhost/testdb', () => {
    console.log('connected to database...')
}, (error) => {
    console.log(error)
})