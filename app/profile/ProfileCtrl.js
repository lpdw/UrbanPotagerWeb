'use strict';

controllers.controller('ProfileCtrl', function ($scope, $rootScope, $location, localStorageService, UserService) {

    if (localStorageService.get("token") == null) {
        $location.path("/inscription");
    }
    else {

        var vm = this;

        UserService.user.get(function(data){
            vm.user = data.user;
        });

    }

});