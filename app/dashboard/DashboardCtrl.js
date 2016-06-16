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
                "name": "configTestAssociation",
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

            var garden = {
                "name": "gardenTestAssoci",
                "description": "gardenTestAssocigardenTestAssocigardenTestAssoci",
                "isPublic": "oui",
                "latitude": 0,
                "longitude": 0,
                "showLocation": 1,
                "country": "france",
                "city": "paris",
                "address1": "addressTest1",
                "address2": "addressTest2"
            };

            /*ConfigurationService.resourceConfiguredGardens.post({slugGarden: "gardentestassoci" ,slugConfiguration: "configtestassociation"}, function (datas) {
                vm.retourPost = datas;
                console.log("retour association",datas);
            });*/
            
            /*ConfigurationService.resourceConfig.post(config, function (datas) {
                console.log('retour post config', datas);
            });*/

            /*PotagerService.resource.post(garden, function (d) {
                console.log('retour post garden', d);
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
