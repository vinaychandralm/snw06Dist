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
            return $controller('courseCompletionAdmin', {
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
     //   expect(scope.minimumMinut).toBe(false);
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

    it('It shuould call the loadData method with messageType: SUCCESS ', function () {
        var controller = createController();

        scope.multiselectModelEnrollment = [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }];
        spyOn(scope, 'setData').and.returnValue('Some text');
        spyOn(scope, 'getAllSchollDomainId').and.returnValue('Some text');
        spyOn(scope, 'getnSetSchoolStudent').and.returnValue('Some text');

        scope.loadData();
         
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
         
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getSchoolData._get).toHaveBeenCalled();
        expect(scope.setData).toHaveBeenCalled();
        expect(scope.getAllSchollDomainId).toHaveBeenCalled();
        expect(scope.getnSetSchoolStudent).toHaveBeenCalled();

    });

    it('It shuould call the loadData method with messageType: ERROR ', function () {
        var controller = createController();

        scope.multiselectModelEnrollment = [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }];
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        spyOn(scope, 'setDataoFStuds').and.returnValue('Some text');
        spyOn(scope, 'setDataoFSchoolStudsCourse').and.returnValue('Some text');

        scope.loadData();
         
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
         
         
        // We have to call apply for this to work
        scope.$apply();

        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
        expect(scope.setDataoFStuds).toHaveBeenCalled();
        expect(scope.setDataoFSchoolStudsCourse).toHaveBeenCalled();
        // expect(scope.getnSetSchoolStudent).toHaveBeenCalled();
        
    });

    it('It shuould call the loadData method for Netowrk or http error ', function () {
        var controller = createController();

        scope.multiselectModelEnrollment = [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }];
        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('Some text');

        scope.loadData();
       
        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        // We have to call apply for this to work
        scope.$apply();

        expect(noNetError._showNetErrorMsg).toHaveBeenCalled();

    });

    it('It shuould call the getnSetSchoolStudent method with success ', function () {
        var controller = createController();
        scope.multiselectModelEnrollment = [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }];

        scope.allSchoolIdArrays = ['12342', '12341', '12340'];
        //scope.allSchoolIdArrays = [{'id':'12342','name': 'dummydata1'},{'id':'12341','name': 'dummydata2'},{'id':'12340','name': 'dummydata3'}]
        scope.urlDetails = rootScope.winConfigObj;
        spyOn(scope, 'setDataoFStuds').and.returnValue('Some text');
        spyOn(scope, 'getAllSchollStudentCourseId').and.returnValue('Some text');
        spyOn(scope, 'getnSetSchoolStudentCourse').and.returnValue('Some text');

        scope.getnSetSchoolStudent(scope.allSchoolIdArrays, scope.urlDetails);
         
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
         
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getSchoolStudent._get).toHaveBeenCalled();
        expect(scope.setDataoFStuds).toHaveBeenCalled();
        expect(scope.getAllSchollStudentCourseId).toHaveBeenCalled();
        expect(scope.getnSetSchoolStudentCourse).toHaveBeenCalled();

    });
    it('It shuould call the getnSetSchoolStudent method with ERROR ', function () {
        var controller = createController();
        scope.multiselectModelEnrollment = [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }];

        scope.allSchoolIdArrays = ['12342', '12341', '12340'];
        //scope.allSchoolIdArrays = [{'id':'12342','name': 'dummydata1'},{'id':'12341','name': 'dummydata2'},{'id':'12340','name': 'dummydata3'}]
        scope.urlDetails = rootScope.winConfigObj;
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        spyOn(scope, 'setDataoFSchoolStudsCourse').and.returnValue('Some text');

        scope.getnSetSchoolStudent(scope.allSchoolIdArrays, scope.urlDetails);
         
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
         
         
        // We have to call apply for this to work
        scope.$apply();

        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
        expect(scope.setDataoFSchoolStudsCourse).toHaveBeenCalled();
    });
    it('It shuould call the getnSetSchoolStudent method for Netowrk or http error ', function () {
        var controller = createController();

        scope.multiselectModelEnrollment = [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }];
        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('Some text');

        scope.getnSetSchoolStudent();
       
        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        // We have to call apply for this to work
        scope.$apply();

        expect(noNetError._showNetErrorMsg).toHaveBeenCalled();

    });
    it('It shuould call the getnSetSchoolStudentCourse method with success ', function () {
        var controller = createController();


        scope.allSchoolStudentIdArrays = ['12342', '12341', '12340'];
        //scope.allSchoolStudentIdArrays = [{'id':'12342','name': 'dummydata1'},{'id':'12341','name': 'dummydata2'},{'id':'12340','name': 'dummydata3'}]
        scope.urlDetails = rootScope.winConfigObj;
        scope.getnSetSchoolStudentCourse(scope.allSchoolStudentIdArrays, scope.urlDetails);
        scope.multiselectModelEnrollment = [{ id: 1 }, { id: 2 }];
        spyOn(scope, 'setDataoFSchoolStudsCourse').and.returnValue('Some text');
        spyOn(scope, 'getAllSchollStudentCourseId').and.returnValue('Some text');
          
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
  
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getSchoolStudentCourse._get).toHaveBeenCalled();
        expect(scope.setDataoFSchoolStudsCourse).toHaveBeenCalled();


    });

    it('It shuould call the getnSetSchoolStudentCourse method with error ', function () {
        var controller = createController();


        scope.allSchoolStudentIdArrays = ['12342', '12341', '12340'];
        //scope.allSchoolStudentIdArrays = [{'id':'12342','name': 'dummydata1'},{'id':'12341','name': 'dummydata2'},{'id':'12340','name': 'dummydata3'}]
        scope.urlDetails = rootScope.winConfigObj;
        scope.getnSetSchoolStudentCourse(scope.allSchoolStudentIdArrays, scope.urlDetails);
        scope.multiselectModelEnrollment = [{ id: 1 }, { id: 2 }];
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        spyOn(scope, 'getAllSchollStudentCourseId').and.returnValue('Some text');
          
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
  
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getSchoolStudentCourse._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();


    });

    it('It shuould call the onErr function ', function () {
        var controller = createController();


        scope.allSchoolStudentIdArrays = ['12342', '12341', '12340'];
        //scope.allSchoolStudentIdArrays = [{'id':'12342','name': 'dummydata1'},{'id':'12341','name': 'dummydata2'},{'id':'12340','name': 'dummydata3'}]
        scope.urlDetails = rootScope.winConfigObj;
        scope.getnSetSchoolStudentCourse(scope.allSchoolStudentIdArrays, scope.urlDetails);
        scope.multiselectModelEnrollment = [{ id: 1 }, { id: 2 }];
        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('Some text');
        // spyOn(scope, 'getAllSchollStudentCourseId').and.returnValue('Some text');
          
        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
  
         
        // We have to call apply for this to work
        scope.$apply();

        expect(getSchoolStudentCourse._get).toHaveBeenCalled();
        expect(noNetError._showNetErrorMsg).toHaveBeenCalled();


    });

    it('It shuould return the array with proper value ', function () {
        var controller = createController();
        var dataresopnse = [{ id: 1 }, { id: 2 }];
        scope.allSchoolStudentIdArrays = [];
        // spyOn(scope, 'getAllSchollStudentCourseId').and.returnValue("some value");
        scope.getAllSchollStudentCourseId(dataresopnse);
        // expect(get).toEqual("some value");
        expect(scope.allSchoolStudentIdArrays).toEqual([1, 2]);

    });

    it('It shuould return the array with proper value ', function () {
        var controller = createController();
        var dataresopnse = [];
        scope.allSchoolStudentIdArrays = [];
        // spyOn(scope, 'getAllSchollStudentCourseId').and.returnValue("some value");
        scope.getAllSchollStudentCourseId(dataresopnse);
        // expect(get).toEqual("some value");
        expect(scope.allSchoolStudentIdArrays).toEqual([]);
    });

    describe('scope.OnChangeSchools', function () {

        it('It shuould call scope.setDataoFStuds and scope.setDataoFSchoolStudsCourse with tempArr ', function () {
            var controller = createController();
            scope.schoolListIds = [];
            var tempArr = [];
            spyOn(scope, 'setDataoFStuds').and.returnValue('Some text');
            spyOn(scope, 'setDataoFSchoolStudsCourse').and.returnValue('Some text');
            scope.OnChangeSchools();
            expect(scope.setDataoFStuds).toHaveBeenCalledWith(tempArr);
            expect(scope.setDataoFSchoolStudsCourse).toHaveBeenCalledWith(tempArr);
        });

        it('It shuould call scope.getnSetSchoolStudent with scope.schoolListIds and scope.urlDetails ', function () {
            var controller = createController();
            scope.schoolListIds = [{ id: 1 }, { id: 2 }];
            scope.urlDetails = rootScope.winConfigObj;
            spyOn(scope, 'getnSetSchoolStudent').and.returnValue('Some text');
            scope.OnChangeSchools();
            expect(scope.getnSetSchoolStudent).toHaveBeenCalledWith(scope.schoolListIds, scope.urlDetails);
        });

    });

    describe('scope.OnChangeStudent', function () {

        it('It shuould call scope.setDataoFStuds and scope.setDataoFSchoolStudsCourse with tempArr ', function () {
            var controller = createController();
            scope.studentListIds = [];
            spyOn(scope, 'setDataoFSchoolStudsCourse').and.returnValue('some value');
            scope.OnChangeStudent();
            expect(scope.setDataoFSchoolStudsCourse).toHaveBeenCalledWith([]);
        });

        it('It shuould call scope.setDataoFStuds and scope.setDataoFSchoolStudsCourse with tempArr ', function () {
            var controller = createController();
            scope.studentListIds = [{ id: 1 }, { id: 2 }];
            scope.urlDetails = rootScope.winConfigObj;
            spyOn(scope, 'getnSetSchoolStudentCourse').and.returnValue('Some text');
            scope.OnChangeStudent();
            expect(scope.getnSetSchoolStudentCourse).toHaveBeenCalledWith(scope.studentListIds, scope.urlDetails);
        });

    });

    describe('scope.isInt', function () {

        it('It shuould return true because passed value is int', function () {
            var controller = createController();
            var x = scope.isInt(5);
            expect(x).toBe(true);
        });

        it('It shuould return false because passed value is float ', function () {
            var controller = createController();
            var x = scope.isInt(5.5);
            expect(x).toBe(false);
        });

    });

    describe('scope.submit', function () {
        var startDateActivity, endDateActivity;

        it('scope.srtDateNotSelected should be false', function () {
            var controller = createController();
            scope.startDateStartActivity = '03-01-2014';
            scope.submit();
            expect(scope.srtDateNotSelected).toBe(false);

        });

        it('scope.srtDateNotSelected should be true ', function () {
            var controller = createController();
            scope.startDateStartActivity = null;
            scope.submit();
            expect(scope.srtDateNotSelected).toBe(true);
        });

        it('scope.srtDateNotSelected should be true when startDateActivity > endDateActivity || $scope.startDateEndActivity == null ', function () {
            var controller = createController();
            scope.startDateEndActivity = null;
            startDateActivity = 1;
            endDateActivity = 0;
            scope.submit();
            expect(scope.endDateNotgreater).toBe(true);
        });

        it('scope.srtDateNotSelected should be false when startDateActivity < endDateActivity || $scope.startDateEndActivity == !null ', function () {
            var controller = createController();
            scope.startDateEndActivity = '03-01-2014';
            startDateActivity = 0;
            endDateActivity = 1;
            scope.submit();
            expect(scope.endDateNotgreater).toBe(false);
        });


        it('scope.schoolNotSelected should be true when scope.schoolListIds.length === 0', function () {
            var controller = createController();
            scope.schoolListIds = [];
            scope.submit();
            expect(scope.schoolNotSelected).toBe(true);
        });

        it('scope.schoolNotSelected should be false when scope.schoolListIds.length !== 0', function () {
            var controller = createController();
            scope.schoolListIds = [1, 2];
            scope.submit();
            expect(scope.schoolNotSelected).toBe(false);
        });

        it('scope.studentNotSelected should be true when scope.studentListIds.length === 0', function () {
            var controller = createController();
            scope.studentListIds = [];
            scope.submit();
            expect(scope.studentNotSelected).toBe(true);
        });

        it('scope.studentNotSelected should be false when scope.studentListIds.length !== 0', function () {
            var controller = createController();
            scope.studentListIds = [1, 2];
            scope.submit();
            expect(scope.studentNotSelected).toBe(false);
        });

        it('scope.courseNotSelected should be true when scope.studentCourseListIds.length === 0', function () {
            var controller = createController();
            scope.studentCourseListIds = [];
            scope.submit();
            expect(scope.courseNotSelected).toBe(true);
        });

        it('scope.courseNotSelected should be false when scope.studentCourseListIds.length !== 0', function () {
            var controller = createController();
            scope.studentCourseListIds = [1, 2];
            scope.submit();
            expect(scope.courseNotSelected).toBe(false);
        });

        it('scope.statusNotSelected should be true when scope.enrollArr.length === 0 ', function () {
            var controller = createController();
            scope.enrollArr = [];
            scope.submit();
            expect(scope.statusNotSelected).toBe(true);
        });

        it('scope.statusNotSelected should be false when scope.enrollArr.length !== 0', function () {
            var controller = createController();
            scope.enrollArr = [1, 2];
            scope.submit();
            expect(scope.statusNotSelected).toBe(false);
        });

        it('scope.minimumMinut should be true when $scope.inputAdmin === undefined || $scope.inputAdmin === null || $scope.inputAdmin < 0 || !$scope.isInt($scope.inputAdmin)', function () {
            var controller = createController();
            scope.inputAdmin = null;
            // scope.isInt = 'false';
            scope.submit();
            expect(scope.minimumMinut).toBe(true);
        });
        
        // it('scope.minimumMinut should be false when $scope.inputAdmin !== undefined || $scope.inputAdmin !== null || $scope.inputAdmin > 0 || $scope.isInt($scope.inputAdmin)', function () {
        //     var controller = createController();
        //     // scope.inputAdmin = 1;
        //     // scope.isInt = true;
        //     scope.submit();
        //     expect(scope.minimumMinut).toBe(false);
        // });
        
    });

    describe('scope.searchAgain', function () {

        it('scope.isShowReportView should be false', function () {
            var controller = createController();
            scope.searchAgain();
            expect(scope.isShowReportView).toBe(false);
        });
    });


    describe('scope.backAdmin', function () {

        it('should return launch page url', function () {
            var controller = createController();
            $location.path('/');
            scope.backAdmin();
            expect($location.path()).toBe('/');
        });
    });

    describe('testing watch - scope._multiselectModelAdminCourse_', function () {

        it('should return schoolListIds with the id values of scope.multiselectModelAdminCourse object', function () {
            var controller = createController();

            scope.schoolListIds = [];
            scope.multiselectModelAdminCourse = [{ id: 1 }, { id: 2 }, { id: 3 }];
            spyOn(scope, 'OnChangeSchools').and.returnValue('some value');
            scope._multiselectModelAdminCourse_();
            expect(scope.schoolListIds).toEqual([1, 2, 3]);
            $timeout(function () {
                scope.OnChangeSchools();
            }, 900);
            expect(scope.OnChangeSchools).not.toHaveBeenCalled();
            $timeout.flush(1000);
            expect(scope.OnChangeSchools).toHaveBeenCalled();
        });

        it('should return schoolListIds with the empty value when scope.multiselectModelAdminCourse object is undefined', function () {
            var controller = createController();
            scope.schoolListIds = [];
            scope.multiselectModelAdminCourse = undefined;
            scope._multiselectModelAdminCourse_();
            expect(scope.schoolListIds).toEqual([]);
        });

        it('should call scope.$watch(multiselectModelAdminCourse) with parameters', function () {
            var controller = createController();
            expect(scope.$watch).toHaveBeenCalledWith('multiselectModelAdminCourse', scope._multiselectModelAdminCourse_, true);
        });
    });

    describe('testing-scope.$watch multiselectModelAdminStudent', function () {

        it('should return studentListIds with the id values of scope.multiselectModelAdminStudent object', function () {
            var controller = createController();
            scope.studentListIds = [];
            scope.multiselectModelAdminStudent = [{ id: 1 }, { id: 2 }, { id: 3 }];
            spyOn(scope, 'OnChangeStudent').and.returnValue('some value');
            scope._multiselectModelAdminStudent_();
            expect(scope.studentListIds).toEqual([1, 2, 3]);
            expect(scope.OnChangeStudent).toHaveBeenCalled();
        });

        it('should call scope.$watch(multiselectModelAdminStudent) with parameters', function () {
            var controller = createController();
            expect(scope.$watch).toHaveBeenCalledWith('multiselectModelAdminStudent', scope._multiselectModelAdminStudent_, true);
        });
    });

    describe('testing-scope.$watch multiselectModelAdminStudentCourse', function () {

        it('should return studentListIds with the id values of scope.multiselectModelAdminStudent object', function () {
            var controller = createController();
            scope.studentCourseListIds = [];
            scope.multiselectModelAdminStudentCourse = [{ id: 1 }, { id: 2 }, { id: 3 }];
            // spyOn(scope, 'OnChangeStudent').and.returnValue('some value');
            scope._multiselectModelAdminStudentCourse_();
            expect(scope.studentCourseListIds).toEqual([1, 2, 3]);
            // expect(scope.OnChangeStudent).toHaveBeenCalled();
        });

        it('should call scope.$watch(multiselectModelAdminStudentCourse) with parameters', function () {
            var controller = createController();
            expect(scope.$watch).toHaveBeenCalledWith('multiselectModelAdminStudentCourse', scope._multiselectModelAdminStudentCourse_, true);
        });
    });

    describe('testing-scope.$watch multiselectModelEnrollment', function () {

        it('should return studentListIds with the id values of scope.multiselectModelAdminStudent object', function () {
            var controller = createController();
            scope.enrollArr = [];
            scope.multiselectModelEnrollment = [{ id: 1 }, { id: 2 }, { id: 3 }];
            scope._multiselectModelEnrollment_();
            expect(scope.enrollArr).toEqual([1, 2, 3]);
        });

        it('should call scope.$watch(multiselectModelEnrollment) with parameters', function () {
            var controller = createController();
            expect(scope.$watch).toHaveBeenCalledWith('multiselectModelEnrollment', scope._multiselectModelEnrollment_, true);
        });
    });

    describe('testing-scope.$watch multiselectModelEnrollment', function () {

        it('should return studentListIds with the id values of scope.multiselectModelAdminStudent object', function () {
            createController();
            var isDataValidate = 'abcd';
            spyOn(showReport, 'loadOnIFrame').and.returnValue('some value');
            scope.showAdminReport(isDataValidate);
            expect(showReport.loadOnIFrame).toHaveBeenCalledWith(scope);
        });

    });
});
