(function () {
    'use strict';

    function EditGardenCtrl($location) {

        var vm = this;

        //Récupération des paramètres de l'url
        vm.gardenToEdit = $location.search().param;
        console.log('test undefined', vm.gardenToEdit);
        vm.title = "Modifier le potager:" + vm.gardenToEdit;


    }

    controllers.controller('EditGardenCtrl', EditGardenCtrl);

}());