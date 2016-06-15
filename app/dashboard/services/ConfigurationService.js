(function(){
    'use strict';

    function ConfigurationService($resource, localStorageService){

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  localStorageService.get('token');

        var resource = $resource(apiPath+'/garden/:slugGarden/configuration/:slugConfiguration', {
                            slugGarden: '@slugGarden',
                            slugConfiguration: '@slugConfiguration'
            }, {
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            },
            get: {
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            },
            update: {
                method: 'PUT'
            }
        });

        var resource2 = $resource(apiPath+'/configurations', {}, {
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }, get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });
        return {
            resource: resource,
            resource2: resource2
        };
    }
    controllers.factory('ConfigurationService', ConfigurationService);
})();


