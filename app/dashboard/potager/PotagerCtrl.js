(function() {
    'use strict';

    function PotagerCtrl($location, ConfigurationService, toaster, $scope, MeasuresService) {

        var vm = this;
        var logDatas;

        //Récupération des paramètres de l'url
        vm.potager = $location.search().param;

        /**
         * Redirection vers la page de gestion du potager
         */
        vm.onEditClick = function () {
            $location.path('/gestion/').search({potager: vm.potager.slug});
        };

        /**
         * Gestion toaster alerting
         */
        vm.alertingUser = function () {
            if(vm.hasAirTemp === false || vm.hasDaylight === false || vm.hasHumidity === false || vm.hasWaterLevel === false || vm.hasWaterTemp === false){
                toaster.pop({
                    type: 'info',
                    title: '',
                    body: "Une ou plusieurs données ne sont pas remontées",
                    showCloseButton: true,
                    timeout: 2000
                });
            }
            if(vm.hasConfiguration === false){
                toaster.pop({
                    type: 'info',
                    title: '',
                    body: "Aucune configuration pour ce potager",
                    showCloseButton: true,
                    timeout: 2000
                });
            }
        };

        /**
         * Récupération toutes les mesures présentes dans typesMeasures
         */
        vm.getDaylightMeasures = function () {
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "daylight-level"}, function (datasDaylight) {
                if(datasDaylight.measures[0] != undefined){
                    vm.completeDaylight = datasDaylight;
                    vm.currentDayLight = datasDaylight.measures[0].value;
                }else {
                    vm.hasDaylight = false;
                }
            });
        };
        vm.getWaterLevelMeasures = function () {
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "water-level"}, function (datasWater) {
                if(datasWater.measures[0] != undefined){
                    vm.completeWaterLevel = datasWater;
                    vm.currentWaterLevel = datasWater.measures[0].value;
                }else {
                    vm.hasWaterLevel = false;
                }
            });
        };
        vm.getHumidityMeasure = function () {
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "humidity-air"}, function (datasHumidity) {
                if(datasHumidity.measures[0] != undefined){
                    vm.completeHumidity = datasHumidity;
                    vm.currentAirHumidity = datasHumidity.measures[0].value;
                }else {
                    vm.hasHumidity = false;
                }
            });
        };
        vm.getWaterTempMeasure = function () {
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "water-temperature"}, function (datasWaterTemp) {
                if(datasWaterTemp.measures[0] != undefined){
                    vm.completeWaterTemp = datasWaterTemp;
                    vm.currentWaterTemp = datasWaterTemp.measures[0].value;
                }else {
                    vm.hasWaterTemp = false;
                }
            });
        };
        vm.getAirTempMeasure = function () {
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "air-temperature"}, function (datasAirTemp) {
                if(datasAirTemp.measures[0] != undefined){
                    vm.completeAirTemp = datasAirTemp;
                    vm.currentAirTemp = datasAirTemp.measures[0].value;
                }else {
                    vm.hasAirTemp = false;
                }
                vm.alertingUser();
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
                    vm.isIrrigActive = true;
                    vm.irrigation = "Irrigation active";

                }else {
                    vm.isIrrigActive = false;
                    vm.irrigation = "Irrigation inactive";

                }

            }, function (response) {
                //Si aucune configuration liée au potager
                if(response.status === 404){
                    vm.hasConfiguration = false;
                }
            });
        };

        /**
         * Gestion du select
         * @type {{availableOptions: *[], selectedOption: {id: string, name: string}}}
         */
        vm.dataType = {
            availableOptions: [
                {id: '1', name: 'Ensoleillement'},
                {id: '2', name: 'Humidité'},
                {id: '3', name: 'Température de l\'eau'},
                {id: '4', name: 'Température de l\'air'},
                {id: '5', name: 'Réserve d\'eau'}
            ],
            selectedOption: {id: '0', name: ''}
        };
        vm.updateSelectedOption = function (selectedOption) {
            vm.freshGraph(selectedOption);
        };

        /**
         * Gestion du graph
         * @type {string[]}
         */

        vm.freshGraph = function (selectedOtion) {
            console.log(selectedOtion);
            var currentHour = new Date().getHours();
            //12 dernières heures
            $scope.labels = [currentHour-12 +"h", currentHour-11 +"h", currentHour-10 +"h", currentHour-9 +"h",
                currentHour-8 +"h", currentHour-7 +"h", currentHour-6 +"h", currentHour-5 +"h", currentHour-4 +"h",
                currentHour-3 +"h", currentHour-2 +"h", currentHour-1 +"h", currentHour +"h"
            ];
            $scope.series = [vm.dataType.selectedOption.name];
            switch (selectedOtion.id) {
                case "1":
                    vm.getDaylightMeasures();
                    console.log('ensoleillement: ', vm.completeDaylight);
                    $scope.data = [
                        [65, 59, 80, 81, 56, 55, 40, 12, 34, 22, 87, 43, 12]
                    ];
                    break;
                case "2":
                    vm.getHumidityMeasure();
                    $scope.data = [
                        [65, 59, 80, 81, 56, 55, 40, 12, 34, 22, 87, 43, 12]
                    ];
                    break;
                case "3":
                    vm.getWaterTempMeasure();
                    $scope.data = [
                        [65, 59, 80, 81, 56, 55, 40, 12, 34, 22, 87, 43, 12]
                    ];
                    break;
                case "4":
                    vm.getAirTempMeasure();
                    $scope.data = [
                        [65, 59, 80, 81, 56, 55, 40, 12, 34, 22, 87, 43, 12]
                    ];
                    break;
                case "5":
                    vm.getWaterLevelMeasures();
                    $scope.data = [
                        [65, 59, 80, 81, 56, 55, 40, 12, 34, 22, 87, 43, 12]
                    ];
                    break;
                default:
                    break;
            }
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
            vm.getConfig();
            vm.getWaterLevelMeasures();
            vm.getAirTempMeasure();
            vm.getDaylightMeasures();
            vm.getWaterTempMeasure();
            vm.getHumidityMeasure();
            vm.freshGraph({id: "0", name: ""}); //option settée par défaut dans le select
        })();

    }

    controllers.controller('PotagerCtrl', PotagerCtrl);
}());
