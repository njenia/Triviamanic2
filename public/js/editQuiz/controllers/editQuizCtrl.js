triviamanicApp.controller('editQuizCtrl', function ($scope, $stateParams, quizzesService) {
    quizzesService.one($stateParams.id).then(function (data) {
        $scope.quiz = data;
    });

    $scope.addCategory = function () {
        quizzesService.addCategory($stateParams.id)
            .then(function (data) {
                $scope.quiz = data;
            });
    };
});