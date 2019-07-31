angular.module('awesome').config(function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/search');
            
            // route for the home page
            $stateProvider.state({
                name: 'search',
                url: '/search',
                component: 'awesomeSearch',
                resolve: {
                    input: function($stateParams) {
                        return $stateParams.input;
                    }
                }
            });

            // route for the results page
            $stateProvider.state({
                name: 'search.results',
                url: '/:input',
                component: 'awesomeResults',
                resolve: {
                    input: function($stateParams) {
                        return $stateParams.input;
                    }
                }
            });

            // route for the saved papers page
            $stateProvider.state({
                name: 'saved',
                url: '/saved',
                component: 'awesomeSaved'
            });
    });