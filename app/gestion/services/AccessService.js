(function(){
    'use strict';

    function AccessService($resource, localStorageService){

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  localStorageService.get('token');

        /**
         * Interact with gardens with access
         * */
        var resourceAccessGardens = $resource(apiPath+'/gardens/:slugGarden/access/:slugType', {
            slugGarden: '@slugGarden',
            slugType: '@slugType'

        }, {
            //Get garden access types
            get:{
                method:'GET',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Unlink garden access with type
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            patch:{
                method:"PATCH",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });


        return {
            resourceAccessGardens: resourceAccessGardens
        };
    }
    controllers.factory('AccessService', AccessService);
})();


