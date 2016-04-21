'use strict';

describe('Copy Course Ctrl', function () {
    var scope, createController, rootScope;
    var $q, noNetError, notAuthenticated, noNetError, getSchoolData;
    var deferred;
    var $location, $timeout, $locale, $routeParams;
    var validateUrlData, GetCourseCatalog, GetExistingCourseCat, GetNewCourseCatSchool, GetNewCourseCatDist, postcopycourse;
    //    
    //    
    //    var getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse,routeParams;
    // $scope, $rootScope, $location, theme, $routeParams, validateUrlData, notAuthenticated, noNetError,
    //     getSchoolData, GetCourseCatalog, GetExistingCourseCat, $locale, _, GetNewCourseCatSchool, GetNewCourseCatDist,
    //     postcopycourse, $timeout
    beforeEach(module('studentActivityReports'));
    beforeEach(module('studentActivityReportsAdmin.factories'));
    beforeEach(module('AdminActivityReports.courseMgmt'));
    beforeEach(inject(function ($rootScope, $controller, _$routeParams_, _$location_, _validateUrlData_, _notAuthenticated_,
        _noNetError_, _GetCourseCatalog_, _GetExistingCourseCat_, _$locale_, _GetNewCourseCatSchool_, _GetNewCourseCatDist_,
        _postcopycourse_, _$timeout_, _$q_, _getSchoolData_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        notAuthenticated = _notAuthenticated_;
        noNetError = _noNetError_
        $q = _$q_;
        $location = _$location_;
        $timeout = _$timeout_;
        validateUrlData = _validateUrlData_;
        GetCourseCatalog = _GetCourseCatalog_;
        GetExistingCourseCat = _GetExistingCourseCat_;
        $locale = _$locale_;
        GetNewCourseCatSchool = _GetNewCourseCatSchool_;
        GetNewCourseCatDist = _GetNewCourseCatDist_;
        postcopycourse = _postcopycourse_;
        $routeParams = _$routeParams_;
        getSchoolData = _getSchoolData_;
        rootScope.admindetail = { data: { user: { domainid: "some id" } } };
        rootScope.winConfigObj = {
            "userSettingObjects": {


                "role": "admin",
                "userid": "46238944",
                "token": "~gzYwCAAAAAQZvSzPzYfwJA.GeZPIOOrBFAT8-FCPiYVTC",
                "userspace": "gsd-06"
            },
            "servicesBaseUrl_1": "https://devlearn.schoolimprovement.com/gage-service/service",
            "reportServiceUrlStudent_1": "https://devlearn.schoolimprovement.com/reports",
            "servicesBaseUrl": "http://192.168.2.58:8080/gage-service/service",
            "reportServiceUrlStudent": "http://192.168.2.58:8080/reports",
            "courseCatalogUrl": "http://192.168.2.58:8080/gage-service/service/domain/list/providers?token=",
            "existingCourseUrl": "http://192.168.2.58:8080/gage-service/service/course/list/",
            "newCourseList": "http://192.168.2.58:8080/gage-service/service/course/new/list/",
            "copyCourseUrl": "http://192.168.2.58:8080/gage-service/service/course/copycourse"
        };
        rootScope.token = rootScope.winConfigObj.userSettingObjects.token
        
        
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
         spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);
        spyOn(validateUrlData, '_get').and.returnValue(deferred.promise);
     //   spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);

        //spyOn(getSchoolStudent, '_get').and.returnValue(deferred.promise);

        // spyOn(getSchoolStudentCourse, '_get').and.returnValue(deferred.promise);

        // scope.$watch = jasmine.createSpy('$watch');

        // jasmine.createSpy("$timeout");
        
        
        //        spyOn(getDataStudentTeacher,'_get').and.returnValue(deferred.promise);
        
        createController = function () {
            return $controller('courseMgmtCtrl', {
                $scope: scope,
                $rootScope: rootScope,
                $location: $location,


                $routeParams: $routeParams,
                validateUrlData: validateUrlData,
                notAuthenticated: notAuthenticated,
                noNetError: noNetError,
                getSchoolData: getSchoolData,
                GetCourseCatalog: GetCourseCatalog,
                GetExistingCourseCat: GetExistingCourseCat,
                $locale: $locale,
                GetNewCourseCatSchool: GetNewCourseCatSchool,
                GetNewCourseCatDist: GetNewCourseCatDist,
                postcopycourse: postcopycourse,
                $timeout: $timeout,

            });

        };
    }));


    it('It shuould initialize the variables', function () {
        var controller = createController();

        rootScope.userid = $routeParams.userid = '46240033';
        rootScope.token = $routeParams.token = '~hEZwCAAAAAw5SzN-PdQG_A.tyyCMyTG97kTflUrMDjNKB';
        rootScope.role = $routeParams.role = 'admin';

        scope.initValues();


        expect($locale.DATETIME_FORMATS.SHORTDAY).toEqual(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
            
        //console.log(_.union([34,35,45,48,49], [48,32,34,55]));
        expect(rootScope.winConfigObj).toBe(window.configObj);
        expect(rootScope.loadingText).toBe(true);
        expect(rootScope.netErr).toBe(false);
        expect(rootScope.authenticationErr).toBe(false);

        expect(rootScope.token).toEqual($routeParams.token);
        expect(rootScope.userid).toEqual($routeParams.userid);
        expect(rootScope.token).toEqual($routeParams.token);
        expect(rootScope.role).toEqual($routeParams.role);

        expect(scope.showLogErrorPg).toBe(true);
        expect(scope.showLogErrorPg).toBe(true);
        expect(scope.courseType).toEqual('Continuous');

        expect(scope.DistNewCourseArray).toEqual(null);
        expect(scope.courseCatalogList).toEqual(null);

        expect(scope.existingCourseList).toEqual([]);
        expect(scope.schollNewCousreList).toEqual([]);

        //loding layers flags
        expect(scope.courseCatLodingLayer).toBe(false);
        expect(scope.distSchollLodingLayer).toBe(false);
        expect(scope.existingCourseLodingLayer).toBe(false);
        expect(scope.newCourseCatLodingLayer).toBe(false);
    
        //putting 'userspace' value to root scope so that it is avilable to all ctrls
        expect(rootScope.userspace).toEqual($routeParams.userspace);
        expect(scope.urlDetails).toEqual(rootScope.winConfigObj);

        expect(scope.DistChkBoxID).toEqual('distCollapsable');

        expect(scope.showWholePgLoading).toBe(false);
        expect(scope.hideCalenderArea).toBe(true);

    });

    it('It shuould call the loadData method with messageType: SUCCESS ', function () {
        var controller = createController();

        $routeParams.role = 'admin';
        spyOn(scope, 'get_district_School_Data').and.returnValue('Some text');
        spyOn(scope, 'get_course_catalog_Data').and.returnValue('Some text');

        scope.loadData();
         
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
         
         
        // We have to call apply for this to work
        scope.$apply();

        expect(validateUrlData._get).toHaveBeenCalled();
        expect(scope.get_district_School_Data).toHaveBeenCalled();
        expect(scope.get_course_catalog_Data).toHaveBeenCalled();

    });

    it('It shuould call the loadData method with messageType: ERROR ', function () {
        var controller = createController();

        $routeParams.role = 'admin';
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('Some text');
        //  spyOn(scope, 'get_course_catalog_Data').and.returnValue('Some text');

        scope.loadData();
         
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
         
         
        // We have to call apply for this to work
        scope.$apply();

        expect(validateUrlData._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
        expect(scope.showLogErrorPg).toBe(true);

    });

    it('It shuould call the loadData method with Net ERROR  ', function () {
        var controller = createController();

        $routeParams.role = 'admin';

        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('Some text');
        //  spyOn(scope, 'get_course_catalog_Data').and.returnValue('Some text');

        scope.loadData();
         
        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
         
        // We have to call apply for this to work
        scope.$apply();

        expect(validateUrlData._get).toHaveBeenCalled();
        expect(noNetError._showNetErrorMsg).toHaveBeenCalled();
        expect(scope.showLogErrorPg).toBe(true);

    });


   


});