(function () {
    'use strict';

    function UserService($resource, $localStorage) {

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  $localStorage.user.token;

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