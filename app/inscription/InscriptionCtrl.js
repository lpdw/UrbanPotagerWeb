'use strict';

controllers.controller('InscriptionCtrl', function ($scope, $rootScope, $location, localStorageService) {
        this.title = "Page d'inscription";

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
    }
);