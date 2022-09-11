
// Sequelize is an ORM for MySQL, Mongoose is an ODM for MongoDB - they work in the same way

// for mongoDB we have a database, which has collections, which have documents

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


// importing the User model defined in User.js
const User = require('./User')



// All of the mongoDB methods that were available to you in the command prompt are now available on the User model



// creating a new document (new user)

// one way is using User() as a constructor function
const createNewUserKyle = async function() {

    const kyleUser = new User({ firstName: 'Kyle', age: 27})

    // we need to actually SAVE kyleUser to the mongoDB database
    // .save() is asynchronous, so usually the creation of a new document is done inside an async function
    await kyleUser.save()

    console.log(kyleUser)
    // you don't have to worry about the __v property
}

createNewUserKyle()

// another way to create a new document (new user) is to use .create()
const createNewUserJoe = async function() {
    const joeUser = await User.create({ firstName: 'Joe', age: 23})

    console.log(joeUser)
}

createNewUserJoe()



// updating a document value
const updateNewUserJill = async function() {

    const jillUser = await User.create({ firstName: 'Jill', age: 26})

    console.log(jillUser)

    // first change the firstName value
    jillUser.firstName = 'Anna Maria'

    // then actually save that change to the database
    jillUser.save()

    console.log(jillUser)
}

updateNewUserJill()