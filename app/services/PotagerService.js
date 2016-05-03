(function(){
    'use strict';

    function PotagerService($resource){

        var apiPath = 'datas.json';

        var resource = $resource(apiPath, {}, {
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function(datas) {
                    console.log('datas service', datas);
                    if (datas.length > 0) {
                        try {
                            datas = angular.fromJson(datas);
                            return datas;
                        } catch (error) {
                            console.log('problème parse json', error);
                        }
                    }
                }
            }
        });
        return {
            resource: resource
        };
    }
    angular.module('myApp.services', []).factory('PotagerService', PotagerService);
})();
