function defineQuiz(mongoose) {
    module.exports.Quiz = mongoose.model('Quiz', {
        text: String
    });
}

module.exports.defineQuiz = defineQuiz;