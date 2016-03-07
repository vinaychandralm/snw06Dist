'use strict';

describe('Admin Ctrl', function () {
    var scope, createController, rootScope;
    var $q,noNetError,notAuthenticated,noNetError;
    var deferred,getSchoolData,getSchoolStudent,getSchoolStudentCourse;
    var getEnrollmentStatus;
    //    
    //    
    //    var getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse,routeParams;
    
    beforeEach(module('studentActivityReports'));
    beforeEach(module('studentActivityReports.adminDetails'));
    beforeEach(inject(function ($rootScope, $controller,_notAuthenticated_,_noNetError_,_getSchoolData_,_$q_,_getEnrollmentStatus_,_getSchoolStudent_,_getSchoolStudentCourse_) {
        //        $location = _$location_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        getEnrollmentStatus:_getEnrollmentStatus_,
        notAuthenticated = _notAuthenticated_;
        noNetError = _noNetError_
        getSchoolData = _getSchoolData_;
        getSchoolStudent = _getSchoolStudent_,
        getSchoolStudentCourse=_getSchoolStudentCourse_;
         $q = _$q_;
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
        
        spyOn(getSchoolStudent,'_get').and.returnValue(deferred.promise);
        
        spyOn(getSchoolStudentCourse,'_get').and.returnValue(deferred.promise);
        
        //        spyOn(getDataStudentTeacher,'_get').and.returnValue(deferred.promise);
        
        createController = function () {
            return $controller('adminctrl', {
                $rootScope: rootScope,
                $scope: scope,
                notAuthenticated:notAuthenticated,
                noNetError:noNetError,
                getSchoolData:getSchoolData,
                getEnrollmentStatus:_getEnrollmentStatus_,
                getSchoolStudent:getSchoolStudent,
                getSchoolStudentCourse:getSchoolStudentCourse
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
    
    it('It shuould call the loadData method with messageType: SUCCESS ', function () {
        var controller = createController();
        
        scope.multiselectModelEnrollment = [{'id':'12342'},{'id':'12341'},{'id':'12340'}];
        spyOn(scope, 'setData').and.returnValue('Some text');
        spyOn(scope, 'getAllSchollDomainId').and.returnValue('Some text');
        spyOn(scope, 'getnSetSchoolStudent').and.returnValue('Some text');
          
        scope.loadData();
         
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains':[{'id':'12342'},{'id':'12341'},{'id':'12340'}] ,'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
         
         
         // We have to call apply for this to work
        scope.$apply();
        
        expect(getSchoolData._get).toHaveBeenCalled();
        expect(scope.setData).toHaveBeenCalled();
        expect(scope.getAllSchollDomainId).toHaveBeenCalled();
        expect(scope.getnSetSchoolStudent).toHaveBeenCalled();
        
    });
    
    it('It shuould call the loadData method with messageType: ERROR ', function () {
        var controller = createController();
        
        scope.multiselectModelEnrollment = [{'id':'12342'},{'id':'12341'},{'id':'12340'}];
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        spyOn(scope, 'setDataoFStuds').and.returnValue('Some text');
        spyOn(scope, 'setDataoFSchoolStudsCourse').and.returnValue('Some text');
          
        scope.loadData();
         
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains':[{'id':'12342'},{'id':'12341'},{'id':'12340'}] ,'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
         
         
         // We have to call apply for this to work
        scope.$apply();
        
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
        expect(scope.setDataoFStuds).toHaveBeenCalled();
        expect(scope.setDataoFSchoolStudsCourse).toHaveBeenCalled();
       // expect(scope.getnSetSchoolStudent).toHaveBeenCalled();
        
    });
    
    it('It shuould call the loadData method for Netowrk or http error ', function () {
        var controller = createController();
        
        scope.multiselectModelEnrollment = [{'id':'12342'},{'id':'12341'},{'id':'12340'}];
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
        scope.multiselectModelEnrollment = [{'id':'12342'},{'id':'12341'},{'id':'12340'}];
        
        scope.allSchoolIdArrays = ['12342','12341','12340'];
        //scope.allSchoolIdArrays = [{'id':'12342','name': 'dummydata1'},{'id':'12341','name': 'dummydata2'},{'id':'12340','name': 'dummydata3'}]
        scope.urlDetails = rootScope.winConfigObj;
        spyOn(scope,'setDataoFStuds').and.returnValue('Some text');
        spyOn(scope,'getAllSchollStudentCourseId').and.returnValue('Some text');
        spyOn(scope,'getnSetSchoolStudentCourse').and.returnValue('Some text');
          
        scope.getnSetSchoolStudent(scope.allSchoolIdArrays,scope.urlDetails);
         
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains':[{'id':'12342'},{'id':'12341'},{'id':'12340'}] ,'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
         
         
         // We have to call apply for this to work
        scope.$apply();
        
        expect(getSchoolStudent._get).toHaveBeenCalled();
        expect(scope.setDataoFStuds).toHaveBeenCalled();
        expect(scope.getAllSchollStudentCourseId).toHaveBeenCalled();
        expect(scope.getnSetSchoolStudentCourse).toHaveBeenCalled();
        
    });
    it('It shuould call the getnSetSchoolStudent method with ERROR ', function () {
         var controller = createController();
        scope.multiselectModelEnrollment = [{'id':'12342'},{'id':'12341'},{'id':'12340'}];
        
        scope.allSchoolIdArrays = ['12342','12341','12340'];
        //scope.allSchoolIdArrays = [{'id':'12342','name': 'dummydata1'},{'id':'12341','name': 'dummydata2'},{'id':'12340','name': 'dummydata3'}]
        scope.urlDetails = rootScope.winConfigObj;
        spyOn(notAuthenticated,'_showErrorMsg').and.returnValue('Some text');
        spyOn(scope,'setDataoFSchoolStudsCourse').and.returnValue('Some text');
          
        scope.getnSetSchoolStudent(scope.allSchoolIdArrays,scope.urlDetails);
         
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains':[{'id':'12342'},{'id':'12341'},{'id':'12340'}] ,'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
         
         
         // We have to call apply for this to work
        scope.$apply();
        
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
        expect(scope.setDataoFSchoolStudsCourse).toHaveBeenCalled();
    });
    it('It shuould call the getnSetSchoolStudent method for Netowrk or http error ', function () {
        var controller = createController();
        
        scope.multiselectModelEnrollment = [{'id':'12342'},{'id':'12341'},{'id':'12340'}];
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
        
        
        scope.allSchoolStudentIdArrays = ['12342','12341','12340'];
        //scope.allSchoolStudentIdArrays = [{'id':'12342','name': 'dummydata1'},{'id':'12341','name': 'dummydata2'},{'id':'12340','name': 'dummydata3'}]
        scope.urlDetails = rootScope.winConfigObj;
        spyOn(scope,'setDataoFSchoolStudsCourse').and.returnValue('Some text');
        scope.getnSetSchoolStudentCourse(scope.allSchoolStudentIdArrays,scope.urlDetails);
          
           // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains':[{'id':'12342'},{'id':'12341'},{'id':'12340'}] ,'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
 
         // We have to call apply for this to work
        scope.$apply();
        
        expect(getSchoolStudentCourse._get).toHaveBeenCalled();
        expect(scope.setDataoFSchoolStudsCourse).toHaveBeenCalled();
      
        
    });


});
