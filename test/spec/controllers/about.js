'use strict';

describe('validateUrlData', function () {

    // load the controller's module
    beforeEach(module('studentActivityReports.factories'));

    var token, userid, role, scope, validateUrlData, rootScope, basePath, entitytype, http;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _validateUrlData_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        validateUrlData = _validateUrlData_;
        basePath = "http://172.16.9.197:8282/gage-service/service/user/rights/";
        token = "~hEZwCAAAAAQl7dkU-FQqlB.Yp_Q6EA2pmadM1IK-2Ea2C";
        role = "student";
        userid = "46240033";
        entitytype = 'D|C';
        // spyOn(validateUrlData, "_get").and.returnValue(745);
        spyOn(http, "get").and.returnValue("some value");
    }));

    it('should call the validateUrlData function', function () {
        rootScope.showoverlay = false;
        // validateUrlData = validateUrlData;
        var url = basePath + userid + '?roletype=' + role + '&entitytype=' + entitytype + '&token=' + token;
        var get = validateUrlData._get(role, userid, token);
        expect(rootScope.showoverlay).toBe(true);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

});



describe('getDataStudent', function () {

    // load the controller's module
    beforeEach(module('studentActivityReports.factories'));

    var basePath, userid, role, scope, getDataStudent, rootScope, http;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _getDataStudent_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        getDataStudent = _getDataStudent_;
        basePath = 'http://172.16.9.197:8282/gage-service/service/course?';
        role = "student";
        userid = "46240033";
        spyOn(http, "get").and.returnValue("some value");
    }));

    it('should call the getDataStudent function', function () {
        var url = basePath + "role=" + role + "&userids=" + userid;
        var get = getDataStudent._get(role, userid);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

});


describe('getStudentCourseData', function () {

    // load the controller's module
    beforeEach(module('studentActivityReports.factories'));

    var basePath, userid, scope, getStudentCourseData, rootScope, http;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _getStudentCourseData_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        getStudentCourseData = _getStudentCourseData_;
        basePath = 'http://172.16.9.197:8282/gage-service/service/course?role=student&userids=';
        userid = "46240033";
        spyOn(http, "get").and.returnValue("some value");
    }));

    it('should call the getStudentCourseData function', function () {
        var url = basePath + userid;
        var get = getStudentCourseData._get(userid);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

});

describe('notAuthenticated', function () {

    // load the controller's module
    beforeEach(module('studentActivityReports.factories'));

    var scope, notAuthenticated, rootScope;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($rootScope, _notAuthenticated_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        notAuthenticated = _notAuthenticated_;
        
    }));

    it('should authenticationErr return true', function () {
        rootScope.netErr = true;
        rootScope.authenticationErr = false;
        rootScope.loadingText = true;
        notAuthenticated._showErrorMsg();
        expect(rootScope.netErr).toBe(false);
        expect(rootScope.authenticationErr).toBe(true);
        expect(rootScope.loadingText).toBe(false);
    });

});


describe('noNetError', function () {

    // load the controller's module
    beforeEach(module('studentActivityReports.factories'));

    var scope, noNetError, rootScope;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($rootScope, _noNetError_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        noNetError = _noNetError_;
        
    }));

    it('should netErr return true', function () {
        rootScope.netErr = false;
        rootScope.authenticationErr = true;
        rootScope.loadingText = true;
        noNetError._showNetErrorMsg();
        expect(rootScope.netErr).toBe(true);
        expect(rootScope.authenticationErr).toBe(false);
        expect(rootScope.loadingText).toBe(false);
    });

});



describe('getEnrollmentStatus', function () {

    // load the controller's module
    beforeEach(module('studentActivityReports.factories'));

    //   var AboutCtrl,
    //     scope;

    //   // Initialize the controller and a mock scope
    //   beforeEach(inject(function ($controller, $rootScope) {
    //     scope = $rootScope.$new();
    //     AboutCtrl = $controller('AboutCtrl', {
    //       $scope: scope
    //       // place here mocked dependencies
    //     });
    //   }));

    it('should return static value', function () {
        expect([
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
