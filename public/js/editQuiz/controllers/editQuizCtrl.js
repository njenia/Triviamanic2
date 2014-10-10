triviamanicApp.controller('editQuizCtrl', function ($scope, $stateParams, quizzesService, $timeout) {
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
        var updateCategoryPromise = quizzesService.updateCategory($scope.quiz, category)
            .then(function (newCategory) {
                var indexOfCategory = $scope.quiz.categories.indexOf(category);
                $scope.quiz.categories[indexOfCategory] = newCategory;
            });
        return updateCategoryPromise;
    };
});