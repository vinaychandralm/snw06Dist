'use strict';


describe('Main Ctrl', function() {
    var scope, $location, createController,rootScope;
    beforeEach(module('studentActivityReports'))
beforeEach(module('studentActivityReports.home'));
    beforeEach(inject(function ($rootScope, $controller, _$location_,_$routeParams_, _validateUrlData_){
        $location = _$location_;
        rootScope=$rootScope;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('MainCtrl', {
                $scope: scope
                
            });
        };
    }));

    it('should have a method to check if the path is active', function() {
        var controller = createController();
        scope.initValues();
        expect(scope.progressReport).toBe(false);
         expect(scope.studentActivityReport).toBe(false);
         expect(rootScope.loadingText).toBe(true);
         expect(rootScope.netErr).toBe(false);
         expect(rootScope.authenticationErr ).toBe(false);
        
    });
});