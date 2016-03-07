"use strict";

var factoryModule = angular.module('studentActivityReportscommomns.factories', []);
factoryModule.factory('showReport',['$rootScope','$sce','iFrameLoading','$timeout', function($rootScope,$sce,iFrameLoading,$timeout) {

    return {
        loadOnIFrame: function(__$scope) {
            
            if (__$scope.oldReportUrl != __$scope.newReportUrl) {
                    
                    //assigning new url to old url valiable 
                    __$scope.oldReportUrl = __$scope.newReportUrl;
                    __$scope.iframeReportUrl = $sce.trustAsResourceUrl(__$scope.newReportUrl);
                    //Setting varaible for Animation
                    __$scope.isShowReportView = true;
                    $rootScope.showoverlayOniFrameLoading = true;

                    iFrameLoading.subscribeiFrameLoading();
                    
                    //setting delay due to heavy processing and parsing taking time
                    $rootScope.$on('iframeloading.done', function (a, b) {
                        $timeout(function () {
                            $rootScope.showoverlayOniFrameLoading = false;
                        }, 4000);
                        __$scope.$apply();
                    });

                } else {
                    __$scope.isShowReportView = true;
                }

        }
    };
}]);