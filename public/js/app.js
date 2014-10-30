var triviamanicApp = angular.module('triviamanic', ['ui.router', 'ui.bootstrap', 'gridster',
    'restangular', 'xeditable', 'ui.sortable', 'bootstrap-auto-grid']);

triviamanicApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    var loggedInUserResolver = function (authService, $q) {
        var userInfo = authService.getCurrentUser();

        return $q.when(userInfo);
    };

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'mainCtrl',
            resolve: {
                userLoggedIn: loggedInUserResolver
            }
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'
        })
        .state('notLoggedIn', {
            url: '/welcome',
            templateUrl: 'views/welcome.html'
        })
        .state('editQuiz', {
            url: '/editQuiz/:id',
            templateUrl: '/public/js/editQuiz/views/editQuiz.html',
            controller: 'editQuizCtrl',
            resolve: {
                userLoggedIn: loggedInUserResolver
            }
        })
        .state('editQuestion', {
            url: '/editQuestion',
            templateUrl: '/public/js/editQuestion/views/editQuestion.html',
            controller: 'editQuestionCtrl',
            resolve: {
                userLoggedIn: loggedInUserResolver
            }
        });
});

triviamanicApp.run(function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        if (error.authenticated === false) {
            $state.go('notLoggedIn');
        }
    });
});
triviamanicApp.run(function (editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableOptions.theme = 'bs3';
});