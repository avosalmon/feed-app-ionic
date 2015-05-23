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
