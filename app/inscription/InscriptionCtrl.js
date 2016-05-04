'use strict';

angular.module('myApp.inscription', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/inscription', {
            templateUrl: 'inscription/inscription.html',
            controller: 'InscriptionCtrl as inscription'
        });
    }])

    .controller('InscriptionCtrl', [function() {
        this.title = "Page d'inscription";

        this.inscription = function(data){

            console.log(data);

        };

        this.connexion = function(data){

            console.log(data);

        };

    }]);