'use strict';

controllers.controller('InscriptionCtrl', function ($scope, $rootScope, $location, localStorageService) {
        this.title = "Page d'inscription";

        $scope.isHidden = false;
        $scope.isVisible = false;

        $scope.fadeIt = function() {
          $scope.isHidden = !$scope.isHidden;
          $scope.isVisible = !$scope.isVisible;

        }


        this.inscription = function (data) {

            console.log(data);

            $.ajax({
                    method: "POST",
                    url: "https://urbanpotager.labesse.me/users",
                    data: {
                        username: data.username,
                        email: data.email,
                        plainPassword: data.plainPassword
                    }
                })
                .done(function (msg) {
                    console.log(msg);
                });

        };

        this.connexion = function (data) {
            $.ajax({
                    method: "POST",
                    url: "https://urbanpotager.labesse.me/token",
                    data: {
                        username: data.username,
                        password: data.password
                    }
                })
                .done(function (msg) {
                    console.log(msg);
                    $rootScope.login = true;
                    localStorageService.set("token", msg.token);
                    $location.path("/home");
                });
        };

        function msg(msg) {
            var alt = $('#alert');
            alt.css({
                "display": "none",
                "padding": "16px",
                "border": "2px solid #59b05c"
            });
            alt.fadeIn();
            alt.html(msg);
            setTimeout(function () {
                alt.fadeOut();
            }, 2000);
        }
    })

    controllers.directive("hideMe", function($animate) {
      return function(scope, element, attrs) {
        scope.$watch(attrs.hideMe, function(newVal) {
          if (newVal) {
            $animate.addClass(element, "fadeIn")
          } else {
            $animate.removeClass(element, "fadeIn")
          }
        })
      }
    })
    controllers.directive("showMe", function($animate) {
      return function(scope, element, attrs) {
        scope.$watch(attrs.showMe, function(newVal) {
          if (newVal) {
            $animate.addClass(element, "fadeOut")
          } else {
            $animate.removeClass(element, "fadeOut")
          }
        })
      }
    }
);
