'use strict';


describe('Teacher Ctrl', function() {
    var scope, $location, createController,rootScope,notAuthenticated;
    var $q,noNetError,getServerConfigData,routeParams;
    var deferred,getDataStudentTeacher,getDataCourseTeacher,getEnrollmentStatus;
    
    
//    $scope, $rootScope, $location, $routeParams, getDataCourseTeacher, getEnrollmentStatus, getDataStudentTeacher, notAuthenticated, noNetError, getServerConfigData
    
    beforeEach(module('studentActivityReports'));
    beforeEach(module('teacherActivityReports.teacherDetails'));
    beforeEach(inject(function ($rootScope, $controller, _$location_,_$routeParams_, _$q_,
                        _notAuthenticated_, _noNetError_, _getServerConfigData_,_getDataCourseTeacher_,
                                _getEnrollmentStatus_,_getDataStudentTeacher_){
        $location = _$location_;
        rootScope=$rootScope;
        scope = $rootScope.$new();
        $q = _$q_;
        notAuthenticated=_notAuthenticated_;
        noNetError=_noNetError_;
        getServerConfigData=_getServerConfigData_;
        routeParams =_$routeParams_;
        getDataStudentTeacher=_getDataStudentTeacher_;
        getDataCourseTeacher =_getDataCourseTeacher_;
        getEnrollmentStatus=_getEnrollmentStatus_;
        
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(getDataCourseTeacher, '_get').and.returnValue(deferred.promise);
        
        
        createController = function() {
            return $controller('teacherDetailsCtrl', {
                $scope: scope,
                getDataStudentTeacher: getDataStudentTeacher,
                getDataCourseTeacher: getDataCourseTeacher
            });
        };
    }));

    it('It shuould initialize the variables', function() {
        var controller = createController();
        
       // deferred.resolve({ "servicesBaseUrl" : 'http://172.16.9.197:8282/gage-service/service/'});
        // We have to call apply for this to work
      //  scope.$apply(); 
        
        rootScope.userid = routeParams.userid = '46240033';
        rootScope.token = routeParams.token = '~hEZwCAAAAAw5SzN-PdQG_A.tyyCMyTG97kTflUrMDjNKB';
        rootScope.role = routeParams.role = 'student';
        routeParams.teacherId ='46240033';
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
    
    
    it('It shuould resolv promis object of validate data and loadData function', function() {
        var controller = createController();
         scope.role='teacher';
         spyOn(scope,'setDataCourseTeacher').and.returnValue('Some text');
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config:{},data:{data:{'key':'someType'},messageType:'SUCCESS',status: 200, statusText: 'OK'} });
        
         
        // We have to call apply for this to work
        scope.$apply();   
           
        expect(getDataCourseTeacher._get).toHaveBeenCalled();
        expect(scope.setDataCourseTeacher).toHaveBeenCalled();
         
     });
     it('It shuould resolv promis object of validate data and loadData function', function() {
        var controller = createController();
         scope.role='teacher';
         spyOn(notAuthenticated,'_showErrorMsg').and.returnValue('Some text');
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config:{},data:{data:{'key':'someType'},messageType:'ERROR',status: 200, statusText: 'OK'} });
        
         
        // We have to call apply for this to work
        scope.$apply();   
           
        expect(getDataCourseTeacher._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
         
     });
    it('It shuould resolve promis object of validate data and loadData function with Error Response in Status 200',         function() {
        var controller = createController();
            scope.role='teacher';
            spyOn(noNetError,'_showNetErrorMsg').and.returnValue('Some text');
         // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        // We have to call apply for this to work
        scope.$apply();   
           
        expect(getDataCourseTeacher._get).toHaveBeenCalled();
        expect(noNetError._showErrorMsg).toBe(undefined);
         
     });
    
    
   it('It shuould call date update ', function() {
        var controller = createController();
        var currDate = new Date();
        scope.dateUpdate()
        expect(scope.startDateStartActivity).toEqual(currDate.setDate(currDate.getDate() - 7));
        expect(scope.maxDateStartActivity).toEqual(new Date().setDate(new Date().getDate() - 1));
        expect(scope.startDateEndActivity).toEqual(new Date());
    
   });

});

    