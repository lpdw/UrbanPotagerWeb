'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl as dashboard'
        }).when('/potager', {
            templateUrl: 'dashboard/potager/potager.html',
            controller: 'PotagerCtrl as potager'
        });
    }])

    .controller('DashboardCtrl', ['$location', function($location) {

        var vm = this;
        vm.title = "Mes potagers";
        
        vm.potagers = [{
            name: "Potager 1",
            temperature: "32°",
            humidite: "ok"
        },{
            name: "Potager 2",
            temperature: "30°",
            humidite:"NOK"
        }];

        /**
         * Redirige l'utilisateur sur le potager sélectionné
         * @param p
         */
        vm.selectedPotager = function(p){
            $location.path('/potager/').search({param: p});
        };

        
    }]);