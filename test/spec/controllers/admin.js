'use strict';
describe('Admin Ctrl', function() {
    var scope, $location, createController,rootScope,getSchoolData;
    var sce,ctrl,routeParams;
//    var $q,noNetError,getServerConfigData,routeParams;
//    var deferred;
//    
//    
//    var getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse;
    
    beforeEach(module('studentActivityReports'));
    beforeEach(module('studentActivityReports.adminDetails'));
    beforeEach(inject(function ($rootScope, $controller,_getSchoolData_,_$sce_,_$routeParams_){
//        $location = _$location_;
        rootScope=$rootScope;
        scope = $rootScope.$new();
        getSchoolData = _getSchoolData_;
        sce=_$sce_;
        routeParams = _$routeParams_;
//ctrl = _$controller_;
//        We use the $q service to create a mock instance of defer
//        deferred = _$q_.defer();
//
//        Use a Jasmine Spy to return the deferred promise
//        spyOn(getDataCourseTeacher, '_get').and.returnValue(deferred.promise);
//        
//        spyOn(getDataStudentTeacher,'_get').and.returnValue(deferred.promise);
        
//        createController = function() {
//            return $controller('adminctrl', {
//                $scope: scope,
//                $rootScope:rootScope,
//                $sce:sce,
//                getSchoolData:getSchoolData
//            });
//        };
       ctrl = $controller('adminctrl', {
                $rootScope:rootScope,
                $scope: scope,
                $sce:sce,
                getSchoolData:getSchoolData,
                $routeParams:routeParams
            });
        
    }));

    it('It shuould initialize the variables', function() {
     //   var controller = createController();
        
//        var controller = ctrl('adminctrl', {
//                $scope: scope,
//                $rootScope:rootScope,
//                $sce:sce,
//                getSchoolData:getSchoolData
//            });
        
       // spyOn(controller,'loadData').and.returnValue(deferred.promise);
       // deferred.resolve({ "servicesBaseUrl" : 'http://172.16.9.197:8282/gage-service/service/'});
        // We have to call apply for this to work
      //  scope.$apply(); 
        
     //   routeParams.userid = "876543";
        scope.initValues();
       
       // expect(getServerConfigData._getDetails).toHaveBeenCalled();
//expect(scope.userId).toEqual('876543');
//        expect(scope.details).toEqual({});
//        expect(rootScope.isblue).toBe(false);
//      
        console.log(scope.statusNotSelected, scope.inputAdmin);
        expect(scope.inputAdmin).toEqual(0);
        
//        expect(scope.courseNotSelected).toBe(false);
//        expect(scope.studentNotSelected).toBe(false);
//        expect(scope.schoolNotSelected).toBe(false);
//        expect(scope.srtDateNotSelected).toBe(false);
//        expect(scope.endDateNotgreater).toBe(false);
//        expect(scope.minimumMinut).toBe(false);
//        expect(scope.inputAdmin).toEqual(0);
//        
//        expect(scope.schoolListIds).toEqual([]);
//        expect(scope.multiselectModelAdminSchool).toEqual([]);
//        expect(scope.allSchoolIdArrays).toEqual([]);
//        expect(scope.enrollArr).toEqual([]);
//        expect(scope.multiselectModelEroll).toEqual([]);
//        expect(scope.studentListIds).toEqual([]);
//        expect(scope.multiselectModelAdminStudent).toEqual([]);
//        expect(scope.allSchoolStudentIdArrays ).toEqual([]);
//        expect(scope.studentCourseListIds).toEqual([]);
//        expect(scope.multiselectModelAdminStudentCourse).toEqual([]);
//
//        expect(scope.searchagain).toEqual('displaynonecls');
//        expect(scope.iframe_row).toEqual('displaynonecls');
//        expect(scope.isShowReportView).toBe(false);
        
    });

});

    
