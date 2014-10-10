var triviamanicApp = angular.module('triviamanic', ['ui.router', 'ui.bootstrap', 'gridster', 'restangular', 'xeditable']);

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
            templateUrl: '/public/js/editQuiz/views/editQuiz.html',
            controller: 'editQuizCtrl'
        })
        .state('editQuestion', {
            url: '/editQuestion',
            templateUrl: '/public/js/editQuestion/views/editQuestion.html',
            controller: 'editQuestionCtrl'
        });
});

triviamanicApp.run(function (editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableOptions.theme = 'bs3';
});