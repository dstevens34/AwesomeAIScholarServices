angular.module('awesome')
    .controller('SearchController', function ($state, $http) {
        var ctrl = this;

        ctrl.sendRequest = function() {
            ctrl.isLoading = true;

            $http.get('/api/getPapers', {
                params: {
                    q: ctrl.input
                }
            }).then(function(response) {
                if(angular.isArray(response.data)) {
                    $state.go('search.results', {input: ctrl.input});
                }
                else {
                    ctrl.errorOccurred = response.data.code;
                }
            })
            .catch(function(response) {
                ctrl.errorOccurred = response.data.code;
            })
            .finally(function() {
                ctrl.isLoading = false;
            });
        };

        ctrl.cancelRequest = function() {
            ctrl.isLoading = false;
        };

        ctrl.search = function(input) {
            ctrl.input = input;
            ctrl.sendRequest();
        };
    });