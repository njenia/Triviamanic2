triviamanicApp.controller('headerCtrl', function ($scope, authService) {
    $scope.$on('currentUserRecieved', function () {
        $scope.currentUser = authService.getCurrentUser();
    });
});