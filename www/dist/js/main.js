(function () {
    'use strict';

    angular
        .module('app.controllers', dependencies());

    function dependencies() {
        return [
            'app.blog-controller'
        ];
    }

})();



(function () {
    'use strict';

    angular
        .module('app', dependencies())
        .run(run);

    function dependencies() {
        return [
            'ionic',
            'firebase',
            'app.routes',
            'app.controllers'
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
                        templateUrl: 'templates/tab-blog.html',
                        controller: 'BlogController as vm'
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



(function () {
    'use strict';

    angular
        .module('app.blog-controller', [])
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope', '$ionicActionSheet', '$firebaseObject'];

    function BlogController($scope, $ionicActionSheet, $firebaseObject) {
        var vm = this;
        var firebase = new Firebase('https://brilliant-heat-3361.firebaseio.com/blog');

        vm.posts = {};
        vm.initialized = false;
        vm.loading = false;
        vm.limit = 20;
        vm.getPosts = getPosts;
        vm.loadMore = loadMore;
        vm.browse = browse;
        vm.openActionSheet = openActionSheet;

        activate();

        //////////

        function activate() {
            vm.getPosts();
        }

        function getPosts() {
            vm.loading = true;
            firebase.orderByKey().limitToLast(vm.limit).once('value', function(snapshot) {
                vm.posts = snapshot.val();
                vm.loading = false;
                vm.initialized = true;
                $scope.$apply();
            });
        }

        function loadMore() {
            vm.limit = vm.limit + 10;
            vm.getPosts();
        }

        // open url with in-app browser
        function browse(url) {
            window.open(url, '_blank', 'loation=yes');
        }

        function openActionSheet() {
            $ionicActionSheet.show({
                buttons: [
                    { text: 'open' }
                ]
            });
        }

    }

})();
