'use strict';
// describe('Test studentActivityReports.routing provider', function () {
//     var theConfigProvider;
//     beforeEach(module("studentActivityReports", function (routeInfoProvider) {
//         theConfigProvider = routeInfoProvider;
//     }));
//     describe('with custom configuration', function () {
//         it('tests the providers internal function', function () {
//             expect(theConfigProvider).toBeUndefined();
//         });
//     });
// });

describe('Testing routes', function() {
beforeEach(module('studentActivityReports'));

var location, route, rootScope;

beforeEach(inject(
    function( _$location_, _$route_, _$rootScope_ ) {
        location = _$location_;
        route = _$route_;
        rootScope = _$rootScope_;
}));


 describe('testing admin', function() {
    beforeEach(inject(
        function($httpBackend) {
            $httpBackend.expectGET('views/admin-form.html')
            .respond(200);
        }));

    it('should load the login page on successful load of /admin-form', function() {
        location.path('/admin-form');
        rootScope.$digest();
        expect(route.current.controller).toBe('adminctrl');
    });
    });
    
    describe('testing teacher', function() {
    beforeEach(inject(
        function($httpBackend) {
            $httpBackend.expectGET('views/teacher-form.html')
            .respond(200);
        }));

    it('should load the login page on successful load of /teacher-form', function() {
        location.path('/teacher-form');
        rootScope.$digest();
        expect(route.current.controller).toBe('teacherDetailsCtrl');
    });
    });
    
    describe('testing student', function() {
    beforeEach(inject(
        function($httpBackend) {
            $httpBackend.expectGET('views/student-activity-reports.html')
            .respond(200);
        }));

    it('should load the login page on successful load of /teacher-form', function() {
        location.path('/student-activity-reports');
        rootScope.$digest();
        expect(route.current.controller).toBe('studentDetailsCtrl');
    });
});  
});  
