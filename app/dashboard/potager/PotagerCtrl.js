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

        console.log('current potager: ', vm.potager);

        //Téléchargement de la structure du labyrinthe
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logDatas));

        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = 'data.json';
        a.innerHTML = 'Télécharger historique';

        var container = document.getElementById('container');
        container.appendChild(a);

    }

    controllers.controller('PotagerCtrl', PotagerCtrl);
}());