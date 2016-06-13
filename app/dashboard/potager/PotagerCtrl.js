(function() {
    'use strict';

    function PotagerCtrl($location, ConfigurationService) {

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
                console.log('test récup config potager: ', vm.configCurrentPotager);
            });
        };

        //Téléchargement d'un json
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
            //Récupération des mesures
            vm.getConfig();

            //Redirige vers le dashboard si aucun potager n'a été sélectionné
            if(typeof (vm.potager) === 'string'){
                $location.path('/dashboard')
            }
        })();

    }

    controllers.controller('PotagerCtrl', PotagerCtrl);
}());