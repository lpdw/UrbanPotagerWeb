(function () {
    'use strict';

    function PotagerService($resource, localStorageService) {

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  localStorageService.get('token');

        var resource = $resource(apiPath+'/gardens/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            },
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            }
        });
        return {
            resource: resource
        };
    }

    angular.module('myApp.services', []).factory('PotagerService', PotagerService);
})();