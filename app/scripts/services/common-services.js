"use strict";
var studentActivityServices = angular.module('studentActivityReports.services', []);

studentActivityServices.service('iFrameLoading', ['$window', '$rootScope', function ($window, $rootScope) {

    function subsFunc() {
        $window.addEventListener('message', function (e) {
            console.info('Post message has been Called send by Iframe');
            $rootScope.$broadcast('iframeloading.done', e);
        });
    }
    function resizewindowEvent() {
        $window.addEventListener('resize', function (e) {
            console.log('resize has been Called send by Iframe');
            $rootScope.$broadcast('iframeresize.happnen', e);
        });
    }

    return {
        "subscribeiFrameLoading": subsFunc,
        "subscribeWindowResize":resizewindowEvent
    };

}]);