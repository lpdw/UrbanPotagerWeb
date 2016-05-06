'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'leaflet-directive',
  'ngResource',
  'ngAnimate',
  'ui.bootstrap',
  'myApp.services',
  'myApp.home',
  'myApp.inscription',
  'myApp.gestion',
  'myApp.dashboard',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
