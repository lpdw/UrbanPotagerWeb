(function(){
    'use strict';

    function PotagerService($resource){

        var apiPath = 'datas.json';

        var resource = $resource(apiPath);

        return {
            resource: resource
        };
    }
    angular.module('myApp.services', []).factory('PotagerService', PotagerService);
})();
