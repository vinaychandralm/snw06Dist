'use strict';

describe('getDataCourseTeacher', function () {

    // load the controller's module
    beforeEach(module('studentActivityReportsTeacher.factories'));

    var basePath, userid, role, scope, getDataCourseTeacher, rootScope, http;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _getDataCourseTeacher_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        getDataCourseTeacher = _getDataCourseTeacher_;
        basePath = 'http://172.16.9.197:8282/gage-service/service/course?';
        role = "teacher";
        userid = "46240033";
        spyOn(http, "get").and.returnValue("some value");
    }));

    it('should call the getDataCourseTeacher function', function () {
        var url = basePath + "role=" + role + "&userids=" + userid;
        var get = getDataCourseTeacher._get(role, userid);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

});

describe('getDataStudentTeacher', function () {

    // load the controller's module
    beforeEach(module('studentActivityReportsTeacher.factories'));

    var basePath, userid, role, scope, getDataStudentTeacher, rootScope, http;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _getDataStudentTeacher_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        getDataStudentTeacher = _getDataStudentTeacher_;
        basePath = 'http://172.16.9.197:8282/gage-service/service/student?entitytype=course&';
        role = "teacher";
        userid = "46240033";
        spyOn(http, "get").and.returnValue("some value");
    }));

    it('should call the getDataStudentTeacher function', function () {
        var url = basePath + "entityids=" + userid;
        var get = getDataStudentTeacher._get(role, userid);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

});

describe('getEnrollmentStatus', function () {

    // load the controller's module
    beforeEach(module('studentActivityReportsTeacher.factories'));
     var scope, getEnrollmentStatus, rootScope;
      beforeEach(inject(function ($rootScope, _getEnrollmentStatus_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        getEnrollmentStatus = _getEnrollmentStatus_;
        
    }));

    it('should return static value', function () {
        var get=getEnrollmentStatus.get();
        expect(get).toEqual([
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
        ]);
    });
});