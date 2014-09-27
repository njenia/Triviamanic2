triviamanicApp.service('authService', function ($http, $rootScope) {
    var currentUser;
    $http.get('/currentUser').success(function (user) {
        currentUser = user.google;
        if (user) {
            $rootScope.$broadcast('currentUserRecieved');
        }
    });
    return {
        getCurrentUser: function () {
            return currentUser;
        },
        logout: function () {
            $http.get('/logout');
            currentUser = undefined;
        },
        isLoggedIn: function () {
            this.getCurrentUser();
            return angular.isDefined(currentUser);
        }
    };
});