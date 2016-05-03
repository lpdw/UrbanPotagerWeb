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

        vm.title = "Bienvenue sur UrbanPotager !";
        vm.imageUrl = "images/home-img1.png";
        vm.imageDesc = "Bacon ipsum dolor amet bacon jerky salami spare ribs tail. Boudin pork loin alcatra hamburger picanha porchetta capicola. Bacon ipsum dolor amet bacon jerky salami spare ribs tail."
        vm.imageUrl1 = "images/home-img2.png";
        vm.imageDesc1 = "Corned beef porchetta pork loin alcatra salami kevin pork chop. Chicken shoulder flank pastrami, fatback t-bone ham meatball shank bresaola sirloin ham hock cow."

    }])
