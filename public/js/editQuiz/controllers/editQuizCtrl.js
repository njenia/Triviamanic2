triviamanicApp.controller('editQuizCtrl', function ($scope, $stateParams, quizzesService, $timeout, $state) {
    $scope.chunkedQuizCategories = [];

    quizzesService.oneWithQuestions($stateParams.id).then(function (data) {
        $scope.quiz = data;
        $scope.chunkedQuizCategories = _.groupBy(data.categories, function(element, index){
            return Math.floor(index / 5);
        });
        $scope.chunkedQuizCategories = _.toArray($scope.chunkedQuizCategories);
    });

    $scope.addCategory = function () {
        quizzesService.addCategory($stateParams.id)
            .then(function (newCategory) {
                if (_.last($scope.chunkedQuizCategories).length === 5) {
                    $scope.chunkedQuizCategories.push([newCategory]);
                } else {
                    _.last($scope.chunkedQuizCategories).push(newCategory);
                }
                $scope.quiz.categories.push(newCategory);
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
                category.questions.push(question);
                $state.go('editQuestion', {id: question._id});
            });
    };

    $scope.shouldExtraAddCategoryButtonBeShown = function () {
        return $scope.chunkedQuizCategories.length !== 0
            && _.last($scope.chunkedQuizCategories).length === 5;
    }
});