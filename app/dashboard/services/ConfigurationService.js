(function(){
    'use strict';

    function ConfigurationService($resource){

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE0NjYwOTEzOTYsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOiIxNDY2MDA0OTk2In0.U19-u2LAaPIYwplLr9Qbofa4Cn1x6UAgBnPOvnyuUktL8d1j-bBVnurHdpR9AN-zUB2JOuBn5MrU9wkE2NF_99e0_8wMc2H5sNxctr013AI374TFYxqR_3Nge_hNP9FWMrIBynJQdfP1dpbypTcI9V3nFH-dyeIpNmR2p3BoWuBZ8TtAT8uwYOcKnRqSKfjr2xs7fn2uLwLEggTBcJKvX6uRYe9dPujxAwSGyYph77g9VS6nMw7apnsYkZRDO3mJFtMPiwDAEFh2yZVPhYq2VUqmsA6jH2lw6AgF0wkLEmjmFSX3bhRtIlcyxu5_NjodbTHKMBQbk52abUmPrDCuljJkBsMUQm3ZMgx4k8yh8G4A8p239KvOzlZZuE5c9scVaaF4HZ3oWU_LdUBjX3jKt5C1DDincb6PbCO-y-YYa8WEtjm-PRIvBFvBvEC63ZGeZnHNSPxBzGdbZJKsQ1cpdFCxLeg6krMvhKw32Tkwr44WuuLHFKcanPqXZdAVs9pwP26Esrb_uC1DBnPosZIb_ev7CVlMCmLtUnXLinrfjoilBcitoqGkQZxFvPA9k4GCVk9jNI-s4BCunk-AxMW3FeDXtdUXvhezVTvVqXhr42yrcx5cIVt1hrilYIaFka420wVNE0sGkorBjY5OdcHsH1TJRk7keO7jfGF8tNdhDJs';

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
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }, get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });
        return {
            resource: resource,
            resource2: resource2
        };
    }
    controllers.factory('ConfigurationService', ConfigurationService);
})();


