'use strict';

angular.module('myApp.gestion', ['ngRoute', 'myApp.services', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/gestion', {
            templateUrl: 'gestion/gestion.html',
            controller: 'GestionCtrl as gestion'
        });
    }])

    .controller('GestionCtrl', function($location, PotagerService, $q) {

        var vm = this;
        vm.title = "Page gestion";

        PotagerService.resource.query(function (datas) {
            vm.potagers = datas;
        });

        console.log(vm.potagers);
    });