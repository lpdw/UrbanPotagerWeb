'use strict';

angular.module('myApp.gestion', ['ngRoute', 'myApp.services', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/gestion', {
            templateUrl: 'gestion/gestion.html',
            controller: 'GestionCtrl as gestion'
        });
    }])

    .controller('GestionCtrl', function($location, PotagerService, $q) {

        var vm = this;
        vm.title = "Page gestion";

<<<<<<< HEAD
        vm.potagers = [
            {
                title:"potager 1",
                description:"super potager 1",
                owner: 'JD',
                place:'Tour Eiffel',
                plants:[
                    {
                        title:'Rose',
                        number:'4'
                    },
                    {
                        title:'Tulipe',
                        number:'6'
                    },
                    {
                        title:'Arôme',
                        number:'2'
                    }
                ]
            },
            {
                title:"potager 2",
                description:"super potager 2",
                owner: 'JD',
                place:'FacLab',
                plants:[
                    {
                        title:'Pommes de terres',
                        number:'4'
                    },
                    {
                        title:'Tulipe',
                        number:'6'
                    },
                    {
                        title:'Laitue',
                        number:'2'
                    }
                ]
            },
            {
                title:"potager 3",
                description:"super potager 3",
                owner: 'JD',
                place:'Terril',
                plants:[
                    {
                        title:'Frites',
                        number:'4'
                    },
                    {
                        title:'Marguerite',
                        number:'5'
                    }
                ]
            }
        ]
    }]);
=======
        PotagerService.resource.query(function (datas) {
            vm.potagers = datas;
        });

    });
>>>>>>> master
