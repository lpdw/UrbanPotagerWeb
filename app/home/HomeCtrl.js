'use strict';

angular.module('myApp.home', ['ngRoute', 'leaflet-directive'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl as home'
  });
}])

.controller('HomeCtrl', [ '$location', '$scope', function($location, $scope) {
  var local_icons = {
    default_icon: {},
    leaf_icon: {
      iconUrl: 'assets/images/leaf-green.png',
      shadowUrl: 'assets/images/leaf-shadow.png',
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    },
    div_icon: {
      type: 'div',
      iconSize: [230, 0],
      html: 'Using <strong>Bold text as an icon</strong>: Lisbon',
      popupAnchor:  [0, 0]
    },
    orange_leaf_icon: {
      iconUrl: 'assets/images/leaf-orange.png',
      shadowUrl: 'assets/images/leaf-shadow.png',
      iconSize:     [38, 95],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62]
    }
  };

  angular.extend($scope, {
    icons: local_icons
  });

  var regions = {
    paris: {
      northEast: {
        lat: 49.15280224425956,
        lng: 2.21681556701660155
      },
      southWest: {
        lat: 48.50211782162702,
        lng: 2.24428138732910156
      }
    },

    markers: {}

  };

  $scope.setRegion = function(region) {
    if (!region) {
      $scope.maxbounds = {};
    } else {
      $scope.maxbounds = regions[region];
    }
  };

  angular.extend($scope, {
    maxbounds: regions.paris,
    defaults: {
      scrollWheelZoom: false
    }
  });

  $scope.addMarkers = function() {
    angular.extend($scope, {
      markers: {
        m1: {
          lat: 48.5,
          lng: 2.18,
          focus: false,
          message: "",
          icon: local_icons.leaf_icon,
        },
        m2: {
          lat: 48.7,
          lng: 2.18,
          focus: false,
          message: "",
          icon: local_icons.orange_leaf_icon,
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
