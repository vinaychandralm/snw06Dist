"use strict";

var factoryModule = angular.module('studentActivityReportsAdmin.factories', []);



factoryModule.factory('getSchoolData',['$http', function($http) {
    return {
        _get: function(userid,__token,urlDetails) {
            // console.log("*******************************************");
            // console.log(userid);
            var basePath = urlDetails.servicesBaseUrl +"/domain/list/";
            var token = __token;
            var __url = basePath +userid+'?token='+token;
            // console.log(__url);
            return $http.get(__url);

        }
    };
}]);


factoryModule.factory('getSchoolStudent', ['$http','$rootScope',function($http, $rootScope) {

    return {
        _get: function(schoolIdsArray,urlDetails) {
           // console.log(role,userid);
           // var token = _token;
           // var entitytype = 'D|C';
           // $rootScope.showoverlay = true;
            var basePath = urlDetails.servicesBaseUrl +"/student?entitytype=school&entityids=";
           // console.log(schoolIdsArray.join());
            var __url = basePath +schoolIdsArray.join();
            //console.log(__url);
            return $http.get(__url);

        }
    };
}]);
factoryModule.factory('getSchoolStudentCourse', ['$http','$rootScope',function($http, $rootScope) {

    return {
        _get: function(schoolStudentIdsArray,urlDetails) {
           // console.log(role,userid);
           // var token = _token;
           // var entitytype = 'D|C';
           // $rootScope.showoverlay = true;
             var basePath = urlDetails.servicesBaseUrl +"/course?role=student&userids=";
           // console.log(schoolStudentIdsArray.join());
            var __url = basePath +schoolStudentIdsArray.join();
          //  console.log(__url);
            return $http.get(__url);

        }
    };
}]);


// factoryModule.factory('getData', function($http) {

//     var basePath = '/src/js/data/';

//     return {
//         _get: function(str) {
//             return $http.get(basePath + str + '.json');
//         }
//     };
// });


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
