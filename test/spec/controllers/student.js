'use strict';

// describe('studentDetailsCtrl', function () {
//     beforeEach(module('studentActivityReports.studentDetails'));

//     var rootScope, scope, controller, location, getDataStudent,
//         getEnrollmentStatus, getStudentCourseData, notAuthenticated, noNetError, getServerConfigData, $controller, $routeParams;

//     beforeEach(inject(function (_$rootScope_, _$controller_) {

//         $controller = _$controller_;
//         scope = _$rootScope_.$new();
//         location = {};
//         getDataStudent = {};
//         getEnrollmentStatus = {};
//         getStudentCourseData = {};
//         notAuthenticated = {};
//         noNetError = {};
//         getServerConfigData = {};
//         // routeParams = $routeParams;
//         controller = $controller('studentDetailsCtrl', {
//             '$scope': scope,
//             // rootScope: $rootScope,
//             // '$routeParams': {},
//             'getDataStudent': getDataStudent,
//             'getEnrollmentStatus': getEnrollmentStatus,
//             'getStudentCourseData': getStudentCourseData,
//             'notAuthenticated': notAuthenticated,
//             'noNetError': noNetError,
//             'getServerConfigData': getServerConfigData

//         });
//     }));

//     // describe('$scope.init', function () {

//     it('testing the variable get initiated', function () {
//         // $rootScope.isblue = true;
//         // $scope.courseNotSelected = true;
//         // $scope.enrllNotSelected = true;
//         // $scope.srtDateNotSelected = true;
//         // $scope.endDateNotSelected = true;
//         // $scope.isShowReportView = true;

//         scope.init();

//         // expect(scope.details).toEqual({});
//         // expect(rootScope.isblue).toBe(false);
//         // expect(scope.courseNotSelected).toBe(false);
//         // expect(scope.enrllNotSelected).toBe(false);
//         // expect(scope.srtDateNotSelected).toBe(false);
//         // expect(scope.endDateNotSelected).toBe(false);
//         // expect(scope.isShowReportView).toBe(false);
//         // expect(scope.courseIdArr).toEqual([]);
//         // expect(scope.enrollArr).toEqual([]);
//         // expect(scope.searchagain).toEqual("displaynonecls");
//         // expect(scope.enrollArr).toEqual("displaynonecls");
//     });
//     // });
// });

describe('studentDetailsCtrl', function () {
    var scope, $location, createController, rootScope;
    beforeEach(module('studentActivityReports'))
    beforeEach(module('studentActivityReports.studentDetails'));
    beforeEach(inject(function ($rootScope, $controller) {
        // $location = _$location_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        //        rootScope=$rootScope.$new()

        createController = function () {
            return $controller('studentDetailsCtrl', {
                $scope: scope

            });
        };
    }));

    it('should have a method to check if the path is active', function () {
        var controller = createController();
        
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
});


