triviamanicApp.controller('headerCtrl', function ($scope, authService) {
    authService.getCurrentUser().then(function (userInfo) {
        $scope.currentUser = userInfo;
    });

    $scope.logout = function () {
        authService.logout();
    };
});