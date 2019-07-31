angular.module('awesome')
    .component('awesomeResults', {
        templateUrl: 'results.html',
        controller: 'ResultsController',
        bindings: {
            input: '<'
        }
    });