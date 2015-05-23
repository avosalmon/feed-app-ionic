(function () {
    'use strict';

    angular
        .module('app', dependencies())
        .run(run);

    function dependencies() {
        return [
            'ionic',
            'app.routes'
        ];
    };

    run.$inject = ['$ionicPlatform'];

    function run($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }

})();



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
