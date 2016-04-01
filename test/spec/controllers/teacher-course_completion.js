'use strict';


describe('Teacher Ctrl', function () {
    var scope, $location, createController, rootScope, notAuthenticated;
    var $q, noNetError, getServerConfigData, routeParams;
    var deferred, getDataStudentTeacher, getDataCourseTeacher, getEnrollmentStatus;
    
    
    //    $scope, $rootScope, $location, $routeParams, getDataCourseTeacher, getEnrollmentStatus, getDataStudentTeacher, notAuthenticated, noNetError, getServerConfigData
    
    beforeEach(module('studentActivityReports'));
    beforeEach(module('teacherActivityReports.teacherCourseComp'));
    beforeEach(inject(function ($rootScope, $controller, _$location_, _$routeParams_, _$q_,
        _notAuthenticated_, _noNetError_, _getServerConfigData_, _getDataCourseTeacher_,
        _getEnrollmentStatus_, _getDataStudentTeacher_) {
        $location = _$location_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        $q = _$q_;
        notAuthenticated = _notAuthenticated_;
        noNetError = _noNetError_;
        getServerConfigData = _getServerConfigData_;
        routeParams = _$routeParams_;
        getDataStudentTeacher = _getDataStudentTeacher_;
        getDataCourseTeacher = _getDataCourseTeacher_;
        getEnrollmentStatus = _getEnrollmentStatus_;

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
        
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(getDataCourseTeacher, '_get').and.returnValue(deferred.promise);

        spyOn(getDataStudentTeacher, '_get').and.returnValue(deferred.promise);

        scope.$watch = jasmine.createSpy('$watch');

        createController = function () {
            return $controller('teacherCourseCompletionCtrl', {
                $scope: scope,
                getDataStudentTeacher: getDataStudentTeacher,
                getDataCourseTeacher: getDataCourseTeacher
            });
        };
    }));

    it('It shuould initialize the variables', function () {
        var controller = createController();
        
        // deferred.resolve({ "servicesBaseUrl" : 'http://172.16.9.197:8282/gage-service/service/'});
        // We have to call apply for this to work
        //  scope.$apply(); 
        
        rootScope.userid = routeParams.userid = '46240033';
        rootScope.token = routeParams.token = '~hEZwCAAAAAw5SzN-PdQG_A.tyyCMyTG97kTflUrMDjNKB';
        rootScope.role = routeParams.role = 'student';
        routeParams.teacherId = '46240033';
        rootScope.isblue = false;
        scope.statusNotSelected = false;
        scope.courseNotSelected = false;
        scope.studentNotSelected = false;
        scope.srtDateNotSelected = false;
        scope.endDateNotgreater = false;
        scope.minimumMinut = false;
        scope.inputTeacher = 0;


        scope.init();
       
        // expect(getServerConfigData._getDetails).toHaveBeenCalled();

        expect(scope.teacherId).toEqual('46240033');
        expect(rootScope.isblue).toBe(false);
        expect(scope.statusNotSelected).toBe(false);
        expect(scope.courseNotSelected).toBe(false);
        expect(scope.studentNotSelected).toBe(false);
        expect(scope.srtDateNotSelected).toBe(false);
        expect(scope.endDateNotgreater).toBe(false);
        expect(scope.minimumMinut).toBe(false);

        expect(scope.inputTeacher).toEqual(0);

    });

    it('should store studentCourse data to studentArr scope variable', function () {
        var controller = createController();
        scope.role = 'teacher';
        var studentCourse = ['active', 'withdrawn'];
        scope.setDataStudent(studentCourse);
        expect(scope.studentArr).toEqual(['active', 'withdrawn']);
    });


    it('It shuould resolv promis object of validate data and loadData function', function () {
        var controller = createController();
        scope.role = 'teacher';
        spyOn(scope, 'setDataCourseTeacher').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
        
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataCourseTeacher._get).toHaveBeenCalled();
        expect(scope.setDataCourseTeacher).toHaveBeenCalled();

    });
    it('getDataStudentTeacher and loadData function in Status 200', function () {
        var controller = createController();

        scope.role = 'teacher';
        var courseIdArr = [{ id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }];
        // scope.courseArr=[{ id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }];
        scope.getDataOFStudent(courseIdArr);
        spyOn(scope, 'setDataStudent').and.returnValue('Some text');
        spyOn(scope, 'setDataCourseTeacher').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
        //         // We have to call apply for this to work
        //        scope.$apply();   
        
        // scope.setDataOFStudent();
        scope.$apply();


        expect(getDataStudentTeacher._get).toHaveBeenCalled();
        expect(scope.setDataStudent).toHaveBeenCalled();

    });
    it('It shuould resolv promis object of validate data and loadData function', function () {
        var controller = createController();
        scope.role = 'teacher';
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
        
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataCourseTeacher._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();

    });


    it('getDataStudentTeacher and loadData function in Status 200', function () {
        var controller = createController();

        scope.role = 'teacher';
        var courseIdArr = [{ id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }];
        // scope.courseArr=[{ id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }];
        scope.getDataOFStudent(courseIdArr);
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        // spyOn(getDataStudentTeacher, '_get').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
        
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataStudentTeacher._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
    });
    it('It shuould getDataCourseTeacher and loadData function with Error Response in Status 200', function () {
        var controller = createController();
        scope.role = 'teacher';
        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataCourseTeacher._get).toHaveBeenCalled();
        expect(noNetError._showErrorMsg).toBe(undefined);

    });

    it('It shuould getDataStudentTeacher with Error Response in Status 500', function () {
        var controller = createController();
        scope.role = 'teacher';
        var courseIdArr = [{ id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }];
        // scope.courseArr=[{ id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }];
        scope.getDataOFStudent(courseIdArr);
        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataStudentTeacher._get).toHaveBeenCalled();
        expect(noNetError._showErrorMsg).toBe(undefined);

    });

    it('It shuould setDataCourseTeacher and loadData function with s', function () {
        var controller = createController();
        scope.role = 'teacher';
        spyOn(scope, 'getDataOFStudent').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        //deferred.reject();
        var teacherId = { data: { course: [{ id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }] } };
        scope.setDataCourseTeacher(teacherId);

        expect(scope.courseArr).toEqual(teacherId.data.course);
           
        //expect(getDataCourseTeacher._get).toHaveBeenCalled();
        expect(scope.getDataOFStudent).toHaveBeenCalled();

    });


    it('It shuould call Submit success ', function () {
        var controller = createController();

        var currDate = new Date();
        scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
        scope.startDateEndActivity = new Date();
        scope.enrollArr = [1, 2];
        scope.courseIdArr = [1, 2];
        scope.courseStudentIdArr = [1, 2];
        scope.inputTeacher = 2;

        scope.submit();
        expect(scope.isShowReportView).toEqual(true);

    });
    it('It shuould call Submit Fail ', function () {
        var controller = createController();

        var currDate = new Date();
        scope.startDateStartActivity = null;

        scope.startDateEndActivity = currDate.setDate(currDate.getDate() - 7);
        scope.enrollArr = [];
        scope.courseIdArr = [];
        scope.courseStudentIdArr = [];
        scope.inputTeacher = -1;

        scope.submit();
        expect(scope.isShowReportView).toEqual(false);

    });

    it('It shuould set endDateNotgreater to true ', function () {
        var controller = createController();

        var currDate = new Date();
        scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
        scope.startDateEndActivity = currDate.setDate(currDate.getDate() - 8);
        scope.submit();

        expect(scope.endDateNotgreater).toEqual(true);

    });

    // it('It shuould call date update ', function () {
    //     var controller = createController();
    //     var currDate = new Date();
    //     scope.dateUpdate();
    //     expect(scope.startDateStartActivity).toEqual(currDate.setDate(currDate.getDate() - 365));
    //     expect(scope.maxDateStartActivity).toEqual(new Date().setDate(new Date().getDate() - 1));
    //     expect(scope.startDateEndActivity).toEqual(new Date());

    // });

    it('backTeacher', function () {
        var controller = createController();

        scope.backTeacher();

        rootScope.$apply();
        expect($location.path()).toBe('/');


    });
    it('Search Agian    ', function () {
        var controller = createController();

        scope.searchAgain();


        expect(scope.isShowReportView).toEqual(false);


    });

    it('testing watch function for _multiselectModel_', function () {
        var controller = createController();

        expect(scope.$watch).toHaveBeenCalledWith('multiselectModel', scope._multiselectModel_, true);

    });

    it('should return the array of values', function () {
        var controller = createController();
        spyOn(scope, 'onChangeCourseSelect').and.returnValue("some value");

        scope.courseIdArr = [];
        scope.multiselectModel = [{ id: 1 }, { id: 2 }];
        scope._multiselectModel_();
        expect(scope.courseIdArr).toEqual([1, 2]);
        var get = scope.onChangeCourseSelect(scope.courseIdArr);
        expect(scope.onChangeCourseSelect).toHaveBeenCalledWith(scope.courseIdArr);
        expect(get).toEqual("some value");
    });

    it('testing watch function for _multiselectModel2_', function () {
        var controller = createController();

        expect(scope.$watch).toHaveBeenCalledWith('multiselectModel2', scope._multiselectModel2_, true);

    });

    it('should return the array of values', function () {
        var controller = createController();


        scope.courseStudentIdArr = [];
        scope.multiselectModel2 = [{ id: 1 }, { id: 2 }];
        scope._multiselectModel2_();
        expect(scope.courseStudentIdArr).toEqual([1, 2]);
    });

    it('testing watch function for _multiselectModelEroll_', function () {
        var controller = createController();

        expect(scope.$watch).toHaveBeenCalledWith('multiselectModelEroll', scope._multiselectModelEroll_, true);

    });

    it('should return the array of values', function () {
        var controller = createController();


        scope.enrollArr = [];
        scope.multiselectModelEroll = [{ id: 1 }, { id: 2 }];
        scope._multiselectModelEroll_();
        expect(scope.enrollArr).toEqual([1, 2]);
    });

    it('testing watch function for _selectedDate_', function () {
        var controller = createController();

        expect(scope.$watch).toHaveBeenCalledWith('selectedDate', scope._selectedDate_, true);

    });

    it('should call the function', function () {
        var controller = createController();

        scope._selectedDate_();

    });

    it('It shuould call $scope.setDataStudent inside if part ', function () {
        var controller = createController();
        var courseIdArr = [];
        spyOn(scope, 'setDataStudent').and.returnValue('Some text');
        scope.onChangeCourseSelect(courseIdArr);
        expect(scope.setDataStudent).toHaveBeenCalled();
    });

    it('It shuould call getDataStudentTeacher._get and $scope.setDataStudent', function () {
        var controller = createController();
        scope.role = 'teacher';
        var courseIdArr = [{ id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }];
        // scope.courseArr=[{ id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }];
        scope.onChangeCourseSelect(courseIdArr);
        spyOn(scope, 'setDataStudent').and.returnValue('Some text');
        spyOn(scope, 'setDataCourseTeacher').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
        //         // We have to call apply for this to work
        //        scope.$apply();   
        
        // scope.setDataOFStudent();
        scope.$apply();


        expect(getDataStudentTeacher._get).toHaveBeenCalled();
        expect(scope.setDataStudent).toHaveBeenCalled();

    });

    it('It shuould call getDataStudentTeacher._get and notAuthenticated._showErrorMsg', function () {
        var controller = createController();

        scope.role = 'teacher';
        var courseIdArr = [{ id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }];
        // scope.courseArr=[{ id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }];
        scope.onChangeCourseSelect(courseIdArr);
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        // spyOn(getDataStudentTeacher, '_get').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
        
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataStudentTeacher._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();

    });

    it('It shuould getDataStudentTeacher with Error Response in Status 500', function () {
        var controller = createController();
        scope.role = 'teacher';
        var courseIdArr = [{ id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }];
        // scope.courseArr=[{ id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }];
        scope.onChangeCourseSelect(courseIdArr);
        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('Some text');
        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        // We have to call apply for this to work
        scope.$apply();

        expect(getDataStudentTeacher._get).toHaveBeenCalled();
        expect(noNetError._showErrorMsg).toBe(undefined);

    });

});

    