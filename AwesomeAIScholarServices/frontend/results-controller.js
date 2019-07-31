angular.module('awesome')
    .controller('ResultsController', function ($window, $state, $http) {
        var ctrl = this;

        $http.get('/api/getPapers', {
            params: {
                q: ctrl.input
            }
        }).then(function(response) {
            if(angular.isArray(response.data)) {
                ctrl.papers = response.data;
            }
        });

        $http.get('/api/getCurrentUser').then(function(response) {
            ctrl.user = response.data;
        });

        ctrl.searchTag = function(tag) {
            $state.go('search.results', {input: tag}, {reload: true});
        };

        ctrl.goToPaper = function(paper) {
            $window.open(paper.URL, '_blank');            
        };

        ctrl.getTags = function(paper) {
            if(angular.isString(paper.matched_tags)){
                return paper.matched_tags.toLowerCase().split(",");
            }
        };

        ctrl.getRelevance = function(paper) {
            return Math.round(paper.compound_relevance * 100) + "% relevance";
        };

        ctrl.getLabelType = function(paper) {
            var types = {
                success: 0.9,
                primary: 0.8,
                info: 0.7,
                warning: 0.6
            };

            var type = _.findKey(types, function(value, key) {
                if(paper.compound_relevance > value) {
                    return key;
                }
            });
            type = type || 'danger';
            
            return 'label-' + type;
        };

        var handleNewPapers = function(response) {
            if(angular.isArray(response.data)) {
                ctrl.papers = response.data;
            }
            else {
                ctrl.errorOccurred = response.data.code;
            }
        };

        ctrl.upvotePaper = function(paper) {
            $http.get('/api/upVote', {
                params: {
                    q: paper.index
                }
            }).then(handleNewPapers);
        };

        ctrl.downvotePaper = function(paper) {
            $http.get('/api/downVote', {
                params: {
                    q: paper.index
                }
            }).then(handleNewPapers);
        };

        ctrl.savePaper = function(paper) {
            $http.get('/api/savePaper', {
                params: {
                    q: paper.index
                }
            }).then(handleNewPapers);
        };
    });