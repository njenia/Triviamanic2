triviamanicApp.service('authService', function ($http, $q) {
    var userInfo;

    function currentUser() {
        var deferred = $q.defer();
        if (userInfo) {
            deferred.resolve(userInfo);
        } else {
            $http.get('/currentUser').then(function(result) {
                if (result.data) {
                    userInfo = result.data.google;
                    deferred.resolve(userInfo);
                } else {
                    deferred.reject({authenticated: false});
                }
            }, function(error) {
                deferred.reject(error);
            });
        }

        return deferred.promise;
    }

    return {
        getCurrentUser: currentUser
    };
});