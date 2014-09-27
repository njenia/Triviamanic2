triviamanicApp.controller('mainCtrl', function ($scope, quizzesService, $state) {
    $scope.create = function () {
        quizzesService.create()
            .then(function (data) {
                $state.go('editQuiz', data._id);
            }, function () {
                console.log('Error with creating a quiz');
            });
    };

    quizzesService.all().then(function (data) {
        $scope.quizzes = data;
    });
});