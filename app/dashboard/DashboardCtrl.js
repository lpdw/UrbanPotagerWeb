'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl as dashboard'
        });
    }])

    .controller('DashboardCtrl', [function() {

        var vm = this;

        vm.title = "Page dashboard";
    }]);