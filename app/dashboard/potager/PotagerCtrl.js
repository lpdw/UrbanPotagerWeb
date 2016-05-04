(function() {
    'use strict';

    function PotagerCtrl($location, $uibModal, $scope, ConfirmationTypes) {

        var vm = this;

        //Récupération des paramètres de l'url
        vm.potager = $location.search().param;
        vm.title = "Potager:" + vm.potager.id;

        vm.onEditClick = function () {
            console.log('Modif')
        };

    



        /**
         * Demande de confirmation avant suppression du projet
         */
        vm.confirmDelete = function (p, e) {
            var instance = $uibModal.open({
                templateUrl: 'partials/confirm.html',
                controller: 'ConfirmationCtrl as confirm',
                backdrop: 'static',
                windowClass: 'confirm-modal-class',
                resolve: {
                    confirmOptions: function () {
                        return {
                            confirmFn: function () {
                                vm.deleteGarden();
                            },
                            cancelFn: function () {},
                            type: ConfirmationTypes.CONFIRM_DELETE
                        };
                    }
                }
            });
            instance.result.then(function(){
                console.log('retour modal');
            });
        };
        /**
         * Suppression du projet
         */
        vm.deleteGarden = function() {
            console.log('faire méthode delete');
        };
    }

    angular.module('myApp.dashboard').controller('PotagerCtrl', PotagerCtrl);

}());