'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'myApp.services', 'ngResource','ui.bootstrap', 'ngAnimate', 'chart.js'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl as dashboard'
        }).when('/potager', {
            templateUrl: 'dashboard/potager/potager.html',
            controller: 'PotagerCtrl as potager'
        }).when('/potager/:id', {
            templateUrl: 'dashboard/potager/editGarden.html',
            controller: 'EditGardenCtrl as editGarden'
        });
    }])

    .controller('DashboardCtrl', function($location, PotagerService, $q) {

        var vm = this;
        vm.title = "MES POTAGERS";
        vm.dash = undefined;

        /**
         * Appel service pour récupérer les données
         * @returns {*|{method, isArray, transformResponse}}
         */
        vm.getDatas = function(){
            return PotagerService.resource.query(function (datas) {
                vm.listePotagers = datas;
            });
        };

        /**
         * Redirige l'utilisateur sur le potager sélectionné
         * @param p
         */
        vm.selectedPotager = function(p){
            $location.path('/potager/').search({param: p});
        };
    });
