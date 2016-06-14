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
                "id": 0,
                "name": "configTest1",
                "description": "Une description de test bien longue qui devrait faire péter l'ihm si c'est mal codé ce qui est surement le cas",
                "slug": "configTest1",
                "lightTreshold": 3,
                "lightingStart": {
                    "hour": 15, 
                    "minute": 37
                },
                "lightingEnd": {
                    "hour": 4, 
                    "minute": 15
                },
                "isWategringActive": 1,
                "wateringStart": 4,
                "wateringEnd": 3
            };
            /*ConfigurationService.resource.get(function (datas) {
                console.log("retour get",datas);

            });*/
            ConfigurationService.resource2.post(config, function (datas) {
                    console.log("retour post",datas);
            });

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
