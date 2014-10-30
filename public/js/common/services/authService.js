triviamanicApp.service('authService', function ($http, $q, $window) {
    function currentUser() {
        var deferred = $q.defer();
        if ($window.sessionStorage['loggedInUser']) {
            deferred.resolve(JSON.parse($window.sessionStorage['loggedInUser']));
        } else {
            $http.get('/currentUser').then(function(result) {
                if (result.data) {
                    $window.sessionStorage['loggedInUser'] = JSON.stringify(result.data.google);
                    deferred.resolve(JSON.parse($window.sessionStorage['loggedInUser']));
                } else {
                    deferred.reject({authenticated: false});
                }
            }, function(error) {
                deferred.reject(error);
            });
        }

        return deferred.promise;
    }

    function logout() {
        $window.sessionStorage.removeItem('loggedInUser');
        $window.location.href = '/logout';
    }

    return {
        getCurrentUser: currentUser,
        logout: logout
    };
});