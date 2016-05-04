'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'myApp.services', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl as dashboard'
        }).when('/potager', {
            templateUrl: 'dashboard/potager/potager.html',
            controller: 'PotagerCtrl as potager'
        });
    }])

    .controller('DashboardCtrl', function($location, PotagerService, $q) {

        var vm = this;
<<<<<<< HEAD
        vm.title = "Mes potagers";
=======
        vm.title = "MES POTAGERS";
>>>>>>> origin/Dev
        vm.dash = undefined;
        
        vm.getDatas = function(){
            return PotagerService.resource.query(function (datas) {
                vm.listePotagers = datas;
<<<<<<< HEAD
=======
                console.log(vm.listePotagers);
>>>>>>> origin/Dev
            });  
        };

        /*
        vm.getDatasPromise = vm.getDatas();
        $q.all([vm.getDatasPromise.$promise]).then(function() {
           console.log(vm.listePotagers);
        });*/


        /**
         * Redirige l'utilisateur sur le potager sélectionné
         * @param p
         */
        vm.selectedPotager = function(p){
            vm.dash = "animated bounceOut";
            $location.path('/potager/').search({param: p});
        };
    });
