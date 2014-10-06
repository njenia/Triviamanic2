triviamanicApp.service('quizzesService', function (Restangular) {
    var quizzes = Restangular.all('api/quizzes');
    return {
        all: function () {
            return quizzes.getList();
        },
        one: function(id) {
            return quizzes.one(id).get();
        },
        create: function (quizText) {
            return quizzes.post({text: quizText});
        },
        addCategory: function (id) {
            return Restangular.one('api/quizzes', id).all('categories').post({});
        }
    };
});