'use strict';

angular.module('myApp.gestion', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/gestion', {
            templateUrl: 'gestion/gestion.html',
            controller: 'GestionCtrl as gestion'
        });
    }])

    .controller('GestionCtrl', [function() {

        var vm = this;
        vm.title = "Page gestion";
        
    }]);