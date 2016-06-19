(function () {
    'use strict';

    function UserService($resource, localStorageService) {

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  localStorageService.get('token');

        var user = $resource(apiPath+'/me', {}, {
            get:{
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        return {
            user: user
        };
    }

    controllers.factory('UserService', UserService);
})();