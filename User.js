
// usually we create a seperate js file for each schema and we just export it

const mongoose = require('mongoose');
const { stringify } = require('querystring');

// this is how you create a new Schema, you use the Schema constructor function
// it takes an object, this object has key-value pairs for the properties you want each document entree to have
const userSchema = new mongoose.Schema({
    firstName: String,
    // if you want to specify that a certain property MUST be included, or that it can't be null, you can't just write Number, you need to specify an object
    age: {
        type: Number,
        // this makes it so that age MUST be included in all documents
        required: true,
        // we can specify a minimum and maximum number for age
        min: 1,
        max: 129
    },
    email: {
        type: String,
        // this will automatically convert all characters in the string to lowercase
        // can use uppercase: true as well for the opposite effect
        lowercase: true,
        // we can set a min length and max length for a string
        minLength: 5,
        maxLength: 45,
        // we can run our own validation
        validate: {
            // here you write a function that returns true or false, if it returns true then no error will occur, if it returns false an error will occur
            // the placeholder is whatever is written as the value for 'email'
            validator: email => {
              if(email.includes('@')) {
                return true
              } else {
                return false
              }
            }
        }
    },
    // dates can be used in schema
    createdAt: {
        type: Date,
        // if createdAt is not specified, we can set a default value
        default: new Date(),
        // this property makes it so that the createdAt property can never be changed
        immutable: true
    },
    updatedAt: Date,
    // In order to identify who a person's best friend is, we will use that best friend's objectId that is automatically generated by mongoDB
    // this objectId is itself a different data type
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        // this ref property tells mongoose what model are we refering to for the ObjectId above 
        ref: 'User'
    },
    // to define an array, we just use [], if we left it blank, we are specifying that it could be an array of any and all datatypes, because we specified it is a String, the elements can only be strings
    hobbies: [String],
    // we can also nest document properties, so here we have an address object, that has two strings as properties
    address: {
        street: String,
        city: String
    }
})



// remember, there are many ways to create a document in mongoose, and validation will only occur when you create a document through the User() constructor or User.create()



// adding methods to a schema
// what this does is, it adds a method to every instance created from this schema, so every User will have this method
userSchema.methods.sayHi = function() {
    // the 'this' keyword references the User instance, it is just an object after all
    console.log(`Hi my name is ${this.firstName}`)
}



// you can also add your own methods on the model itself, not the instances
// so for instance, User.findOne(), User.insertMany(), User.findById(), these are all methods on the User model
// you can create your OWN!
// let's create a method where we can search for a User by their firstName
userSchema.statics.findByFirstName = function(firstName) {
    // the 'this' keyword refers the model, so in this case User
    return this.findOne({ firstName: new RegExp(firstName, 'i') })
}



// virtuals
// a virtual is just a property that exists on an individual instance
// the first argument is the name of the virtual
// in .get() we pass a callback function that is executed when the property is invoked (can't be an arrow function)
userSchema.virtual('nameAndAge').get(function() {
    // 'this' keyword points to the instance document (which is just an object)
    return `${this.firstName} - ${this.age}`
})



// creating middleware
// if you want to execute some middleware (which are just functions) BEFORE then you use .pre
// if you want to execute some middleware AFTER then you use .post

// so in this case, before you save something to the database, you want to run this middleware
// second argument is the middleware function you want to execute, it can't be an arrow function
userSchema.pre('save', function(next) {

    // the 'this' keyword points to the relevant document
    this.updatedAt = Date.now()

    // just like express middleware, you call the next() function to move on to the next middleware
    next()
})


// now we actually need to create the model FOR THIS schema
// first argument is the name of the model, this is the name that will show up in the actual mongoDB database, and the second argument is the relevant schema
// you have to make sure you write this code last to make sure all the code above is taken into consideration, so that all your custom methods are added
const User = mongoose.model("User", userSchema)



// export it
module.exports = User;