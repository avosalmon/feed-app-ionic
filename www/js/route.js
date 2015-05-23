(function () {
    'use strict';

    angular
        .module('app.routes', [])
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.blog', {
                url: '/blog',
                views: {
                    'tab-blog': {
                        templateUrl: 'templates/tab-blog.html'
                    }
                }
            })
            .state('tab.instagram', {
                url: '/instagram',
                views: {
                    'tab-instagram': {
                        templateUrl: 'templates/tab-instagram.html'
                    }
                }
            })
            .state('tab.twitter', {
                url: '/twitter',
                views: {
                    'tab-twitter': {
                        templateUrl: 'templates/tab-twitter.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/blog');
    };

})();
