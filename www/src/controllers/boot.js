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
