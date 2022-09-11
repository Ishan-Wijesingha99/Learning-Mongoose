
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
    try {
        const kyleUser = new User({ firstName: 'Kyle', age: 27})

        // we need to actually SAVE kyleUser to the mongoDB database
        // .save() is asynchronous, so usually the creation of a new document is done inside an async function
        await kyleUser.save()

        console.log(kyleUser)
        // you don't have to worry about the __v property
    } catch (error) {
        console.log(error.message)
    }
}

createNewUserKyle()



// another way to create a new document (new user) is to use .create()
const createNewUserJoe = async function() {
    try {
        const joeUser = await User.create({ firstName: 'Joe', age: 23})

        console.log(joeUser)   
    } catch (error) {
        console.log(error.message)
    }
}

createNewUserJoe()



// updating a document value
const updateNewUserJill = async function() {
    try {
        const jillUser = await User.create({ firstName: 'Jill', age: 26})

        console.log(jillUser)

        // first change the firstName value
        jillUser.firstName = 'Anna Maria'

        // then actually save that change to the database
        jillUser.save()

        console.log(jillUser)
    } catch (error) {
        console.log(error.message)
    }
}

updateNewUserJill()



// finder methods

// find by Id, this is where you can find a document by using it's objectId
const findKyleById = async function() {
    try {
        const kyleUser = await User.findById("631dd0fc7fc3c16ab2dccb26")

        console.log('----------', kyleUser, '----------')
    } catch (error) {
        console.log(error.message)
    }
}

findKyleById()



// .findOne()
// this works identically to how it works in mongoDB
// .find() also works identically to how it works in mongoDB
const findJoeUsingName = async function() {
    try {
        const joeUser = await User.findOne({ firstName: 'Joe' })

        console.log('---------------', joeUser, '--------------')
    } catch (error) {
        console.log(error.message)
    }
}

findJoeUsingName()



// to delete the first document that matches the condition (only deletes one)...
// deleteOne() should be used
// await User.deleteOne({ firstName: 'Jill'})

// to delete all documents that match the condition
// deleteMany() should be used
// await User.deleteMany({ firstName: 'Joe'})



// mongoose queries
// we can find a document based on some helpful methods
const findUsingQueries = async function() {
    try {
        // we can chain them together, it will be AND (INTERSECTION)
        // these methods will return ALL the documents that satisfy the conditions
        // we can limit how many users are returned, so both these cases we limited it to 2
        // we can also use select() so that we only return the fields that we want, in the second case below, only the firstName will be returned, the age and all the other fields will be disregarded

        const kyleUser = await User.where('name').equals('Kyle').where('age').equals(27).limit(2)

        const youngAdultUser = await User.where('age').gt(18).lt(25).limit(2).select('firstName')

        console.log('---Using Queries---', kyleUser)
        console.log('---Using Queries---', youngAdultUser)

    } catch (error) {
        console.log(error.message)
    }
}

findUsingQueries()



// populate() query
// let's say we want to add the bestFriend property to the document that has Kyle
const kyleBestFriendPopulate = async function() {
    try {
        // first let's find the kyle document
        const kyleUser = await User.findOne({ firstName: 'Kyle' })

        // then, let's add to the bestFriend field because it's currently empty
        kyleUser.bestFriend = "631daff5c7909f107e368ab7" // this is the objectId for Joe

        // what this will do is, it will go to the bestFriend field in KyleUser, and then based on the objectId that was written in it, it will POPULATE the bestFriend field. Meaning, everything in Joe, will be placed in there
        await kyleUser.populate("bestFriend")

        console.log('---POPULATE---', kyleUser, '---POPULATE---') // it's like a Sequelize join, but way easier
    } catch (error) {
        console.log(error.message)
    }
}

kyleBestFriendPopulate()

