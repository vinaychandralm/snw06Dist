"use strict";

var factoryModule = angular.module('studentActivityReportsTeacher.factories', []);

factoryModule.factory('getDataCourseTeacher',['$http', function ($http) {



    return {
        _get: function (role, userid, urlDetails) {
            var basePath = urlDetails.servicesBaseUrl +"/course?";
            return $http.get(basePath + "role=" + role + "&userids=" + userid);
        }
    };
}]);

factoryModule.factory('getDataStudentTeacher',['$http', function ($http) {



    return {
        _get: function (role, userid,urlDetails) {
          //  console.log(basePath + "entityids=" + userid);
            var basePath = urlDetails.servicesBaseUrl +"/student?entitytype=course&";
            return $http.get(basePath + "entityids=" + userid);
        }
    };
}]);

