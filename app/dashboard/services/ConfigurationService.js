(function(){
    'use strict';

    function ConfigurationService($resource){

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  '';

        var resource = $resource(apiPath+'/garden/:slugGarden/configuration', {slugGarden: '@slugGarden'}, {
            post:{
                method:"POST",
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
            }
        });
        return {
            resource: resource,
            resource2: resource2
        };
    }
    controllers.factory('ConfigurationService', ConfigurationService);
})();


