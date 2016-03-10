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
                            alert();
                        }, 4000);
                        __$scope.$apply();
                    });

                } else {
                    __$scope.isShowReportView = true;
                }

        }
    };
}]);

factoryModule.factory('GetDateAsString',['$rootScope', function($rootScope) {

    return {
        dateStr: function(dateObj) {
            // var today = new Date();
            var dd = dateObj.getDate();
            var mm = dateObj.getMonth() + 1; //January is 0!

            var yyyy = dateObj.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            return (dd + '/' + mm + '/' + yyyy);
        }
       
    }
}]);

factoryModule.factory('GetEnrollIdAsString',['$rootScope', function($rootScope) {
    
   return{  getEnrollIdStr:function(__$scope){
            
             var temObj = ["1", "4", "5", "6", "7", "8", "9", "10"];
            //Active = 1, Withdrawn = 4, WithdrawnFailed = 5,Transferred = 6,Completed = 7,CompletedNoCredit = 8,Suspended = 9,Inactive = 10,
            var idArray = [];
            for (var i = 0; i < __$scope.enrollArr.length; i++) {
                idArray.push(temObj[__$scope.enrollArr[i]]);
            }
            return idArray;
            
        }
   }
    
    
}]);