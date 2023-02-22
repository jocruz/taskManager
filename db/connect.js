const mongoose = require('mongoose')

/**
 * 
 * This was done to utilize the .env file. We are creating a function here
 * to be able to only invoke it if the connection of the db is successful
 * and only then we will spin up the server.
 * 
 * mongoose.connect() method returns a Promise because it performs an asynchronous operation, which is establishing a connection to a MongoDB database.
 * Connecting to a database involves network communication and can take some time,
 * so it is not an instantaneous operation.
 * To avoid blocking the event loop and to make the connection process more efficient,
 * the mongoose.connect() method uses asynchronous I/O operations and returns a Promise that represents the outcome of the connection process.


 */
const connectDB = (url) => {
    mongoose
    .connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true ,})
}

module.exports = connectDB