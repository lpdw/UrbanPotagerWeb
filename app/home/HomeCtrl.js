'use strict';

angular.module('myApp.home', ['ngRoute', 'leaflet-directive'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl as home'
        });
    }])

    .controller('HomeCtrl', [ '$location', '$scope', function($location, $scope) {



            angular.extend($scope, {
                paris: {
                    lat: 48.51,
                    lng: 2.20,
                    zoom: 8
                },
                markers: {}
            });

            $scope.addMarkers = function() {
                angular.extend($scope, {
                    markers: {
                        m1: {
                            lat: 48.5,
                            lng: 2.18,
                            message: "Heyyyyyy",
                            iconUrl: 'img/leaf-green.png',
                        },
                        m2: {
                            lat: 48.8,
                            lng: 2.15,
                            focus: true,
                            message: "Coucou",
                            draggable: true
                        }
                    }
                });
            };

            $scope.removeMarkers = function() {
                $scope.markers = {};
            }

            $scope.addMarkers();


            $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
                $scope.position.lat = args.model.lat;
                $scope.position.lng = args.model.lng;
            });

        var vm = this;
        var path = $location.path();

        vm.main_title = "CONCEPT";
        vm.conceptImageUrl = "./assets/images/home-concept.png";
        vm.features_title = "FEATURES";

        vm.featureTitle = "SELF WATERING";
        vm.featureImageUrl = "./assets/images/home-feature.png";
        vm.description = "No more over watering or under watering. Urban Potager will manage it for you";
        vm.featureTitle1 = "ENVIRONMENT";
        vm.featureImageUrl1 = "./assets/images/home-feature1.png";
        vm.description1 = "Control climatic conditions (temperature, humidity, air quality) in real-time";
        vm.featureTitle2 = "LIGHT CONTROL";
        vm.featureImageUrl2 = "./assets/images/home-feature2.png";
        vm.description2 = "Activate additional LED grow lights only when your place is too dark, or during winter-time";
        vm.featureTitle3 = "LOW CONSUMPTION";
        vm.featureImageUrl3 = "./assets/images/home-feature3.jpg";
        vm.description3 = "Urban Potager is a low voltage and low electric consumption indoor garden";
        vm.featureTitle4 = "MULTIPLE VARIETIES";
        vm.featureImageUrl4 = "./assets/images/home-feature4.jpg";
        vm.description4 = "Grow your own fresh herbs, cherry tomatoes, chili peppers, strawberries and even flowers";
        vm.featureTitle5 = "MOBILE APPLICATION";
        vm.featureImageUrl5 = "./assets/images/home-feature5.jpg";
        vm.description5 = "Monitor and adjust your indoor garden settings, and receive real-time notifications and advices";

        vm.button = "NOUS REJOINDRE";
        vm.login = function(){
            $location.path('/inscription/');
        };
    }]);
