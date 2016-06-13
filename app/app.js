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
                .otherwise({
                    redirectTo: '/home'
                });
        }
    );

var controllers = angular.module('controllers', [
    'leaflet-directive',
    'myApp.services',
    'ngResource',
    'ui.bootstrap',
    'ngAnimate',
    'chart.js'
]);
