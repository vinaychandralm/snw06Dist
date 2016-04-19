'use strict';

describe('Admin Ctrl', function () {
    var scope, createController, rootScope;
    var $q, noNetError, notAuthenticated, noNetError;
    var deferred, getSchoolData, getSchoolStudent, getSchoolStudentCourse;
    var getEnrollmentStatus, $location, showReport,$timeout;
    //    
    //    
    //    var getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse,routeParams;
    
    beforeEach(module('studentActivityReports'));
    beforeEach(module('studentActivityReports.adminDetails'));
    beforeEach(inject(function ($rootScope, $controller, _$location_,_$timeout_, _notAuthenticated_, _noNetError_, _getSchoolData_, _$q_, _getEnrollmentStatus_, _getSchoolStudent_, _getSchoolStudentCourse_, _showReport_) {
        //        $location = _$location_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        getEnrollmentStatus: _getEnrollmentStatus_,
        notAuthenticated = _notAuthenticated_;
        noNetError = _noNetError_
        getSchoolData = _getSchoolData_;
        getSchoolStudent = _getSchoolStudent_,
        getSchoolStudentCourse = _getSchoolStudentCourse_;
        $q = _$q_;
        $location = _$location_;
        showReport = _showReport_;
        $timeout=_$timeout_;
        // sce = _$sce_;
        // routeParams = _$routeParams_;
        rootScope.admindetail = { data: { user: { domainid: "some id" } } };
        rootScope.winConfigObj = {
            "userSettingObjects": {

                "role": "admin",
                "userid": "46238944",
                "token": "~gzYwCAAAAAAVEKSY_k1t1B.KawcNr64Loz8aaUcm2JPlB",

                "userspace": "gsd-06"
            },
            "servicesBaseUrl": "http://192.168.2.58:8080/gage-service/service",
            "reportServiceUrlStudent": "http://192.168.2.58:8080/reports"
        };
        rootScope.token = rootScope.winConfigObj.userSettingObjects.token
        
        //        notAuthenticated=_notAuthenticated_;
        //        noNetError=_noNetError_;
        //        getServerConfigData=_getServerConfigData_;
        //        routeParams =_$routeParams_;
        //        getEnrollmentStatus=_getEnrollmentStatus_;
        
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);

        spyOn(getSchoolStudent, '_get').and.returnValue(deferred.promise);

        spyOn(getSchoolStudentCourse, '_get').and.returnValue(deferred.promise);

        scope.$watch = jasmine.createSpy('$watch');

        jasmine.createSpy("$timeout");
        
        
        //        spyOn(getDataStudentTeacher,'_get').and.returnValue(deferred.promise);
        
        createController = function () {
            return $controller('progressAdmin', {
                $rootScope: rootScope,
                $scope: scope,
                notAuthenticated: notAuthenticated,
                noNetError: noNetError,
                getSchoolData: getSchoolData,
                getEnrollmentStatus: _getEnrollmentStatus_,
                getSchoolStudent: getSchoolStudent,
                getSchoolStudentCourse: getSchoolStudentCourse,
                showReport: showReport,
                $location: $location,
                $timeout:$timeout
                // $sce: sce,
                // getSchoolData: getSchoolData,
                // $routeParams: routeParams
                //                $routeParams:{userid: '12345'}
                //                getDataStudentTeacher: getDataStudentTeacher,
                //                getDataCourseTeacher: getDataCourseTeacher
            });
        };
    }));
    
});