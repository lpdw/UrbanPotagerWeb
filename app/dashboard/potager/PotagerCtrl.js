(function() {
    'use strict';

    function PotagerCtrl($location) {

        var vm = this;

        //Récupération des paramètres de l'url
        vm.potager = $location.search().param;
        vm.title = "Potager:" + vm.potager.id;

        vm.onEditClick = function () {
            $location.path('/gestion').search({param: vm.potager});
        };

        vm.labels = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Novembre", "Décembre"];
        vm.series = ['Hydratation', 'Ensoleillement'];

        vm.data = [
            [12, 59, 80, 81, 56, 55, 40, 12, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90]
        ];
        vm.onClick = function (points, evt) {
            console.log(points, evt);
        };

    }

    angular.module('myApp.dashboard').controller('PotagerCtrl', PotagerCtrl);

}());