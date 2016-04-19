'use strict';

describe('Copy Course Ctrl', function () {
    var scope, createController, rootScope;
    var $q, noNetError, notAuthenticated, noNetError;
    var deferred;
    var $location, $timeout,$locale,$routeParams;
    var validateUrlData,GetCourseCatalog,GetExistingCourseCat,GetNewCourseCatSchool,GetNewCourseCatDist,postcopycourse;
    //    
    //    
    //    var getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse,routeParams;
    // $scope, $rootScope, $location, theme, $routeParams, validateUrlData, notAuthenticated, noNetError,
    //     getSchoolData, GetCourseCatalog, GetExistingCourseCat, $locale, _, GetNewCourseCatSchool, GetNewCourseCatDist,
    //     postcopycourse, $timeout
    beforeEach(module('studentActivityReports'));
    beforeEach(module('AdminActivityReports.courseMgmt'));
    beforeEach(inject(function ($rootScope, $controller,_$routeParams_, _$location_,_validateUrlData_, _notAuthenticated_,
     _noNetError_,_GetCourseCatalog_ ,_GetExistingCourseCat_,_$locale_,_GetNewCourseCatSchool_,_GetNewCourseCatDist_,
      _postcopycourse_,_$timeout_,_$q_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        notAuthenticated = _notAuthenticated_;
        noNetError = _noNetError_
        $q = _$q_;
        $location = _$location_;
        $timeout=_$timeout_;
        validateUrlData=_validateUrlData_;
        GetCourseCatalog= _GetCourseCatalog_;
        GetExistingCourseCat = _GetExistingCourseCat_;
        $locale =_$locale_;
        GetNewCourseCatSchool=_GetNewCourseCatSchool_;
        GetNewCourseCatDist= _GetNewCourseCatDist_;
        postcopycourse= _postcopycourse_;
        $routeParams = _$routeParams_;
        rootScope.admindetail = { data: { user: { domainid: "some id" } } };
        rootScope.winConfigObj = {
              "userSettingObjects": {


                "role": "admin",
                "userid": "46238944",
                "token": "~gzYwCAAAAAQZvSzPzYfwJA.GeZPIOOrBFAT8-FCPiYVTC",
                "userspace": "gsd-06"
            },
            "servicesBaseUrl_1": "https://devlearn.schoolimprovement.com/gage-service/service",
            "reportServiceUrlStudent_1": "https://devlearn.schoolimprovement.com/reports",
            "servicesBaseUrl": "http://192.168.2.58:8080/gage-service/service",
            "reportServiceUrlStudent": "http://192.168.2.58:8080/reports",
            "courseCatalogUrl": "http://192.168.2.58:8080/gage-service/service/domain/list/providers?token=",
            "existingCourseUrl": "http://192.168.2.58:8080/gage-service/service/course/list/",
            "newCourseList": "http://192.168.2.58:8080/gage-service/service/course/new/list/",
            "copyCourseUrl": "http://192.168.2.58:8080/gage-service/service/course/copycourse"
        };
        rootScope.token = rootScope.winConfigObj.userSettingObjects.token
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
       // spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);

        //spyOn(getSchoolStudent, '_get').and.returnValue(deferred.promise);

       // spyOn(getSchoolStudentCourse, '_get').and.returnValue(deferred.promise);

       // scope.$watch = jasmine.createSpy('$watch');

       // jasmine.createSpy("$timeout");
        
        
        //        spyOn(getDataStudentTeacher,'_get').and.returnValue(deferred.promise);
        
        createController = function () {
            return $controller('courseMgmtCtrl', {
                $rootScope: rootScope,
                $scope: scope,
                notAuthenticated: notAuthenticated,
                noNetError: noNetError,
                $location: $location,
                $timeout:$timeout,
                validateUrlData:validateUrlData,
                GetCourseCatalog: GetCourseCatalog,
                GetExistingCourseCat: GetExistingCourseCat,
                $locale :$locale,
                GetNewCourseCatSchool:GetNewCourseCatSchool,
                GetNewCourseCatDist: GetNewCourseCatDist,
                postcopycourse: postcopycourse,
                $routeParams:$routeParams
            });
        };
    }));
    
    
     it('It shuould initialize the variables', function () {
        var controller = createController();

        rootScope.userid = routeParams.userid = '46240033';
        rootScope.token = routeParams.token = '~hEZwCAAAAAw5SzN-PdQG_A.tyyCMyTG97kTflUrMDjNKB';
        rootScope.role = routeParams.role = 'admin';

     //   scope.initValues();

        // expect(scope.progressReport).toBe(false);
        // expect(scope.studentActivityReport).toBe(false);
        // expect(rootScope.loadingText).toBe(true);
        // expect(rootScope.netErr).toBe(false);
        // expect(rootScope.authenticationErr).toBe(false);

    });

    
});