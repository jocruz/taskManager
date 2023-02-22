const mongoose = require('mongoose');

/**
 * This defines the schema for the "Task" model.
 * The schema specifies that each "Task" document will have a "name" property of type "String" and a "completed" property of type "Boolean".
 * The schema is defined using the mongoose.Schema() function, which takes an object containing the schema definition as an argument.
 */
const TaskSchema = new mongoose.Schema({
    name: String,completed:Boolean
});

/**
 * Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
 * 
 * Here, we are creating a new model called "Task" that maps to a MongoDB collection called "tasks". The mongoose.model() method is used to create the model,
 * with the first argument specifying the name of the collection ('Task') -but remember it will be lower case and be plural on the db itself
 *  and the second argument providing the schema definition for the documents in the collection (TaskSchema).
 */
module.exports = mongoose.model('Task',TaskSchema)