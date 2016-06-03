(function(){
    'use strict';

    function ConfigurationService($resource){

        var apiPath = 'https://urbanpotager.labesse.me';

        var resource = $resource(apiPath+'/gardens/:slugGarden/configurations', {slugGarden: '@slugGarden'}, {
            update: {
                method: 'PUT'
            }
        });
        return {
            resource: resource
        };
    }
    controllers.factory('ConfigurationService', ConfigurationService);
})();


