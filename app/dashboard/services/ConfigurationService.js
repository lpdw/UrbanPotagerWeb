(function(){
    'use strict';

    function ConfigurationService($resource){

        var apiPath = 'https://urbanpotager.labesse.me';

        var resource = $resource(apiPath+'/garden/:slugGarden/configuration', {slugGarden: '@slugGarden'}, {
            get:{
                method:"GET",
                headers:{ Accept: 'text/html, application/json, text/plain, */*' }
            },
            update: {
                method: 'PUT'
            }
        });
        /*ar resource = $resource('/bug',{},{
            ,*/


        return {
            resource: resource
        };
    }
    controllers.factory('ConfigurationService', ConfigurationService);
})();


