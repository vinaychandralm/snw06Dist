'use strict';

describe('studentDetailsCtrl', function () {
    var scope, $location, createController, rootScope, getEnrollmentStatus, $q, deferred, getDataStudent, routeParams;

    beforeEach(module('studentActivityReports'))
    beforeEach(module('studentActivityReports.studentDetails'));
    beforeEach(inject(function ($rootScope, $controller, _$location_, _getEnrollmentStatus_, _$routeParams_, _$q_, _getDataStudent_) {
        // $location = _$location_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        $location = _$location_;
        getEnrollmentStatus = _getEnrollmentStatus_;
        $q = _$q_;
        getDataStudent = _getDataStudent_;
        routeParams = _$routeParams_;
        deferred = _$q_.defer();

        // spyOn(getDataStudent, '_get').and.returnValue(deferred.promise);
        spyOn(getDataStudent, '_get').and.returnValue(deferred.promise);

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

    // it('should have a method to check if the path is active', function () {
    //     var controller = createController();

    //     scope.role = 'student';
    //     spyOn(scope, 'setData').and.returnValue('Some text');
    //     // Setup the data we wish to return for the .then function in the controller
    //     deferred.resolve({ config: {}, data: { data: { 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
        
         
    //     // We have to call apply for this to work
    //     scope.$apply();

    //     expect(getDataStudent._get).toHaveBeenCalled();
    //     expect(scope.setData).toEqual('Some text');
    // });
    
    it('should have proper variable to be return proper value', function () {
        var controller = createController();
        var startDateActivity, endDateActivity;
        
        spyOn(scope, 'getDateAsString').and.returnValue("some value");

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
        expect(scope.getDateAsString).toHaveBeenCalled();
        expect(scope.isShowReportView).toBe(true);
    });

    it('should return launch page url', function () {
        var controller = createController();
        // spyOn($location, 'path').andReturn('Fake location');
        // expect($location.path).toBe('Fake location');
        $location.path('/');
        scope.backStudent();
        expect($location.path()).toBe('/');
    });


});


