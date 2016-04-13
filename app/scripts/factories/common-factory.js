"use strict";

var factoryModule = angular.module('studentActivityReportscommomns.factories', []);
factoryModule.factory('showReport',['$rootScope','$sce','iFrameLoading','$timeout','$window', function($rootScope,$sce,iFrameLoading,$timeout,$window) {

    return {
        loadOnIFrame: function(__$scope) {
            
            if (__$scope.oldReportUrl != __$scope.newReportUrl) {
                    
                    //assigning new url to old url valiable 
                    __$scope.oldReportUrl = __$scope.newReportUrl;
                    __$scope.iframeReportUrl = $sce.trustAsResourceUrl(__$scope.newReportUrl);
                    //Setting varaible for Animation
                    __$scope.isShowReportView = true;
                    $rootScope.showoverlayOniFrameLoading = true;

                    //setting Iframe Height on initial load
                    angular.element('iframe').height(($window.innerHeight-angular.element('.header').height())*0.85);
                    
                    iFrameLoading.subscribeiFrameLoading();
                    
                    
                    //setting delay due to heavy processing and parsing taking time
                    $rootScope.$on('iframeloading.done', function (a, b) {
                        $timeout(function () {
                            $rootScope.showoverlayOniFrameLoading = false;
                        }, 18000);
                        __$scope.$apply();
                    });

                } else {
                    __$scope.isShowReportView = true;
                    
                     
                }
                iFrameLoading.subscribeWindowResize();
                $rootScope.$on('iframeresize.happnen', function () {
                    //setting Iframe Height
                    angular.element('iframe').height(($window.innerHeight-angular.element('.header').height())*0.85);
                    
                });
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
            return (mm + '/' + dd + '/' + yyyy);
        }
       
    }
}]);

// factoryModule.factory('calculateIFramHeightnWidth',['$rootScope','$window', function($rootScope, $window) {

//     return {
//         getHeightnWidth: function() {
//             console.log('$window.innerHeight : ',$window.innerHeight);
//             angular.element('.header .ng-scope');
//         }
//     }
// }]);

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


factoryModule.factory('GetCourseCatalog',['$http','$rootScope', function($http,$rootScope) {
    
   return {
        _get: function() {
            // console.log($rootScope.winConfigObj)
            var __url = $rootScope.winConfigObj.courseCatalogUrl; // +$rootScope.token;
            // console.log(__url);
            return $http.get(__url);
        }
    };
   }
]);


factoryModule.factory('GetExistingCourseCat',['$http','$rootScope', function($http,$rootScope) {
    
   return {
        _get: function(__domainId,chkbxidstr) {
       //     console.log($rootScope.winConfigObj)
            var __url = $rootScope.winConfigObj.existingCourseUrl+ __domainId +"?token="+$rootScope.token;
      //      console.log(__url);
            return $http.get(__url);
        }
    };
   }
]);

factoryModule.factory('GetNewCourseCatSchool',['$http','$rootScope', function($http,$rootScope) {
    
   return {
        _get: function(schoolId,distId) {
       //     console.log($rootScope.winConfigObj)
          //  var __url = $rootScope.winConfigObj.newCourseList+"/"+ distId +"/"+ schoolId+ "?&type=school&token="+$rootScope.token;
     
    //  console.log("$rootScope.token ",$rootScope.token);
    //  console.log("")
                 var __url = $rootScope.winConfigObj.newCourseList + schoolId  +"?baseDomainId="+distId + "&type=school&token="+$rootScope.token;
     
            // console.log(__url);
            return $http.get(__url);
        }
    };
   }
]);

///http://localhost:8080/gage-service/service/course/new/list/46238884?baseDomainId=34816161,34816208&type=district&token=~gzY

factoryModule.factory('GetNewCourseCatDist',['$http','$rootScope', function($http,$rootScope) {
    
   return {
        _get: function(distObjId, idArrayOfSelectedCourseCat) {
           
            var __url = $rootScope.winConfigObj.newCourseList + distObjId  +"?baseDomainId="+idArrayOfSelectedCourseCat.join() + "&type=district&token="+$rootScope.token;
     
            // console.log(__url);
            return $http.get(__url);
        }
    };
   }
   
  
]);
 factoryModule.factory('postcopycourse',['$http','$rootScope', function($http,$rootScope) {
    
   return {
        _post: function(objArray) {
           
         //  console.log(objArray)
           var data = JSON.stringify(objArray);
        //    console.log(data);
           var config = {
                headers : {
                     'Content-Type': 'application/json;charset=utf-8;'
                }
            }
           return $http.post($rootScope.winConfigObj.copyCourseUrl+"?token="+$rootScope.token, data,config);
        }
    };
   }
   ]);