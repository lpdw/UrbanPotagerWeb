(function () {
    'use strict';

    function ConfirmationCtrl ($scope, ConfirmationTypes, confirmOptions) {

        var vm = this;

        /**
         * Templates messages modale de confirmation
         */
        function initMessagesTemplates() {
            //Choix du message à afficher selon le type de confirmation
            switch (confirmOptions.type) {
                case ConfirmationTypes.CONFIRM_DELETE:
                    $scope.confirmationTitre = "Suppression";
                    $scope.confirmationMsg = "Voulez-vous vraiment supprimer ?";
                    break;
                case ConfirmationTypes.CONFIRM_SAVE:
                    $scope.confirmationTitre = "Enregistrement";
                    $scope.confirmationMsg = "Voulez-vous vraiment enregistrer ?";
                    break;
                default:
                    $scope.confirmationMsg = confirmOptions.message;
                    $scope.confirmationTitre = "Confirmez-vous ?";
            }
        }
        /**
         * Fermer la fenetre modale après annulation utilisateur
         */
        vm.fermerSansEnregistrer = function () {
            $scope.$close('fermer');

            if (_.isFunction(confirmOptions.cancelFn)) {
                confirmOptions.cancelFn();
            }
        };

        /**
         * Fermer la fenetre modale après confirmation utilisateur
         */
        vm.fermerEtEnregistrer = function () {
            $scope.$close();

            if (_.isFunction(confirmOptions.confirmFn)) {
                confirmOptions.confirmFn();
            }
        };

        /**
         * Point d'entrée du controleur
         */
        (function() {
            initMessagesTemplates();
        }());
    }
    angular.module('myApp').controller('ConfirmationCtrl', ConfirmationCtrl).constant('ConfirmationTypes', {
        CONFIRM_DELETE: 'CONFIRM_DELETE',
        CONFIRM_SAVE: 'CONFIRM_SAVE',
        CONFIRM_CUSTOM: 'CONFIRM_CUSTOM'
    })
}());/**
 * Created by auroret on 04/05/2016.
 */
