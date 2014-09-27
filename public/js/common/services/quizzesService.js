triviamanicApp.service('quizzesService', function (Restangular) {
    var quizzes = Restangular.all('api/quizzes');
    return {
        all: function () {
            return quizzes.getList();
        },
        create: function (quizText) {
            return quizzes.post({text: quizText});
        }
    };
});