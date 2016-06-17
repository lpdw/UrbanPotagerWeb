(function(){
    'use strict';

    function MeasuresService($resource, localStorageService){

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  localStorageService.get('token');
        console.log('vérif token', token);

        /**
         * Get measures of a garden
         * */
        var resource = $resource(apiPath+'/gardens/:slugGarden/measures/:slugType', {
            slugGarden: '@slugGarden',
            slugType: '@slugType'

        }, {
            get:{
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        return {
            resource: resource
        };
    }
    controllers.factory('MeasuresService', MeasuresService);
})();




