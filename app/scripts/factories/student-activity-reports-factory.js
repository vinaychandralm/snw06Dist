"use strict";

var factoryModule = angular.module('studentActivityReports.factories', []);

factoryModule.factory('validateUrlData',['$http','$rootScope', function($http, $rootScope) {

    return {
        _get: function(role,userid,_token,urlDetails) {
            var token = _token;
            var entitytype = 'D|C';
            var basePath =urlDetails.servicesBaseUrl  +"/user/rights/";
            $rootScope.showoverlay = true;
            var __url = basePath +userid+'?roletype='+role+'&entitytype='+entitytype+'&token='+_token;
            return $http.get(__url);

        }
    };
}]);


factoryModule.factory('getDataStudent',['$http', function($http) {
    return {
        _get: function(role,userid,urlDetails,__$scopecourseArr) {
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


    return {
        _showErrorMsg: function(){
                $rootScope.netErr = false;
                $rootScope.authenticationErr = true;
                $rootScope.loadingText = false;
        }
    };
}]);
factoryModule.factory('noNetError',['$rootScope', function($rootScope) {

    return {
        _showNetErrorMsg: function(){
                $rootScope.netErr = true;
                $rootScope.authenticationErr = false;
                $rootScope.loadingText = false;
        }
    };
}]);

