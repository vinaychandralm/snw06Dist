'use strict'
var factoryModule = angular.module('studentActivityReportsAdmin.factories', []);



factoryModule.factory('getSchoolData', function($http) {

http://172.16.9.197:8282/gage-service/service/domain/list/45685236?token=~SKq1BAAAAAALtEkMQ0pw5A.4h2waVknunsG6_6pOweqSB
    var basePath = "http://172.16.9.197:8282/gage-service/service/domain/list/"
    
    return {
        _get: function(userid,__token) {
            console.log("*******************************************");
            console.log(userid);
            var token = "SKq1BAAAAAALtEkMQ0pw5A.4h2waVknunsG6_6pOweqSB";
            var __url = basePath +userid+'?token='+__token;
            console.log(__url);
            return $http.get(__url);
             
        }
    };
});


factoryModule.factory('getSchoolStudent', function($http, $rootScope) {


    var basePath = "http://172.16.9.197:8282/gage-service/service/student?entitytype=school&entityids="
    //45685775?roletype=teacher&entitytype=D|C&token=~SKq1BAAAAAALtEkMQ0pw5A.4h2waVknunsG6_6pOweqSB"
    return {
        _get: function(schoolIdsArray) {
           // console.log(role,userid);
           // var token = _token;
           // var entitytype = 'D|C';
           // $rootScope.showoverlay = true;
            console.log(schoolIdsArray.join());
            var __url = basePath +schoolIdsArray.join();
            console.log(__url);
            return $http.get(__url);
             
        }
    };
});
factoryModule.factory('getSchoolStudentCourse', function($http, $rootScope) {


    var basePath = "http://172.16.9.197:8282/gage-service/service/course?role=student&userids="
    //45685775?roletype=teacher&entitytype=D|C&token=~SKq1BAAAAAALtEkMQ0pw5A.4h2waVknunsG6_6pOweqSB"
//    http://172.16.9.197:8282/gage-service/service/course?role=student&userids=43634545,98545908
    return {
        _get: function(schoolStudentIdsArray) {
           // console.log(role,userid);
           // var token = _token;
           // var entitytype = 'D|C';
           // $rootScope.showoverlay = true;
            console.log(schoolStudentIdsArray.join());
            var __url = basePath +schoolStudentIdsArray.join();
            console.log(__url);
            return $http.get(__url);
             
        }
    };
});


factoryModule.factory('getData', function($http) {

    var basePath = '/src/js/data/';

    return {
        _get: function(str) {
            return $http.get(basePath + str + '.json');
        }
    };
});


factoryModule.factory('getEnrollmentStatus', function($http) {

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
});
