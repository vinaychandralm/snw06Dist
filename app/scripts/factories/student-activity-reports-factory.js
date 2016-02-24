"use strict";

var factoryModule = angular.module('studentActivityReports.factories', []);

factoryModule.factory('getServerConfigData', function() {

    return {
        _getDetails: function() {
          return {
                  "servicesBaseUrl" : 'http://172.16.9.197:8282/gage-service/service/',
              }
        }
    }
});

factoryModule.factory('validateUrlData',['$http','$rootScope', function($http, $rootScope) {

    return {
        _get: function(role,userid,_token,urlDetails) {
            console.log(role,userid);
            var token = _token;
            var entitytype = 'D|C';
            var basePath =urlDetails.servicesBaseUrl  +"/user/rights/";
            $rootScope.showoverlay = true;
            var __url = basePath +userid+'?roletype='+role+'&entitytype='+entitytype+'&token='+_token;
            console.log(__url);
            return $http.get(__url);

        }
    };
}]);


factoryModule.factory('getDataStudent',['$http', function($http) {
    return {
        _get: function(role,userid,urlDetails,__$scopecourseArr) {
          console.log(urlDetails);
          var basePath =  urlDetails.servicesBaseUrl + '/course?';
             return $http.get(basePath +"role="+role+"&userids="+userid);
        }
    };
}]);

factoryModule.factory('getStudentCourseData', ['$http',function($http) {



    return {
        _get: function(userid,urlDetails) {
          var basePath = urlDetails.servicesBaseUrl +'/course?role=student&userids=';
             return $http.get(basePath +userid);
        }
    };
}]);

factoryModule.factory('notAuthenticated',['$rootScope', function($rootScope) {

   // var basePath = 'http://172.16.9.197:8282/gage-service/service/course?role=student&userids=';

    return {
        _showErrorMsg: function(){
//                $rootScope.loadingText = true;
                $rootScope.netErr = false;
                $rootScope.authenticationErr = true;
                $rootScope.loadingText = false;
        }
    };
}]);
factoryModule.factory('noNetError',['$rootScope', function($rootScope) {

   // var basePath = 'http://172.16.9.197:8282/gage-service/service/course?role=student&userids=';

    return {
        _showNetErrorMsg: function(){
                $rootScope.netErr = true;
                $rootScope.authenticationErr = false;
                $rootScope.loadingText = false;
        }
    };
}]);


factoryModule.factory('getEnrollmentStatus',['$http', function($http) {

    var service = {};

    service.get = function() {
        return [
            {
                id: 0,
                name: "Active"
            },
            {
                id: 1,
                name: "Withdrawn"
            },
            {
                id: 2,
                name: "WithdrawnFailed"
            },
            {
                id: 3,
                name: "Transferred"
            },
            {
                id: 4,
                name: "Completed"
            },
            {
                id: 5,
                name: "CompletedNoCredit"
            },
            {
                id: 6,
                name: "Suspended"
            },
            {
                id: 7,
                name: "Inactive"
            }
        ];
    };

    return service;
}]);
