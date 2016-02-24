'use strict';

describe('getSchoolData', function () {

    // load the controller's module
    beforeEach(module('studentActivityReportsAdmin.factories'));

    var basePath, domainid, token, scope, urldetails, getSchoolData, rootScope, http;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _getSchoolData_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        getSchoolData = _getSchoolData_;
        domainid = "46240033";
        token = "~hEZwCAAAAAQl7dkU-FQqlB.Yp_Q6EA2pmadM1IK-2Ea2C";
        urldetails = { "servicesBaseUrl": 'http://172.16.9.197:8282/gage-service/service/' };
        basePath = urldetails.servicesBaseUrl + "domain/list/";
        spyOn(http, "get").and.returnValue("some value");
    }));

    it('should call the getSchoolData function', function () {
        var url = basePath + domainid + '?token=' + token;
        var get = getSchoolData._get(domainid, token, urldetails);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

});

describe('getSchoolStudent', function () {

    // load the controller's module
    beforeEach(module('studentActivityReportsAdmin.factories'));

    var basePath, schoolIdsArray, scope, urldetails, getSchoolStudent, rootScope, http;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _getSchoolStudent_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        getSchoolStudent = _getSchoolStudent_;
        // basePath = 'http://172.16.9.197:8282/gage-service/service/student?entitytype=school&entityids=';
        schoolIdsArray = [46240033, 464554, 4645456, 4564646, 464645];
        urldetails = { "servicesBaseUrl": 'http://172.16.9.197:8282/gage-service/service/' };
        basePath = urldetails.servicesBaseUrl + "student?entitytype=school&entityids=";
        spyOn(http, "get").and.returnValue("some value");
    }));

    it('should call the getSchoolStudent function', function () {
        var url = basePath + schoolIdsArray.join();
        var get = getSchoolStudent._get(schoolIdsArray, urldetails);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

});



describe('getSchoolStudentCourse', function () {

    // load the controller's module
    beforeEach(module('studentActivityReportsAdmin.factories'));

    var basePath, schoolStudentIdsArray, urldetails, scope, getSchoolStudentCourse, rootScope, http;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _getSchoolStudentCourse_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        getSchoolStudentCourse = _getSchoolStudentCourse_;
        // basePath = 'http://172.16.9.197:8282/gage-service/service/course?role=student&userids=';
        schoolStudentIdsArray = [46240033, 464554, 4645456, 4564646, 464645];
        urldetails = { "servicesBaseUrl": 'http://172.16.9.197:8282/gage-service/service/' };
        basePath = urldetails.servicesBaseUrl +"course?role=student&userids=";
        spyOn(http, "get").and.returnValue("some value");
    }));

    it('should call the getSchoolStudentCourse function', function () {
        var url = basePath + schoolStudentIdsArray.join();
        var get = getSchoolStudentCourse._get(schoolStudentIdsArray,urldetails);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

});

describe('getEnrollmentStatus', function () {

    // load the controller's module
    beforeEach(module('studentActivityReportsAdmin.factories'));
    var scope, getEnrollmentStatus, rootScope;
    beforeEach(inject(function ($rootScope, _getEnrollmentStatus_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        getEnrollmentStatus = _getEnrollmentStatus_;

    }));

    it('should return static value', function () {
        var get = getEnrollmentStatus.get();
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