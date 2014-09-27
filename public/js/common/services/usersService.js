triviamanicApp.service('usersService', function (Restangular, authService) {
    return {
        getUser: function (id) {
            return Restangular.one('users', authService.getCurrentUser())
        }
    };
});