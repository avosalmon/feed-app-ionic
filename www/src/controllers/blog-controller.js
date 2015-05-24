(function () {
    'use strict';

    angular
        .module('app.blog-controller', [])
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope', '$firebaseObject'];

    function BlogController($scope, $firebaseObject) {
        var vm = this;
        var firebase = new Firebase('https://brilliant-heat-3361.firebaseio.com/blog');

        vm.posts = {};
        vm.initialized = false;
        vm.loading = false;
        vm.limit = 20;
        vm.getPosts = getPosts;
        vm.browse = browse;

        activate();

        //////////

        function activate() {
            vm.getPosts();
        }

        function getPosts() {
            vm.loading = true;
            firebase.orderByKey().limitToLast(vm.limit).on('value', function(snapshot) {
                vm.posts = snapshot.val();
                vm.loading = false;
                $scope.$apply();
            });
        }

        // open url with in-app browser
        function browse(url) {
            window.open(url, '_blank', 'loation=yes');
        }
    }

})();
