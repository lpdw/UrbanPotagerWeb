'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'leaflet-directive',
  'ngResource',
  'ngAnimate',
  'ui.bootstrap',
  'chart.js',
  'myApp.services',
  'myApp.home',
  'myApp.inscription',
  'myApp.gestion',
  'myApp.dashboard',
  'myApp.version'
]).
config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
  $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);
