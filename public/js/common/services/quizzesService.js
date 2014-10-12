triviamanicApp.service('quizzesService', function (Restangular) {
    var quizzes = Restangular.all('api/quizzes');
    return {
        all: function () {
            return quizzes.getList();
        },
        one: function(id) {
            return quizzes.one(id).get();
        },
        oneWithQuestions: function(id) {
            return quizzes.one(id).get({withQuestions: true});
        },
        create: function (quizText) {
            return quizzes.post({text: quizText});
        },
        addCategory: function (id) {
            return Restangular.one('api/quizzes', id).all('categories').post({
                name: ''
            });
        },
        updateCategory: function (quiz, category) {
            return Restangular
                .one('api/quizzes', quiz._id)
                .one('categories', category._id)
                .customPUT(category);
        },
        addQuestionTo: function (quiz, category) {
            return Restangular
                .one('api/quizzes', quiz._id)
                .one('categories', category._id)
                .all('questions')
                .post({
                    points: category.questions.length * 100 + 100
                });
        }
    };
});