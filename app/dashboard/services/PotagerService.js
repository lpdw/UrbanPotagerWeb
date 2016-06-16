(function () {
    'use strict';

    function PotagerService($resource, localStorageService) {

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  localStorageService.get('token');

        /**
         * All public gardens
         **/
        var resource = $resource(apiPath+'/gardens/:id', {id: '@id'}, {
            update: {
                method: 'PUT',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            },
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            },
            delete: {
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            }
        });

        var resourcePersonalGardens = $resource(apiPath+'/me/gardens', {}, {
            query: {
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            }
        });
        return {
            resource: resource,
            resourcePersonalGardens: resourcePersonalGardens
        };
    }

    angular.module('myApp.services', []).factory('PotagerService', PotagerService);
})();