const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHanlderMiddleware = require('./middleware/error-handler');
const characterLimitMax = require('./middleware/character-limit');
//middleware

/**
 * app.use(express.json()) is a middleware function in Express that parses incoming requests with JSON payloads.
 * After we apply the express.json() middleware with app.use(express.json()), the req.body property will be populated with the parsed JSON object
 */
//middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHanlderMiddleware)
app.use(characterLimitMax)

const port = process.env.PORT || 3000;
/**
 * We use async since we returned a promise on the connect.js file
 * We will try{} and invoke connectDB using the .env file and if so we will listen to the port
 * if there is an error we will console.log the error
 */
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Connection to DB is successful...Listening to port... ${port}`));
    } catch(error){
        console.log(error)
    }
}

start()