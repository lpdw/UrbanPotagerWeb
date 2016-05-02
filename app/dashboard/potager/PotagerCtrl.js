(function() {
    'use strict';

    function PotagerCtrl($location) {

        var vm = this;

        vm.potager = $location.search().param;
        vm.title = "Potager:" + vm.potager.name;


    }

    angular.module('myApp.dashboard').controller('PotagerCtrl', PotagerCtrl);

}());