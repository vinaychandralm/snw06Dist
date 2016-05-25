'use strict';

describe('directive: multiselect', function () {
    // var element, scope;
   
    var $compile,
        $rootScope;
    beforeEach(module('studentActivityReports'));
    beforeEach(module('ui.multiselect'));


    // beforeEach(inject(function ($rootScope, $compile) {
    //     scope = $rootScope.$new();

    //     element =
    //     '<multiselect ng-model="multiselectModelcourse" options="c.title for c in courseArr" data-multiple="true" data-checkall="All Courses"></multiselect>';

    //     scope.courseArr = [{ 'title': 'Tittle_1' }, { 'title': 'Tittle_2' }, { 'title': 'Tittle_3' }];

    //     element = $compile(element)(scope);
    //     //  scope.$digest();
    //     scope.$apply();
    // }));


    beforeEach(inject(function (_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));




    it('Header text will be All Selected', function () {
        var element = $compile('<multiselect ng-model="multiselectModelcourse" options="c.title for c in courseArr" data-multiple="true" data-checkall="All Courses"></multiselect>')($rootScope);
        $rootScope.courseArr = [{ 'title': 'Tittle_1' }, { 'title': 'Tittle_2' }, { 'title': 'Tittle_3' }];
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("All Selected");
    });
    it('Header text will be Select if no data array has been supplied', function () {
        var element = $compile('<multiselect ng-model="multiselectModelcourse" options="c.title for c in courseArr" data-multiple="true" data-checkall="All Courses"></multiselect>')($rootScope);
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("Select");
        
       // console.log($rootScope);
    });
    // it('Header text will be Select if no data array has been supplied', function () {
    //     var element = $compile('<multiselect ng-model="multiselectModelcourse" options="c.title for c in courseArr" data-multiple="true" data-checkall="All Courses"></multiselect>')($rootScope);
    //    $rootScope.courseArr = [{ 'title': 'Tittle_1' }];
    //     $rootScope.$digest();
    //     // Check that the compiled element contains the templated content
    //     expect(element.html()).toContain("Select");
    // });
});