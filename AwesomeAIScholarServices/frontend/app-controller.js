angular.module('awesome')
    .controller('AwesomeController', function ($http) {
        var ctrl = this;

        ctrl.$onInit = function() {
            $http.get('/api/getCurrentUser').then(function(response) {
                ctrl.user = response.data;
            });
        };
    });