'use strict';

controllers.controller('GestionCtrl', function ($location, $route, PotagerService, $q, ConfigurationService, AlertService, localStorageService) {

        var vm = this;
        var path = $location.path();
        vm.title = "Page gestion";
        vm.editConfiguration = false;
        vm.changeConfiguration = false;
        vm.newConfiguration = false;
        vm.newAlert = false;
        vm.editAlerts = [];
        vm.comparisonTable = [
            "==",
            "!=",
            "<",
            ">",
            "<=",
            ">="
        ];
        vm.configurationModel = {
            "name": null,
            "description": null,
            "lightTreshold": null,
            "lightingStart": {
                "hour": null,
                "minute": null
            },
            "lightingEnd": {
                "hour": null,
                "minute": null
            },
            "isWateringActive": null,
            "wateringStart": {
                "hour": null,
                "minute": null
            },
            "wateringEnd": {
                "hour": null,
                "minute": null
            }
        };


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

                vm.configuration = datas.configuration;

                //vm.configurationCopy = angular.copy(vm.configuration);

                vm.configurationCopy = {
                    "name": vm.configuration.name,
                    "description": vm.configuration.description,
                    "lightTreshold": vm.configuration.light_treshold,
                    "lightingStart": {
                        "hour":vm.getHours(vm.configuration.lighting_start),
                        "minute": vm.getMinutes(vm.configuration.lighting_start)
                    },
                    "lightingEnd": {
                        "hour":vm.getHours(vm.configuration.lighting_end),
                        "minute": vm.getMinutes(vm.configuration.lighting_end)
                    },
                    "isWateringActive": vm.configuration.is_watering_active,
                    "wateringStart": {
                        "hour":vm.getHours(vm.configuration.watering_start),
                        "minute": vm.getMinutes(vm.configuration.watering_start)
                    },
                    "wateringEnd": {
                        "hour":vm.getHours(vm.configuration.watering_end),
                        "minute": vm.getMinutes(vm.configuration.watering_end)
                    }
                };

                console.log(vm.configurationCopy);
            });

            ConfigurationService.resourceConfig.get({}, function (datas) {
                console.log(datas);

                vm.configurations = datas.configurations;
            });

            AlertService.resourceAlert.get({slugGarden: params.potager}, function(datas) {
               console.log(datas);

                vm.alerts = datas.alerts;

                vm.alertsCopy = angular.copy(vm.alerts);
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

        vm.getHours = function (phpDate)
        {
            return new Date(phpDate).getUTCHours();
        };

        vm.getMinutes = function (phpDate)
        {
            return new Date(phpDate).getUTCMinutes();
        };

        vm.reset = function(type, action, index)
        {
            if(type === "alert")
            {
                vm.editAlerts[index] = false;
            } else if(type === "configuration")
            {
                if(action === "edit")
                {
                    vm.editConfiguration = false;
                } else if(action === "change")
                {
                    vm.changeConfiguration = false;
                } else if (action === "new")
                {
                    vm.newConfiguration = false;
                }
            }
        };

        vm.display = function(type, action, index)
        {
            if(type === "alert")
            {
                vm.editAlerts[index] = true;
            } else if(type === "configuration")
            {
                if(action === "edit")
                {
                    vm.editConfiguration = true;
                    vm.changeConfiguration = false;
                    vm.newConfiguration = false;
                } else if(action === "change")
                {
                    vm.editConfiguration = false;
                    vm.changeConfiguration = true;
                    vm.newConfiguration = false;
                } else if (action === "new")
                {
                    vm.editConfiguration = false;
                    vm.changeConfiguration = false;
                    vm.newConfiguration = true;
                }
            } else if (type === "location")
            {
                vm.editLocation = true;
            }
        };

        vm.new = function(type, model, slugGarden)
        {
            if(type==="configuration")
            {
                ConfigurationService.resourceConfig.post({}, model ,function (datas){
                    ConfigurationService.resourceConfiguredGardens.post({slugGarden: slugGarden, slugConfiguration: datas.configuration.slug},function(datas) {
                        $route.reload();
                    });

                });
            }
        };

        vm.edit = function(type, slug, changes)
        {
            if (type === "configuration")
            {
                ConfigurationService.resourceConfig.patch({slug: slug}, changes ,function (datas){
                    $route.reload();
                });
            }
        };

        vm.change = function(type, slugGarden, slugConfiguration)
        {
            if(type === "configuration")
            {
                if(vm.configuration)
                {
                    ConfigurationService.resourceConfiguredGardens.delete({slugGarden: slugGarden}, function (datas){});
                }

                    ConfigurationService.resourceConfiguredGardens.post({slugGarden: slugGarden, slugConfiguration: slugConfiguration}, function (datas){
                        ConfigurationService.resourceConfiguredGardens.get({slugGarden: slugGarden}, function (datas) {
                            vm.configuration = datas.configuration;
                            vm.changeConfiguration = false;
                        });
                    });
            }
        };

        vm.unlink = function(type, slug)
        {
            if(type === "configuration")
            {
                ConfigurationService.resourceConfiguredGardens.delete({slugGarden: slug}, function (datas){
                    delete vm.configuration;
                });
            }
        };

        vm.delete = function(type, slug)
        {
            if(type === "configuration")
            {
                ConfigurationService.resourceConfig.delete({slug: slug}, function(datas){
                    $location.path(path).search({});
                });
            } else if (type === "potager")
            {

            }
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