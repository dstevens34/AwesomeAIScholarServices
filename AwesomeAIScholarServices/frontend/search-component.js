angular.module('awesome')
    .component('awesomeSearch', {
        templateUrl: 'search.html',
        controller: 'SearchController',
        bindings: {
            input: '<'
        }
    });