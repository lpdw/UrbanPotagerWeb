(function(){
    'use strict';

    function AlertService($resource, localStorageService){

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  localStorageService.get('token');

        /**
         * Interact with configurations
         **/
        var resourceAlert = $resource(apiPath+'/alerts/:slug', {
            slug: '@slug'
        }, {
            //Post new alert
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Get alert details
            get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Modify a alert
            patch:{
                method:"PATCH",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Delete a alert
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        /**
         * Interact with gardens with alert
         * */
        var resourceConfiguredGardens = $resource(apiPath+'/gardens/:slugGarden/alerts/:slugAlert', {
            slugGarden: '@slugGarden',
            slugAlert: '@slugAlert'

        }, {
            //Get garden alert
            query:{
                method:'GET',
                isArray:true
            },
            //Unlink garden with current alert
            delete:{
                method:"DELETE",
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
            resourceAlert: resourceAlert,
            resourceConfiguredGardens: resourceConfiguredGardens
        };
    }
    controllers.factory('AlertService', AlertService);
})();


