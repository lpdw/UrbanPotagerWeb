'use strict';

angular.module('myApp.inscription', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/inscription', {
            templateUrl: 'inscription/inscription.html',
            controller: 'InscriptionCtrl as inscription'
        });
    }])

    .controller('InscriptionCtrl', [function() {
        var vm = this;

        vm.title = "Page d'inscription";
    }]);