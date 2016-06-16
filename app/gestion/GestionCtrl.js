'use strict';

controllers.controller('GestionCtrl', function ($location, PotagerService, $q, ConfigurationService, AlertService, localStorageService) {

        var vm = this;
        var path = $location.path();
        vm.title = "Page gestion";
        vm.editionConfiguration = false;
        vm.editionAlerts = [];
        vm.comparisonTable = [
            "==",
            "!=",
            "<",
            ">",
            "<=",
            ">="
        ];
        vm.typesTable = [
            {
                "name": "Niveau eau",
                "description": "je suis description niveau eau",
                "min": 0,
                "max": 20,
                "type": 1
            },
            {
                "name": "Acidité",
                "description": "acidité du sol",
                "min": 0,
                "max": 14,
                "type": 1
            }
        ];


        //Récupération des paramètres de l'url
        var params = $location.search();

        if(params.configuration)
        {
            ConfigurationService.resourceConfig.get({slug: params.configuration}, function (datas) {
                console.log(datas);

                vm.configuration = datas.configuration;
            });


            vm.configurationCopy = angular.copy(vm.configuration);




        }else if (params.potager)
        {

            ConfigurationService.resourceConfiguredGardens.get({slugGarden: params.potager}, function (datas) {
                console.log(datas);

                vm.potagerConfigurationForm = datas;
            });

            //vm.potager = params.potager;
            //vm.potagerConfigurationForm = {
            //    "wateringStart": {"hour": 15, "minute": 37},
            //    "wateringEnd": {"hour": 16, "minute": 30},
            //    "lightingStart": {"hour": 15, "minute": 37},
            //    "lightingEnd": {"hour": 15, "minute": 37},
            //    "description": "je suis description",
            //    "name": "je suis name",
            //    "lightTreshold": 50.01
            //};


            //vm.alerts = [
            //    {
            //        "treshold": 50,
            //        "comparison": 1,
            //        "type": "water",
            //        "name": "Niveau eau bas",
            //        "description": "je suis description niveau eau bas",
            //        "message": "Grouille toi de remettre de l'eau"
            //    },
            //    {
            //        "treshold": 7,
            //        "comparison": 4,
            //        "type": "Acidité",
            //        "name": "Acidité du sol",
            //        "description": "je suis description acidité",
            //        "message": "Grouille toi de remettre de l'eau"
            //    }
            //];



        } else
        {

            ConfigurationService.resourceConfig.get({}, function (datas) {
                vm.configurations = datas.configurations;
            });

            AlertService.resourceAlert.get({}, function (datas) {
                //console.log(datas);

                vm.alerts = datas.alerts;
            });

        }

        vm.edit = function(type , index)
        {

            if(type === "configuration")
            {
                vm.editionConfiguration = true;
            } else if(type === "alerts"){
                vm.editionAlerts[index] = true;

            }

        };

        vm.reset = function(type, index)
        {
            if(type === "alerts")
            {
                vm.editionAlerts[index] = false;
            } else if(type === "configuration")
            {
                vm.editionConfiguration = false;
            }
        };

        vm.submitConfiguration = function() {
            console.log('here');
        };

        ///**
        // * Redirige l'utilisateur sur le potager sélectionné
        // * @param id
        // */
        //vm.selectedPotager = function(id){
        //    $location.path('/gestion/').search({"potager_id":id});
        //};


        /**
         * Redirige l'utilisateur sur le potager sélectionné
         * @param slug
         */
        vm.selectedConfiguration = function (slug) {
            $location.path(path).search({"configuration": slug});
        };

        /**
         * Redirige l'utilisateur sur le potager sélectionné
         * @param slug
         */
        vm.selectedAlert = function (slug) {
            $location.path(path).search({"alert": slug});
        };

        /**
         * Redirige l'utilisateur vers tous ses potagers
         */
        vm.allPotagers = function () {
            $location.path(path).search({});
        };

        /**
         * Supprime le potager sélectionné
         */
        vm.deletePotager = function (potager) {
            $location.path(path).search({"delete": "success"});
        };

        /**
         * Supprime le potager sélectionné
         */
        vm.newPotager = function (potager) {
            var newPotagerForm = [];
            $location.path(path).search({"delete":"success"});
        };


    })
    .directive('potagers', function () {
        return {
            templateUrl: 'gestion/directives/potagers.html'
        };
    })
    .directive('potager', function () {
        return {
            templateUrl: 'gestion/directives/potager.html'
        };
    })
    .directive('newPotager', function () {
        return {
            templateUrl: 'gestion/directives/new-potager.html'
        };
    });