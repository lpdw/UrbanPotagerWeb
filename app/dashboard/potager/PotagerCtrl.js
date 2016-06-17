(function() {
    'use strict';

    function PotagerCtrl($location, ConfigurationService, toaster, $scope, MeasuresService) {

        var vm = this;
        var logDatas;
        var currentHour = new Date().getHours();

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
        vm.getMeasures = function () {
           MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "water-level"}, function (datasWater) {
               if(datasWater.measures[0] != undefined){
                   vm.currentWaterLevel = datasWater.measures[0].value;
               }else {
                   vm.hasWaterLevel = false;
               }
           });
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "daylight-level"}, function (datasDaylight) {
                if(datasDaylight.measures[0] != undefined){
                    vm.currentDayLight = datasDaylight.measures[0].value;
                }else {
                    vm.hasDaylight = false;
                }
            });
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "humidity-air"}, function (datasHumidity) {
                if(datasHumidity.measures[0] != undefined){
                    vm.currentAirHumidity = datasHumidity.measures[0].value;
                }else {
                    vm.hasHumidity = false;
                }
            });
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "water-temperature"}, function (datasWaterTemp) {
                if(datasWaterTemp.measures[0] != undefined){
                    vm.currentWaterTemp = datasWaterTemp.measures[0].value;
                }else {
                    vm.hasWaterTemp = false;
                }

            });
            MeasuresService.resource.get({slugGarden: vm.potager.slug, slugType: "air-temperature"}, function (datasAirTemp) {
                if(datasAirTemp.measures[0] != undefined){
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
                    vm.hasConfiguration = false;
                }
            });
        };


        /**
         * Gestion du graph
         * @type {string[]}
         */
        //12 dernières heures
        $scope.labels = [currentHour-12 +"h", currentHour-11 +"h", currentHour-10 +"h", currentHour-9 +"h",
            currentHour-8 +"h", currentHour-7 +"h", currentHour-6 +"h", currentHour-5 +"h", currentHour-4 +"h",
            currentHour-3 +"h", currentHour-2 +"h", currentHour-1 +"h", currentHour +"h"
            ];
        $scope.series = ['Niveau Eau', 'Ensoleillement', 'Humidité air', 'Température eau', 'Température air'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
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
            console.log('vm.potager', vm.potager);
            console.log('type of vm.potager', typeof (vm.potager));
            vm.getConfig();
            vm.getMeasures();
        })();

    }

    controllers.controller('PotagerCtrl', PotagerCtrl);
}());
