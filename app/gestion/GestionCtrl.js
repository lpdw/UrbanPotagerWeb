
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
        var path = $location.path();
        vm.title = "Page gestion";

        console.log('test récupération du potager', $location.search());


        //Récupération des paramètres de l'url
        var params = $location.search();

        if(params.potager)
        {
            vm.potager = params.potager;
        } else
        {
            PotagerService.resource.query(function (potagers) {
                vm.potagers = potagers;
            });
        }

        ///**
        // * Redirige l'utilisateur sur le potager sélectionné
        // * @param id
        // */
        //vm.selectedPotager = function(id){
        //    $location.path('/gestion/').search({"potager_id":id});
        //};


        /**
         * Redirige l'utilisateur sur le potager sélectionné
         * @param potager
         */
        vm.selectedPotager = function(potager){
            $location.path(path).search({"potager":potager});
        };

        /**
         * Redirige l'utilisateur vers tous ses potagers
         */
        vm.allPotagers = function(){
            $location.path(path).search({});
        };

        /**
         * Supprime le potager sélectionné
         */
        vm.deletePotager = function(potager){
            $location.path(path).search({"delete":"success"});
        };

        /**
         * Supprime le potager sélectionné
         */
        vm.newPotager = function(potager){
            var newPotagerForm = [];
            //$location.path(path).search({"delete":"success"});
        };



    })
    .directive('potagers', function() {
        return {
            templateUrl: 'gestion/directives/potagers.html'
        };
    })
    .directive('potager', function() {
        return {
            templateUrl: 'gestion/directives/potager.html'
        };
    })
    .directive('newPotager', function() {
        return {
            templateUrl: 'gestion/directives/new-potager.html'
        };
    });