triviamanicApp.controller('editQuizCtrl', function ($scope, $stateParams, quizzesService, $timeout, $state) {
    quizzesService.one($stateParams.id).then(function (data) {
        $scope.quiz = data;
    });

    $scope.addCategory = function () {
        quizzesService.addCategory($stateParams.id)
            .then(function (data) {
                $scope.quiz = data;
                $timeout(function() {
                    $('.category-col-header>h3').last().click();
                }, 0.5);
            });
    };

    $scope.updateCategoryTitle = function (category, name) {
        category.name = name;
        return quizzesService.updateCategory($scope.quiz, category)
            .then(function (newCategory) {
                var indexOfCategory = $scope.quiz.categories.indexOf(category);
                $scope.quiz.categories[indexOfCategory] = newCategory;
            });
    };

    $scope.addQuestionTo = function (category) {
        quizzesService.addQuestionTo($scope.quiz, category)
            .then(function (question) {
                $state.go('editQuestion', {id: question._id});
            });
    };
});