'use strict';

controllers.controller('DashboardCtrl', function ($location, PotagerService, $q) {
    var vm = this;
    vm.title = "MES POTAGERS";
    vm.dash = undefined;

    /**
     * Appel service pour récupérer les données
     * @returns {*|{method, isArray, transformResponse}}
     */
    vm.getDatas = function () {
        return PotagerService.resource.get(function (datas) {
            vm.listePotagers = datas;
            console.log('test récup service', vm.listePotagers);
        });
    };

    /**
     * Redirige l'utilisateur sur le potager sélectionné
     * @param p
     */
    vm.selectedPotager = function (p) {
        $location.path('/potager/').search({param: p});
    };
});
