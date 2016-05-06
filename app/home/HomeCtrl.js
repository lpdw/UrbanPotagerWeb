'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl as home'
        });
    }])

    .controller('HomeCtrl', [function() {

        var vm = this;

        vm.title = "Bienvenue sur UrbanPotager";
        vm.imageUrl = "./assets/images/home-feature.png";
        vm.description = "Liquorice biscuit dragée. Ice cream ice cream brownie. Tart jelly beans bonbon cotton candy pastry tiramisu. Brownie chocolate bar chocolate cake.";
        vm.imageUrl1 = "./assets/images/home-feature1.png";
        vm.description1 = "Tiramisu cookie oat cake muffin. Pudding marshmallow chupa chups liquorice marzipan chocolate cake soufflé. Sesame snaps soufflé liquorice ice cream croissant sweet fruitcake.";
    }]);
