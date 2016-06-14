(function() {
    'use strict';

    function PotagerCtrl($location, ConfigurationService, toaster, $timeout) {

        var vm = this;
        var logDatas;

        //Récupération des paramètres de l'url
        vm.potager = $location.search().param;
        vm.title = "Potager:" + vm.potager.name;

        vm.onEditClick = function () {
            $location.path('/gestion/').search({potager: vm.potager});
        };

        vm.getConfig = function () {
            var potagerSlug = vm.potager.slug;
            ConfigurationService.resource.get({ slugGarden: potagerSlug}, function (datas) {
                vm.configCurrentPotager = datas;
            }, function (response) {
                //Si aucune configuration liée au potager
                if(response.status === 404){
                    toaster.pop({
                        type: 'info',
                        title: '',
                        body: "Aucune configuration pour ce potager, vous allez être redirigé vers votre dashboard",
                        showCloseButton: true,
                        timeout: 4000
                    });
                    $timeout(function waitForRedirection() {
                        $location.path('/dashboard');
                    }, 4000);
                }
            });
        };

        /**
         * Téléchargement historique
         */
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logDatas));

        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = 'data.json';
        a.innerHTML = 'Télécharger historique';

        var container = document.getElementById('container');
        container.appendChild(a);

        /**
         * Point d'entrée du controller
         */
        (function () {

            //Redirige vers le dashboard si aucun potager n'a été sélectionné
            if(typeof (vm.potager) === 'string'){
                $location.path('/dashboard')
            }
        })();

    }

    controllers.controller('PotagerCtrl', PotagerCtrl);
}());