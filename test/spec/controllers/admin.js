'use strict';
// describe('Admin Ctrl', function () {
//     var scope, $location, createController, rootScope, getSchoolData;
//     var sce, ctrl, routeParams;
//     //    var $q,noNetError,getServerConfigData,routeParams;
//     //    var deferred;
//     //    
//     //    
//     //    var getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse;
    
//     beforeEach(module('studentActivityReports'));
//     beforeEach(module('studentActivityReports.adminDetails'));
//     beforeEach(inject(function ($rootScope, $controller, _getSchoolData_, _$sce_, _$routeParams_) {
//         //        $location = _$location_;
//         rootScope = $rootScope;
//         scope = $rootScope.$new();
//         getSchoolData = _getSchoolData_;
//         sce = _$sce_;
//         routeParams = _$routeParams_;
//         //ctrl = _$controller_;
//         //        We use the $q service to create a mock instance of defer
//         //        deferred = _$q_.defer();
//         //
//         //        Use a Jasmine Spy to return the deferred promise
//         //        spyOn(getDataCourseTeacher, '_get').and.returnValue(deferred.promise);
//         //        
//         //        spyOn(getDataStudentTeacher,'_get').and.returnValue(deferred.promise);
        
//         //        createController = function() {
//         //            return $controller('adminctrl', {
//         //                $scope: scope,
//         //                $rootScope:rootScope,
//         //                $sce:sce,
//         //                getSchoolData:getSchoolData
//         //            });
//         //        };
//         ctrl = $controller('adminctrl', {
//             $rootScope: rootScope,
//             $scope: scope,
//             $sce: sce,
//             getSchoolData: getSchoolData,
//             $routeParams: routeParams
//         });

//     }));


describe('Admin Ctrl', function () {
    var scope, createController, rootScope;
    //    var $q,noNetError,getServerConfigData,routeParams;
    //    var deferred;
    //    
    //    
    //    var getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse,routeParams;
    
    beforeEach(module('studentActivityReports'));
    beforeEach(module('studentActivityReports.adminDetails'));
    beforeEach(inject(function ($rootScope, $controller) {
        //        $location = _$location_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        // getSchoolData = _getSchoolData_;
        // sce = _$sce_;
        // routeParams = _$routeParams_;
        rootScope.admindetail = { data: { user: { domainid: "some id" } } };
        rootScope.winConfigObj = {
            "userSettingObjects": {

                "role": "admin",
                "userid": "46238944",
                "token": "~gzYwCAAAAAQM2iw5BQIX1B.HwmhTZ2tivEXR8DPganCnA",

                "userspace": "gsd-06"
            },
            "servicesBaseUrl": "http://192.168.2.58:8080/gage-service/service",
            "reportServiceUrlStudent": "http://192.168.2.58:8080/reports"
        }
        //        $q = _$q_;
        //        notAuthenticated=_notAuthenticated_;
        //        noNetError=_noNetError_;
        //        getServerConfigData=_getServerConfigData_;
        //        routeParams =_$routeParams_;
        //        getEnrollmentStatus=_getEnrollmentStatus_;
        
        // We use the $q service to create a mock instance of defer
        //        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        //        spyOn(getDataCourseTeacher, '_get').and.returnValue(deferred.promise);
        
        //        spyOn(getDataStudentTeacher,'_get').and.returnValue(deferred.promise);
        
        createController = function () {
            return $controller('adminctrl', {
                $rootScope: rootScope,
                $scope: scope
                // $sce: sce,
                // getSchoolData: getSchoolData,
                // $routeParams: routeParams
                //                $routeParams:{userid: '12345'}
                //                getDataStudentTeacher: getDataStudentTeacher,
                //                getDataCourseTeacher: getDataCourseTeacher
            });
        };
    }));

    it('It shuould initialize the variables', function () {
        var controller = createController();

        scope.initValues();

        // expect(scope.userId).toEqual('12345');
        expect(scope.details).toEqual({});
        expect(rootScope.isblue).toBe(false);

        expect(scope.statusNotSelected).toBe(false);
        expect(scope.courseNotSelected).toBe(false);
        expect(scope.studentNotSelected).toBe(false);
        expect(scope.schoolNotSelected).toBe(false);
        expect(scope.srtDateNotSelected).toBe(false);
        expect(scope.endDateNotgreater).toBe(false);
        expect(scope.minimumMinut).toBe(false);
        expect(scope.inputAdmin).toEqual(0);

        expect(scope.schoolListIds).toEqual([]);
        expect(scope.multiselectModelAdminSchool).toEqual([]);
        expect(scope.allSchoolIdArrays).toEqual([]);
        expect(scope.enrollArr).toEqual([]);
        expect(scope.multiselectModelEroll).toEqual([]);
        expect(scope.studentListIds).toEqual([]);
        expect(scope.multiselectModelAdminStudent).toEqual([]);
        expect(scope.allSchoolStudentIdArrays).toEqual([]);
        expect(scope.studentCourseListIds).toEqual([]);
        expect(scope.multiselectModelAdminStudentCourse).toEqual([]);

        expect(scope.searchagain).toEqual('displaynonecls');
        expect(scope.iframe_row).toEqual('displaynonecls');
        expect(scope.isShowReportView).toBe(false);


    });




});
