'use strict';

angular.module('myApp', ['ngRoute', 'controllers', 'toaster'])
    .config(
        function ($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'home/home.html',
                    controller: 'HomeCtrl as home'
                })
                .when('/inscription', {
                    templateUrl: 'inscription/inscription.html',
                    controller: 'InscriptionCtrl as inscription'
                })
                .when('/dashboard', {
                    templateUrl: 'dashboard/dashboard.html',
                    controller: 'DashboardCtrl as dashboard'
                })
                .when('/potager', {
                    templateUrl: 'dashboard/potager/potager.html',
                    controller: 'PotagerCtrl as potager'
                })
                .when('/potager/:id', {
                    templateUrl: 'dashboard/potager/editGarden.html',
                    controller: 'EditGardenCtrl as editGarden'
                })
                .when('/gestion', {
                    templateUrl: 'gestion/gestion.html',
                    controller: 'GestionCtrl as gestion'
                })
                .when('/profile', {
                    templateUrl: 'profile/profile.html',
                    controller: 'ProfileCtrl as profile'
                })
                .otherwise({
                    redirectTo: '/home'
                });
        },
        function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('myApp') //Default prefix: ls.<your-key>
                .setStorageType('localStorage') //Default storage: localStorage
                .setStorageCookie(30, '/'); //expiry: default: 30, path: default: '/'
        }
    );

var controllers = angular.module('controllers', [
    'leaflet-directive',
    'myApp.services',
    'ngResource',
    'ui.bootstrap',
    'ngAnimate',
    'chart.js',
    'LocalStorageModule'
]);

controllers.controller('MainCtrl', function ($route, $scope, $location, localStorageService){

    //$scope.log = localStorageService.get("token");

    $scope.logout = function(){
        localStorageService.clearAll();
        $route.reload();
        $location.path("/home");
    }


});
