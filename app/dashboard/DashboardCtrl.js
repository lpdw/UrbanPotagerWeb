(function() {
    'use strict';

    function DashboardCtrl($location, PotagerService, ConfigurationService) {

        var vm = this;
        vm.title = "MES POTAGERS";
        vm.dash = undefined;

        /**
         * Appel service pour récupérer les potagers
         * @returns {*|{method, isArray, transformResponse}}
         */
        vm.getDatas = function(){
            return PotagerService.resource.get(function (datas) {
                vm.listePotagers = datas;
                console.log('test récup gardens', vm.listePotagers);
            });
        };

        /**
         * Gestion des images aléatoires des dash
         */
        vm.addRandImages = function () {
            for(var i = 0; i < vm.listePotagers.gardens.length; i++){
                var imagRandom = vm.getImageRandom();
                vm.listePotagers.gardens[i].imgRand = imagRandom;
            }
        };

        vm.addConfigTest = function () {
            var config = {
                "name": "configTest2",
                "description": "Une autre description de test bien longue qui devrait faire péter l'ihm si c'est mal codé ce qui est surement le cas",
                "lightTreshold": 3,
                "lightingStart": {
                    "hour": 15,
                    "minute": 37
                },
                "lightingEnd": {
                    "hour": 4, 
                    "minute": 15
                },
                "isWateringActive": 1,
                "wateringStart": {
                    "hour": 3,
                    "minute": 15},
                "wateringEnd": {
                    "hour": 6,
                    "minute": 20}
            };

            ConfigurationService.resource2.post({slugGarden: "potagerTest2", slugConfiguration: "configTest1"}, function (datas) {
                vm.retourPost = datas;
                    console.log("retour post",datas);
                    console.log("test", typeof (datas.configuration.lighting_end));
            });

            /*ConfigurationService.resource.get({ slugGarden: "potagerTest1"}, function (datas) {
                console.log('test get', datas);

            });*/

        };

        vm.getImageRandom = function () {
            var temp = Math.floor((Math.random() * 18) + 1);
            return "assets/images/dashboards/"+ temp +".png";
        };

        /**
         * Redirige l'utilisateur sur le potager sélectionné
         * @param p
         */
        vm.selectedPotager = function(p){
            $location.path('/potager/').search({param: p});
        };
    }
    controllers.controller('DashboardCtrl', DashboardCtrl);
}());
