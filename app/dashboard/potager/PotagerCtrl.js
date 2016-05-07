(function() {
    'use strict';

    function PotagerCtrl($location) {

        var vm = this;

        //Récupération des paramètres de l'url
        vm.potager = $location.search().param;
        vm.title = "Potager:" + vm.potager.id;

        vm.onEditClick = function () {
            $location.path('/potager/:id').search({param: vm.potager.id});
        };

    }

    angular.module('myApp.dashboard').controller('PotagerCtrl', PotagerCtrl);

}());