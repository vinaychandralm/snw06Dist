"use strict";

var factoryModule = angular.module('studentActivityReportsTeacher.factories', []);

factoryModule.factory('getDataCourseTeacher', function ($http) {

    var basePath = CONFIGJSONOBJ.servicesBaseUrl +"/course?";

    return {
        _get: function (role, userid, __$scopecourseArr) {
            return $http.get(basePath + "role=" + role + "&userids=" + userid);
        }
    };
});

factoryModule.factory('getDataStudentTeacher', function ($http) {

    var basePath = CONFIGJSONOBJ.servicesBaseUrl +"/student?entitytype=course&";

    return {
        _get: function (role, userid) {
            console.log(basePath + "entityids=" + userid);
            return $http.get(basePath + "entityids=" + userid);
        }   
    };
});


factoryModule.factory('getEnrollmentStatus', function ($http) {

    var service = {};

    service.get = function () {
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
