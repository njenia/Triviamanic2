var mongoose = require('mongoose');

// define the schema for our user model
var quizSchema = mongoose.Schema({
    text: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Quiz', quizSchema);
