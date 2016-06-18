'use strict';

controllers.controller('GestionCtrl', function ($location, PotagerService, $q, ConfigurationService, AlertService, localStorageService) {

        var vm = this;
        var path = $location.path();
        vm.title = "Page gestion";
        vm.editionConfiguration = false;
        vm.changeConfiguration = false;
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

            vm.page = "configuration";

            ConfigurationService.resourceConfig.get({slug: params.configuration}, function (datas) {
                console.log(datas);

                vm.configuration = datas.configuration;
            });


            vm.configurationCopy = angular.copy(vm.configuration);

            //vm.potager = "bla";



        }else if (params.potager)
        {

            vm.page = "potager";

            PotagerService.resource.get({id: params.potager}, function(datas){
                console.log(datas);

                vm.potager = datas.garden;

                vm.potagerCopy = angular.copy(vm.potager);
            });

            ConfigurationService.resourceConfiguredGardens.get({slugGarden: params.potager}, function (datas) {
                console.log(datas);

                vm.potagerConfiguration = datas.configuration;

                vm.potagerConfigurationCopy = angular.copy(vm.potagerConfiguration);
            });

            ConfigurationService.resourceConfig.get({}, function (datas) {
                console.log(datas);

                vm.configurations = datas.configurations;
            });

            AlertService.resourceAlert.get({slugGarden: params.potager}, function(datas) {
               console.log(datas);

                vm.potagerAlerts = datas.alerts;

                vm.potagerAlertsCopy = angular.copy(vm.potagerAlerts);
            });

        } else if (params.alerts)
        {
            vm.page = "alerts";

        } else
        {

            vm.page = "index";

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
            } else if(type === "alerts")
            {
                vm.editionAlerts[index] = true;

            } else if (type === "location")
            {
                vm.editionLocation = true;
            }

        };


        vm.change = function(type , index)
        {

            if(type === "configuration")
            {
                vm.changeConfiguration = true;
            }

        };

        vm.getHours = function (phpDate)
        {
            return new Date(phpDate).getUTCHours();
        };

        vm.getMinutes = function (phpDate)
        {
            return new Date(phpDate).getUTCMinutes();
        };

        vm.setHours = function (phpDate, hours)
        {
            return new Date(new Date(phpDate).setUTCHours(hours)).toISOString();
        };

        vm.setMinutes = function (phpDate, minutes)
        {
            return new Date(new Date(phpDate).setUTCMinutes(minutes)).toISOString();
        };

        vm.reset = function(type, index, action)
        {
            if(type === "alerts")
            {
                vm.editionAlerts[index] = false;
            } else if(type === "configuration")
            {
                if(action === "edition")
                {
                    vm.editionConfiguration = false;
                } else if(action === "change"){
                    vm.changeConfiguration = false;
                }
            }
        };

        vm.submitConfiguration = function()
        {
            console.log(vm.potagerConfiguration);
            console.log(vm.potagerConfigurationCopy);

            ConfigurationService.resourceConfig.patch({slug: vm.potagerConfiguration.slug, data: vm.potagerConfigurationCopy}, function (datas){
                console.log(datas);
            });

        };

        vm.submitChangeConfiguration = function(slug)
        {
            console.log(slug);

            ConfigurationService.resourceConfiguredGardens.delete({slugGarden: vm.potager.slug}, function (datas){
                console.log('here');
                console.log(datas);
            });

            ConfigurationService.resourceConfiguredGardens.post({slugGarden: vm.potager.slug, slugConfiguration: slug}, function (datas){
                console.log('there');
                console.log(datas);
            });

        };

        vm.selectConfiguration = function(slug)
        {
            console.log(slug);

            ConfigurationService.resourceConfiguredGardens.post({slugGarden: vm.potager.slug, slugConfiguration: slug}, function (datas){
                console.log('there');
                console.log(datas);
            });

        };

        /**
         * Redirige l'utilisateur sur la configuration sélectionnée
         * @param slug
         */
        vm.selectedConfiguration = function (slug) {
            $location.path(path).search({"configuration": slug});
        };

        /**
         * Redirige l'utilisateur sur l'alerte
         * @param slug
         */
        vm.selectedAlert = function (slug) {
            $location.path(path).search({"alert": slug});
        };

        /**
         * Redirige l'utilisateur vers la page gestion
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
    .directive('configurationslist', function () {
        return {
            templateUrl: 'gestion/directives/configurations-list.html'
        };
    })
    .directive('alertslist', function () {
        return {
            templateUrl: 'gestion/directives/alerts-list.html'
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