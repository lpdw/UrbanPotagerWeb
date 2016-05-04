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
<<<<<<< HEAD
        vm.title = "UrbanPotager";
        vm.imageUrl = "http://urbanaplant.com/img/cms/cat-smart-garden.png";
        vm.description = "Liquorice biscuit dragée. Ice cream ice cream brownie. Tart jelly beans bonbon cotton candy pastry tiramisu. Brownie chocolate bar chocolate cake. Bear claw carrot cake biscuit cake. Cake macaroon toffee dessert donut.";
        vm.imageUrl1 = "http://urbanaplant.com/img/cms/cat-smart-garden.png";
        vm.description1 = "Tiramisu cookie oat cake muffin. Pudding marshmallow chupa chups liquorice marzipan chocolate cake soufflé. Sesame snaps soufflé liquorice ice cream croissant sweet fruitcake. Biscuit halvah sesame snaps chocolate caramels.";
    }]);
=======

        vm.title = "Bienvenue sur UrbanPotager !";
        vm.imageUrl = "images/home-img1.png";
        vm.imageDesc = "Bacon ipsum dolor amet bacon jerky salami spare ribs tail. Boudin pork loin alcatra hamburger picanha porchetta capicola. Bacon ipsum dolor amet bacon jerky salami spare ribs tail."
        vm.imageUrl1 = "images/home-img2.png";
        vm.imageDesc1 = "Corned beef porchetta pork loin alcatra salami kevin pork chop. Chicken shoulder flank pastrami, fatback t-bone ham meatball shank bresaola sirloin ham hock cow."

    }])
>>>>>>> master
