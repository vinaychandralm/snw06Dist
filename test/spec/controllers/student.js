'use strict';

describe('studentDetailsCtrl', function () {
    var scope, $location, createController, rootScope, getEnrollmentStatus;
    beforeEach(module('studentActivityReports'))
    beforeEach(module('studentActivityReports.studentDetails'));
    beforeEach(inject(function ($rootScope, $controller, _getEnrollmentStatus_) {
        // $location = _$location_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        getEnrollmentStatus = _getEnrollmentStatus_;
        //        rootScope=$rootScope.$new()

        createController = function () {
            return $controller('studentDetailsCtrl', {
                $scope: scope

            });
        };
    }));

    // spyOn(getEnrollmentStatus, "get").and.returnValue("some value");

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

    // it('should have a method to check if the path is active', function () {
    //     var controller = createController();
    //     var get = getEnrollmentStatus.get();
    //     expect(get).toEqual("some value");

    // });
});


