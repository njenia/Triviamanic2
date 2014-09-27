var triviamanicApp = angular.module('triviamanic', ['ui.router', 'ui.bootstrap', 'gridster', 'restangular']);

triviamanicApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'mainCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'
        })
        .state('editQuiz', {
            url: '/editQuiz/:id',
            templateUrl: 'js/editQuiz/views/editQuiz.html',
            controller: 'editQuizCtrl'
        })
        .state('editQuestion', {
            url: '/editQuestion',
            templateUrl: 'js/editQuestion/views/editQuestion.html',
            controller: 'editQuestionCtrl'
        });
});