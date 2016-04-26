'use strict';

describe('studentDetailsCtrl', function () {
    var scope, $location, createController, rootScope, getEnrollmentStatus, $q, deferred, getDataStudent, routeParams, notAuthenticated;

    beforeEach(module('studentActivityReports'))
    beforeEach(module('studentActivityReportsAdmin.factories'));
    beforeEach(module('studentActivityReports.studentDetails'));
    beforeEach(inject(function ($rootScope, $controller, _$location_, _getEnrollmentStatus_, _$routeParams_, _$q_, _getDataStudent_, _notAuthenticated_) {
        // $location = _$location_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        $location = _$location_;
        getEnrollmentStatus = _getEnrollmentStatus_;
        $q = _$q_;
        getDataStudent = _getDataStudent_;
        routeParams = _$routeParams_;
        deferred = _$q_.defer();
        notAuthenticated = _notAuthenticated_;
        
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

        // spyOn(getDataStudent, '_get').and.returnValue(deferred.promise);
        spyOn(getDataStudent, '_get').and.returnValue(deferred.promise);
        // spyOn(scope, 'getDateAsString').and.returnValue('some value');
        scope.$watch = jasmine.createSpy('$watch');
        // dateObj=new Date();


        createController = function () {
            return $controller('studentDetailsCtrl', {
                $scope: scope,
                getDataStudent: getDataStudent,
                $location: $location
            });
        };
    }));

    // spyOn(getEnrollmentStatus, "get").and.returnValue("some value");

    it('checking init', function () {
        var controller = createController();

        rootScope.userid = routeParams.userid = '46240033';
        rootScope.token = routeParams.token = '~hEZwCAAAAAw5SzN-PdQG_A.tyyCMyTG97kTflUrMDjNKB';
        rootScope.role = routeParams.role = 'student';

        scope.init();

        expect(scope.details).toEqual({});
        expect(rootScope.isblue).toBe(false);
        expect(scope.courseNotSelected).toBe(false);
        expect(scope.enrllNotSelected).toBe(false);
        expect(scope.srtDateNotSelected).toBe(false);
        expect(scope.endDateNotSelected).toBe(false);
        expect(scope.isShowReportView).toBe(false);
        expect(scope.courseIdArr).toEqual([]);
        expect(scope.enrollArr).toEqual([]);
        expect(scope.searchagain).toEqual("displaynonecls");
        expect(scope.iframe_row).toEqual("displaynonecls");
    });

    it('It shuould resolve promise object of validate data and loadData function', function () {
        var controller = createController();

        var dateObj = new Date();
    });

    it('It shuould resolve promise object of validate data and loadData function', function () {
        var controller = createController();

        scope.role = 'student';

        spyOn(scope, 'setData').and.returnValue("some value");
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
        
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataStudent._get).toHaveBeenCalled();
        expect(scope.setData).toHaveBeenCalled();
    });

    it('It shuould resolve promise object of validate data and loadData function', function () {
        var controller = createController();

        scope.role = 'student';

        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
        
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataStudent._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
    });
    
    it('It shuould call the loadData method for Netowrk or http error ', function () {
        var controller = createController();

        scope.multiselectModelEnrollment = [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }];
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');

        scope.getStudentData();
       
        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        // We have to call apply for this to work
        scope.$apply();

        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();

    });

    it('It shuould return the courseArray in $scope.courseArr var', function () {
        var controller = createController();
        scope.courseArr = [];
        var studentCourse = { data: { course: "some course" } };
        scope.setData(studentCourse);
        expect(scope.courseArr).toEqual("some course");
    });

    it('should have proper variable to be return proper value', function () {
        var controller = createController();
        var startDateActivity, endDateActivity;

        scope.startDateStartActivity = null;
        scope.submitStudentInfo();
        expect(scope.srtDateNotSelected).toBe(true);

        scope.startDateStartActivity = 'some value';
        scope.submitStudentInfo();
        expect(scope.srtDateNotSelected).toBe(false);

        startDateActivity = 1;
        endDateActivity = 0;
        scope.startDateEndActivity = null;
        scope.submitStudentInfo();
        expect(scope.endDateNotSelected).toBe(true);

        startDateActivity = 0;
        endDateActivity = 1;
        scope.startDateEndActivity = 'some value';
        scope.submitStudentInfo();
        expect(scope.endDateNotSelected).toBe(false);

        scope.courseIdArr = [];
        scope.submitStudentInfo();
        expect(scope.courseNotSelected).toBe(true);

        scope.courseIdArr = [1, 2];
        scope.submitStudentInfo();
        expect(scope.courseNotSelected).toBe(false);

        scope.enrollArr = [];
        scope.submitStudentInfo();
        expect(scope.enrllNotSelected).toBe(true);

        scope.enrollArr = [1, 2];
        scope.submitStudentInfo();
        expect(scope.enrllNotSelected).toBe(false);

        expect(scope.isShowReportView).toBe(true);
    });

    it('should return launch page url', function () {
        var controller = createController();

        $location.path('/');
        scope.backStudent();
        expect($location.path()).toBe('/');
    });

    it('testing watch function for multiselectModelcourse', function () {
        var controller = createController();

        expect(scope.$watch).toHaveBeenCalledWith('multiselectModelcourse', scope._multiselectModelcourse_, true);

    });

    it('should return the array of values', function () {
        var controller = createController();

        scope.courseIdArr = [];
        scope.multiselectModelcourse = [{ id: 1 }, { id: 2 }];
        scope._multiselectModelcourse_();
        expect(scope.courseIdArr).toEqual([1, 2]);
    });

    it('testing watch function for multiselectModelenrollment', function () {
        var controller = createController();

        expect(scope.$watch).toHaveBeenCalledWith('multiselectModelenrollment', scope._multiselectModelenrollment_, true);

    });

    it('should return the array of values', function () {
        var controller = createController();

        scope.enrollArr = [];
        scope.multiselectModelenrollment = [{ id: 1 }, { id: 2 }];
        scope._multiselectModelenrollment_();
        expect(scope.enrollArr).toEqual([1, 2]);
    });

    it('isShowReportView should be false', function () {
        var controller = createController();

        scope.searchAgain();
        expect(scope.isShowReportView).toBe(false);
    });


});


