'use strict';

describe('Main Ctrl', function() {
    var scope, $location, createController,rootScope,notAuthenticated;
    var $q,noNetError,getServerConfigData,routeParams,validateUrlData;
    var deferred;
    
    beforeEach(module('studentActivityReports'))
beforeEach(module('studentActivityReports.home'));
    beforeEach(inject(function ($rootScope, $controller, _$location_,_$routeParams_, _validateUrlData_,_$q_,
                        _notAuthenticated_, _noNetError_, _getServerConfigData_){
        $location = _$location_;
        rootScope=$rootScope;
        scope = $rootScope.$new();
        $q = _$q_;
        notAuthenticated=_notAuthenticated_;
        noNetError=_noNetError_;
        getServerConfigData=_getServerConfigData_;
        routeParams =_$routeParams_;
        validateUrlData=_validateUrlData_;
        
        
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(validateUrlData, '_get').and.returnValue(deferred.promise);
        
        
        createController = function() {
            return $controller('MainCtrl', {
                $scope: scope,
                validateUrlData: validateUrlData
            });
        };
    }));

    it('It shuould initialize the variables', function() {
        var controller = createController();
        
        rootScope.userid = routeParams.userid = '46240033';
        rootScope.token = routeParams.token = '~hEZwCAAAAAw5SzN-PdQG_A.tyyCMyTG97kTflUrMDjNKB';
        rootScope.role = routeParams.role = 'student';
        
        scope.initValues();
        
        expect(scope.progressReport).toBe(false);
        expect(scope.studentActivityReport).toBe(false);
        expect(rootScope.loadingText).toBe(true);
        expect(rootScope.netErr).toBe(false);
        expect(rootScope.authenticationErr ).toBe(false);
        
    });
    
     it('It shuould resolv promis object of validate data and loadData function', function() {
        var controller = createController();
         scope.role='student';
         spyOn(scope,'showTiles').and.returnValue('Some text');
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config:{},data:{data:{'key':'someType'},messageType:'SUCCESS',status: 200, statusText: 'OK'} });
        
         
        // We have to call apply for this to work
        scope.$apply();   
           
        expect(validateUrlData._get).toHaveBeenCalled();
        expect(scope.showTiles).toHaveBeenCalled();
         
     });
    
    it('It shuould resolve promis object of validate data and loadData function with Error Response in Status 200', function() {
        var controller = createController();
         scope.role='student';
         spyOn(notAuthenticated,'_showErrorMsg').and.returnValue('Some text');
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config:{},data:{data:{'key':'someType'},messageType:'ERROR',status: 200, statusText: 'OK'} });
        
         
        // We have to call apply for this to work
        scope.$apply();   
           
        expect(validateUrlData._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
         
     });
    it('It shuould resolve promis object of validate data and loadData function with Error Response in Status 200',         function() {
        var controller = createController();
            scope.role='student';
            spyOn(noNetError,'_showNetErrorMsg').and.returnValue('Some text');
            spyOn(scope,'blockUser').and.returnValue('Some text');
         // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        /*
        
        noNetError._showNetErrorMsg();
            $scope.blockUser(errResponse);

        */
         
        // We have to call apply for this to work
        scope.$apply();   
           
        expect(validateUrlData._get).toHaveBeenCalled();
        expect(noNetError._showErrorMsg).toBe(undefined);
        expect(scope.blockUser).toHaveBeenCalled();
         
     });
    
    it('It shuould call Show Tile function with Student', function() {
        var controller = createController();
        rootScope.role = routeParams.role = 'student';'student';
        scope.showTiles("some Object");
        
        expect(scope.progressReport).toEqual(true);
        expect(scope.studentActivityReport).toEqual(true) ;
         
     });
    
    it('It shuould call Show Tile function with Teacher', function() {
        var controller = createController();
        rootScope.role = routeParams.role = 'teacher';
        scope.showTiles("some Object");
        
        expect(scope.courseCompletionReport).toEqual(true);
        expect(scope.studentActivityReport).toEqual(true) ;
         
     });
    it('It shuould call Show Tile function with admin', function() {
        var controller = createController();
        rootScope.role = routeParams.role = 'admin';
        scope.showTiles('some Object');
        
        expect(scope.progressReport).toEqual(true) ;
        expect(scope.courseCompletionReport).toEqual(true);
        expect(scope.studentActivityReport).toEqual(true) ;
        expect(scope.admindetail).toEqual('some Object') ;
         
     });
    
    it('It shuould call openForm with admin', function() {
        var controller = createController();
        rootScope.role = routeParams.role = 'admin';
       
        scope.openForm();
        
        rootScope.$apply();
        expect($location.path()).toBe('/admin-form');
        
         
     });
    it('It shuould call openForm with student', function() {
        var controller = createController();
        rootScope.role = routeParams.role = 'student';
       
        scope.openForm();
        
        rootScope.$apply();
        expect($location.path()).toBe('/student-activity-reports');
        
         
     });
     it('It shuould call openForm with teacher', function() {
        var controller = createController();
        rootScope.role = routeParams.role = 'teacher';
       
        scope.openForm();
        
        rootScope.$apply();
        expect($location.path()).toBe('/teacher-form');
        
         
     });
    it('It shuould call go with given Url', function() {
        var controller = createController();
       
        scope.go('/teacher-form');
        
        rootScope.$apply();
        expect($location.path()).toBe('/teacher-form');
        
         
     });   

});

