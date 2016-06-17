(function() {
    'use strict';

    function PotagerCtrl($location, ConfigurationService, toaster, $timeout, $sce, MeasuresService) {

        var vm = this;
        var logDatas;

        //Récupération des paramètres de l'url
        vm.potager = $location.search().param;

        /**
         * Redirection vers la page de gestion du potager
         */
        vm.onEditClick = function () {
            $location.path('/gestion/').search({potager: vm.potager});
        };

        /**
         * Récupération toutes les mesures présentes dans typesMeasures
         */
        vm.getMeasures = function () {
           MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "water-level"}, function (datasWater) {
               vm.currentWaterLevel = datasWater.measures[0].value;
           });
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "daylight-level"}, function (datasDaylight) {
                vm.currentDayLight = datasDaylight.measures[0].value;
            });
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "humidity-air"}, function (datasHumidity) {
                vm.currentAirHumidity = datasHumidity.measures[0].value;
            });
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "water-temperature"}, function (datasWaterTemp) {
                vm.currentWaterTemp = datasWaterTemp.measures[0].value;
            });
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "air-temperature"}, function (datasAirTemp) {
                vm.currentAirTemp = datasAirTemp.measures[0].value;
            });

        };

        /**
         * Récupération configuration
         */
        vm.getConfig = function () {
            var potagerSlug = vm.potager.slug;
            ConfigurationService.resourceConfiguredGardens.get({ slugGarden: potagerSlug}, function (datas) {
                vm.configCurrentPotager = datas;
                if(vm.configCurrentPotager.configuration.is_watering_active){
                    console.log('passe');
                    vm.isIrrigActive = true;
                    vm.irrigation = " active";

                }else {
                    vm.isIrrigActive = false;
                    vm.irrigation = " inactive";

                }
              
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
       /* var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logDatas));

        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = 'data.json';
        a.innerHTML = 'Télécharger historique';

        var container = document.getElementById('container');
        container.appendChild(a);*/

        /**
         * Point d'entrée du controller
         */
        (function () {

            //Redirige vers le dashboard si aucun potager n'a été sélectionné
            if(typeof (vm.potager) === 'string'){
                $location.path('/dashboard')
            }
            vm.getMeasures();
        })();

    }

    controllers.controller('PotagerCtrl', PotagerCtrl);
}());