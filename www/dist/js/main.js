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

    BlogController.$inject = [];

    function BlogController() {
        var vm = this;

        vm.posts = [
            {
                73822: {
                    entry_date: "2014年12月12日（金）",
                    entry_url: "http://hokuohkurashi.com/note/73822",
                    image_url: "http://assets.kurashicom.com/blog/uploads/2014/12/2014.12.9-0-550x550.jpg",
                    tag: "FOOD",
                    title: "【クラシコムの社員食堂】特集の「我が家のウチ鍋レシピ」をアレンジしました。"
                }
            },
            {
                74044: {
                    entry_date: "2014年11月29日（土）",
                    entry_url: "http://hokuohkurashi.com/note/74044",
                    image_url: "http://assets.kurashicom.com/blog/uploads/2014/11/movie_column_eyecatch.jpg",
                    tag: "COLUMN",
                    title: "【スタッフおすすめ映画】12/1は映画の日！冬の休日にのんびり楽しめる6作品"
                }
            }
        ];
        vm.offset = 0;
        vm.limit = 20;
        vm.getPosts = getPosts;
        vm.browse = browse;

        activate();

        //////////

        function activate() {
            vm.getPosts();
        }

        function getPosts() {

        }

        function setResponseToScope(response) {

        }

        function browse(url) {
            window.open(url, '_blank', 'loation=yes');
        }
    }

})();
