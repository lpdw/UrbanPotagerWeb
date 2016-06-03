(function () {
    'use strict';

    function PotagerService($resource) {

        //var apiPath = 'datas.json';
        var apiPath = 'https://urbanpotager.labesse.me';

        var resource = $resource(apiPath+'/gardens/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            } 
        });
        return {
            resource: resource
        };
    }

    angular.module('myApp.services', []).factory('PotagerService', PotagerService);
})();