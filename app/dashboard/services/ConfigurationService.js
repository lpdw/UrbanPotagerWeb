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
            //Post new configuration
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Get configurations for current user
            get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        var resource3 = $resource(apiPath+'/configurations/:slug', {
            slug: '@slug'
        }, {
            //Get configuration details
            get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Modify a configuration
            patch:{
                method:"PATCH",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Delete a configuration
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        var resource4 = $resource(apiPath+'/gardens/:slugGarden/configurations', {
            slugGarden: '@slugGarden'
        }, {
            //Get garden configuration
            get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Unlink garden with current configuration
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        var resource5 = $resource(apiPath+'/gardens/:slugGarden/configurations/:slugConfiguration', {
            slugGarden: '@slugGarden',
            slugConfiguration: '@slugConfiguration'
        }, {
            //Get garden configuration
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
            resource2: resource2,
            resource3: resource3,
            resource4: resource4,
            resource5: resource5
        };
    }
    controllers.factory('ConfigurationService', ConfigurationService);
})();


