angular.module('awesome')
    .controller('SavedController', function ($http, $state) {
        var ctrl = this;

        $http.get('/api/getSavedPapers').then(function(response){
            ctrl.papers = response.data;
        });

        ctrl.goBack = function() {
            $state.go('search');
        }

        ctrl.unsavePaper = function(paper) {
            //TODO
        };
    });