var mongoose = require('mongoose');
var Category = rekuire('Category');

// define the schema for our user model
var quizSchema = mongoose.Schema({
    categories: {type: [ Category.schema ], default: []}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Quiz', quizSchema);
