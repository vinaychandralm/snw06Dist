'use strict';

describe('Copy Course Ctrl', function () {
   
   var scope, createController, rootScope;
    var $q, noNetError, notAuthenticated, noNetError;
    var deferred, getSchoolData, getSchoolStudent, getSchoolStudentCourse;
    var getEnrollmentStatus, $location, showReport,$timeout;
    
    var $routeParams, $locale,validateUrlData,GetCourseCatalog,theme,GetExistingCourseCat,
    GetExistingCourseCat,GetNewCourseCatSchool,GetNewCourseCatDist,postcopycourse;
    beforeEach(module('studentActivityReportsAdmin.factories'));
    beforeEach(module('studentActivityReports'));
    beforeEach(module('AdminActivityReports.courseMgmt'));
    
        beforeEach(inject(function ($rootScope, $controller,_$location_, _$routeParams_,
        _validateUrlData_, _notAuthenticated_, _noNetError_, _getSchoolData_,_GetCourseCatalog_,_GetExistingCourseCat_,_$locale_, _GetNewCourseCatSchool_,
        _GetNewCourseCatDist_,_postcopycourse_,  _$q_, _getEnrollmentStatus_,_$timeout_) {
        
        rootScope = $rootScope;
        scope = $rootScope.$new();
        getEnrollmentStatus: _getEnrollmentStatus_,
        notAuthenticated = _notAuthenticated_;
        noNetError = _noNetError_
        getSchoolData = _getSchoolData_;
        $q = _$q_;
        $location = _$location_;
        $timeout=_$timeout_;
        $routeParams = _$routeParams_;
        $locale=_$locale_;
        validateUrlData =_validateUrlData_;
        GetCourseCatalog = _GetCourseCatalog_;
        GetExistingCourseCat = _GetExistingCourseCat_;
        GetNewCourseCatSchool=_GetNewCourseCatSchool_;
        GetNewCourseCatDist=_GetNewCourseCatDist_;
        postcopycourse= _postcopycourse_
        
        rootScope.admindetail = { data: { user: { domainid: "some id" } } };
        rootScope.winConfigObj = {
            "userSettingObjects": {

                "role": "admin",
                "userid": "46238944",
                "token": "~gzYwCAAAAAAVEKSY_k1t1B.KawcNr64Loz8aaUcm2JPlB",

                "userspace": "gsd-06"
            },
            "servicesBaseUrl": "http://192.168.2.58:8080/gage-service/service",
            "reportServiceUrlStudent": "http://192.168.2.58:8080/reports"
        };
        
        scope.disrtictObj = [{id:'someid'}];
        rootScope.token = rootScope.winConfigObj.userSettingObjects.token
       
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(validateUrlData, '_get').and.returnValue(deferred.promise);
       
        //scope.$watch = jasmine.createSpy('$watch');

      //  jasmine.createSpy("$timeout");
        
        
        //        spyOn(getDataStudentTeacher,'_get').and.returnValue(deferred.promise);
        
        createController = function () {
            return $controller('courseMgmtCtrl', {
                $rootScope: rootScope,
                $scope: scope,
                notAuthenticated: notAuthenticated,
                noNetError: noNetError,
                
               // getEnrollmentStatus: _getEnrollmentStatus_,
               // getSchoolStudent: getSchoolStudent,
               // getSchoolStudentCourse: getSchoolStudentCourse,
                showReport: showReport,
                $location: $location,
                
                $timeout:$timeout,
                $routeParams:$routeParams,
                validateUrlData:validateUrlData,
                GetCourseCatalog:GetCourseCatalog,
                getSchoolData: getSchoolData,
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
    //    spyOn(scope, 'get_course_catalog_Data').and.returnValue('Some text');

        scope.loadData();
         
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ config: {}, data: { data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
         
         
        // We have to call apply for this to work
        scope.$apply();

        expect(validateUrlData._get).toHaveBeenCalled();
        expect(scope.get_district_School_Data).toHaveBeenCalled();
        //expect(scope.get_course_catalog_Data).toHaveBeenCalled();

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
    
    it('It shuould call the loadData method with Net ERROR  ', function () {
        var controller = createController();
        var obj = {data:{domains:[
            {"id":"46238884","name":"Gage Service District","userspace":"gsd-06","parentid":"34864588","reference":"gsd-06","guid":"693ff705-8958-4804-937b-2e5481f70e07","flags":0,"creationdate":"2016-02-10T06:08:47.583Z","creationby":"30750405","modifieddate":"2016-02-26T17:10:18.253Z","modifiedby":"46238944","version":"3","data":null},
            {"id":"46238951","name":"School1","userspace":"s1-06","parentid":"46238884","reference":"s1-06","guid":"0dd41a6c-11bb-4ff2-9735-cb2553b48cb5","flags":0,"creationdate":"2016-02-10T06:13:52.113Z","creationby":"30750405","modifieddate":"2016-02-10T06:13:52.113Z","modifiedby":"30750405","version":"1","data":null},
            {"id":"46239047","name":"School2","userspace":"s2-06","parentid":"46238884","reference":"s2-06","guid":"b6ea6150-e058-4c99-830f-38c38fff1370","flags":0,"creationdate":"2016-02-10T06:15:38.42Z","creationby":"30750405","modifieddate":"2016-02-10T06:15:38.42Z","modifiedby":"30750405","version":"1","data":null}
            
        ] }};
        rootScope.role = 'admin';
        
       rootScope.userDetails={data:{data:{user:{domainid:'46238884'}}}};
       
        
        scope.filterDataTODisplay(obj);
        
       
         expect(scope.disrtictObj).toEqual([{"id":"46238884","name":"Gage Service District","userspace":"gsd-06","parentid":"34864588","reference":"gsd-06","guid":"693ff705-8958-4804-937b-2e5481f70e07","flags":0,"creationdate":"2016-02-10T06:08:47.583Z","creationby":"30750405","modifieddate":"2016-02-26T17:10:18.253Z","modifiedby":"46238944","version":"3","data":null}]);
        
        expect(scope.domainDataScholl).toEqual([{"id":"46238951","name":"School1","userspace":"s1-06","parentid":"46238884","reference":"s1-06","guid":"0dd41a6c-11bb-4ff2-9735-cb2553b48cb5","flags":0,"creationdate":"2016-02-10T06:13:52.113Z","creationby":"30750405","modifieddate":"2016-02-10T06:13:52.113Z","modifiedby":"30750405","version":"1","data":null},
            {"id":"46239047","name":"School2","userspace":"s2-06","parentid":"46238884","reference":"s2-06","guid":"b6ea6150-e058-4c99-830f-38c38fff1370","flags":0,"creationdate":"2016-02-10T06:15:38.42Z","creationby":"30750405","modifieddate":"2016-02-10T06:15:38.42Z","modifiedby":"30750405","version":"1","data":null}]);
        
    });
    
    it('It shuould call the loadData method with Net ERROR  ', function () {
        var controller = createController();
        
        var dateStr = scope.dateStringFormat(new Date("October 21, 2016"));
        
        expect(dateStr).toEqual('2016-10-21');        

    });

    it('It shuould call the get_course_catalog_Data method with messageType: SUCCESS ', function () {
        var controller = createController();
        spyOn(GetCourseCatalog, '_get').and.returnValue(deferred.promise);
        scope.disrtictObj = [{id:'someid'}];
        var successObj = {data: { data:{domains:'8765' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } };

        scope.get_course_catalog_Data();

        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve(successObj);
         
        // We have to call apply for this to work
        scope.$apply();
        
        expect(scope.courseCatalogList).toEqual(successObj.data.data.domains);
        expect(GetCourseCatalog._get).toHaveBeenCalledWith(scope.disrtictObj[0].id);
        
        
        //   $scope.courseCatLodingLayer = false;
        expect(scope.distSchollLodingLayer).toBe(false);

    });
    
    // it('It shuould call the get_district_School_Data method with messageType: SUCCESS ', function () {
    //     var controller = createController();

    //     $routeParams.role = 'admin';
    //     rootScope.userDetails={'data':{'data':{'user':{'domainid':'46238884'}}}};
        
      
    //     spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);
    //     spyOn(scope, 'filterDataTODisplay').and.returnValue('Some text');
      
    //     scope.get_district_School_Data();
         
        
    //     // Setup the data we wish to return for the .then function in the controller
    //     deferred.resolve({  data: { data:{domains:'8765' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
                
    //     // We have to call apply for this to work
    //     scope.$apply();

    //     expect(GetCourseCatalog._get).toHaveBeenCalled();
    //     expect(scope.filterDataTODisplay).toHaveBeenCalled();
    //     expect(scope.distSchollLodingLayer).toBe(false);

    // });
   
        it('It shuould call the removeSchoolDistFrmModal method with messageType: SUCCESS ', function () {
            var controller = createController();

            $routeParams.role = 'admin';
            rootScope.userDetails={'data':{'data':{'user':{'domainid':'46238884'}}}};
            rootScope.userDetails={'data':{'data':{'user': 'some value'}}};
      
            scope.existingCourseList =[
                {"schoolDistId":"46238884","name":"Gage Service District","userspace":"gsd-06","parentid":"34864588","reference":"gsd-06","guid":"693ff705-8958-4804-937b-2e5481f70e07","flags":0,"creationdate":"2016-02-10T06:08:47.583Z","creationby":"30750405","modifieddate":"2016-02-26T17:10:18.253Z","modifiedby":"46238944","version":"3","data":null},
                {"schoolDistId":"46238951","name":"School1","userspace":"s1-06","parentid":"46238884","reference":"s1-06","guid":"0dd41a6c-11bb-4ff2-9735-cb2553b48cb5","flags":0,"creationdate":"2016-02-10T06:13:52.113Z","creationby":"30750405","modifieddate":"2016-02-10T06:13:52.113Z","modifiedby":"30750405","version":"1","data":null},
                {"schoolDistId":"46239047","name":"School2","userspace":"s2-06","parentid":"46238884","reference":"s2-06","guid":"b6ea6150-e058-4c99-830f-38c38fff1370","flags":0,"creationdate":"2016-02-10T06:15:38.42Z","creationby":"30750405","modifieddate":"2016-02-10T06:15:38.42Z","modifiedby":"30750405","version":"1","data":null}
            ];
           
            scope.removeSchoolDistFrmModal('46238884');
           
            expect(scope.existingCourseList.length).toEqual(2);

    });
    
    it('It shuould call the addSchoolDistIntoModal method with  PUSH ', function () {
        var controller = createController();

         scope.existingCourseList =[
            {"schoolDistId":"46238884","name":"Gage Service District","userspace":"gsd-06","parentid":"34864588","reference":"gsd-06","guid":"693ff705-8958-4804-937b-2e5481f70e07","flags":0,"creationdate":"2016-02-10T06:08:47.583Z","creationby":"30750405","modifieddate":"2016-02-26T17:10:18.253Z","modifiedby":"46238944","version":"3","data":null},
            {"schoolDistId":"46238951","name":"School1","userspace":"s1-06","parentid":"46238884","reference":"s1-06","guid":"0dd41a6c-11bb-4ff2-9735-cb2553b48cb5","flags":0,"creationdate":"2016-02-10T06:13:52.113Z","creationby":"30750405","modifieddate":"2016-02-10T06:13:52.113Z","modifiedby":"30750405","version":"1","data":null},
            {"schoolDistId":"46239047","name":"School2","userspace":"s2-06","parentid":"46238884","reference":"s2-06","guid":"b6ea6150-e058-4c99-830f-38c38fff1370","flags":0,"creationdate":"2016-02-10T06:15:38.42Z","creationby":"30750405","modifieddate":"2016-02-10T06:15:38.42Z","modifiedby":"30750405","version":"1","data":null}
        ];
        scope.addSchoolDistIntoModal('46238884','school1',{'obj':'some object'},'xyz');
        

        expect(scope.existingCourseList.length).toEqual(4);

    });
    
    it('It shuould call the updateNewCourseForSchool method with  PUSH ', function () {
        var controller = createController();

         scope.schollNewCousreList =[
            {"schoolDistId":"46238884","name":"Gage Service District","userspace":"gsd-06","parentid":"34864588","reference":"gsd-06","guid":"693ff705-8958-4804-937b-2e5481f70e07","flags":0,"creationdate":"2016-02-10T06:08:47.583Z","creationby":"30750405","modifieddate":"2016-02-26T17:10:18.253Z","modifiedby":"46238944","version":"3","data":null},
            {"schoolDistId":"46238951","name":"School1","userspace":"s1-06","parentid":"46238884","reference":"s1-06","guid":"0dd41a6c-11bb-4ff2-9735-cb2553b48cb5","flags":0,"creationdate":"2016-02-10T06:13:52.113Z","creationby":"30750405","modifieddate":"2016-02-10T06:13:52.113Z","modifiedby":"30750405","version":"1","data":null},
            {"schoolDistId":"46239047","name":"School2","userspace":"s2-06","parentid":"46238884","reference":"s2-06","guid":"b6ea6150-e058-4c99-830f-38c38fff1370","flags":0,"creationdate":"2016-02-10T06:15:38.42Z","creationby":"30750405","modifieddate":"2016-02-10T06:15:38.42Z","modifiedby":"30750405","version":"1","data":null}
        ];
        scope.updateNewCourseForSchool('some course array list',{'id':'someid', 'name':'some Name',});

        expect(scope.schollNewCousreList.length).toEqual(4);

    }); 
    
    //  it('It shuould call the removeNewSchollCourseFrmModal  ', function () {
    //     var controller = createController();

    //      scope.schollNewCousreList =[
    //         {"schoolDistId":"46238884","name":"Gage Service District","userspace":"gsd-06","parentid":"34864588","reference":"gsd-06","guid":"693ff705-8958-4804-937b-2e5481f70e07","flags":0,"creationdate":"2016-02-10T06:08:47.583Z","creationby":"30750405","modifieddate":"2016-02-26T17:10:18.253Z","modifiedby":"46238944","version":"3","data":null},
    //         {"schoolDistId":"46238951","name":"School1","userspace":"s1-06","parentid":"46238884","reference":"s1-06","guid":"0dd41a6c-11bb-4ff2-9735-cb2553b48cb5","flags":0,"creationdate":"2016-02-10T06:13:52.113Z","creationby":"30750405","modifieddate":"2016-02-10T06:13:52.113Z","modifiedby":"30750405","version":"1","data":null},
    //         {"schoolDistId":"46239047","name":"School2","userspace":"s2-06","parentid":"46238884","reference":"s2-06","guid":"b6ea6150-e058-4c99-830f-38c38fff1370","flags":0,"creationdate":"2016-02-10T06:15:38.42Z","creationby":"30750405","modifieddate":"2016-02-10T06:15:38.42Z","modifiedby":"30750405","version":"1","data":null}
    //     ];
    //     var domainObj = {'name' :'School2'};
    //    // scope.SchollNewCourseMasterArray = [];
    //     scope.removeNewSchollCourseFrmModal(domainObj);
    //     expect(scope.schollNewCousreList.length).toEqual(2);

    // });
    
    it('It shuould call the getNewCourseListForScholl  method with messageType: Success ', function () {
        var controller = createController();

        spyOn(GetNewCourseCatSchool, '_get').and.returnValue(deferred.promise);
        spyOn(scope, 'updateNewCourseForSchool').and.returnValue('some text');
        spyOn(scope, 'buildMainModal').and.returnValue('some text');
        
        var domainObj =  {
            id:'some id',
            name: 'some name'
        }
        scope.disrtictObj=[{"id":"46238884","name":"Gage Service District","userspace":"gsd-06","parentid":"34864588","reference":"gsd-06","guid":"693ff705-8958-4804-937b-2e5481f70e07","flags":0,"creationdate":"2016-02-10T06:08:47.583Z","creationby":"30750405","modifieddate":"2016-02-26T17:10:18.253Z","modifiedby":"46238944","version":"3","data":null}];
        
        scope.getNewCourseListForScholl(domainObj)
        
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({  data: { data:{domains:'8765', course:'some course' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
        scope.$apply();
        
        expect(GetNewCourseCatSchool._get).toHaveBeenCalled();
        expect(scope.newCourseCatLodingLayer).toEqual(false);
        
       // expect(scope.schollNewCousreList.length).toEqual(4);

    });
    
    it('It shuould call the get_district_School_Data  method with messageType: Success ', function () {
        var controller = createController();

        spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);
        spyOn(scope, 'filterDataTODisplay').and.returnValue('some text');
        
        rootScope.userDetails={'data':{'data':{'user':{'domainid':'46238884'}}}};
        
        scope.get_district_School_Data();
        
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({  data: { data:{domains:'8765', course:'some course' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
        scope.$apply();
        
        expect(getSchoolData._get).toHaveBeenCalled();
        expect(scope.filterDataTODisplay).toHaveBeenCalled();
        expect(scope.distSchollLodingLayer ).toEqual(false);
        

    });
    
    it('It shuould call the get_district_School_Data  method with messageType: Error on 200 ', function () {
        var controller = createController();

        spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('some text');
        
        rootScope.userDetails={'data':{'data':{'user':{'domainid':'46238884'}}}};
        
        scope.get_district_School_Data();
        
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({  data: { data:{domains:'8765', course:'some course' }, messageType: 'ERROR', status: 200, statusText: 'OK' } });
        scope.$apply();
        
        expect(getSchoolData._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
        expect(scope.distSchollLodingLayer ).toEqual(false);
        

    });
    it('It shuould call the get_district_School_Data  method with messageType: Error on 500 ', function () {
        var controller = createController();

        spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);
        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('some text');
        
        rootScope.userDetails={'data':{'data':{'user':{'domainid':'46238884'}}}};
        
        scope.get_district_School_Data();
        
         // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        scope.$apply();
        
        expect(getSchoolData._get).toHaveBeenCalled();
        expect(noNetError._showNetErrorMsg).toHaveBeenCalled();
        expect(scope.distSchollLodingLayer ).toEqual(false);
    });
    
    //updateExistingCourseModal = function (schdist_Id, distschoolChkval, itemName, chkbxidstr) {
    it('It shuould call the updateExistingCourseModal  method  ', function () {
        var controller = createController();

        spyOn(GetExistingCourseCat, '_get').and.returnValue(deferred.promise);
        spyOn(scope, 'addSchoolDistIntoModal').and.returnValue('some text');
        
        rootScope.userDetails={'data':{'data':{'user':{'domainid':'46238884'}}}};
        
        var schdist_Id= 'someID',
            distschoolChkval = true,
            itemName = 'someName',
            chkbxidstr = 'chkBoxIdStr';
        
        scope.updateExistingCourseModal(schdist_Id, distschoolChkval, itemName, chkbxidstr);
        
         // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({  data: { data:{domains:'8765', course:'some course' }, messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
        scope.$apply();
        
        
        
        expect(GetExistingCourseCat._get).toHaveBeenCalled();
        //expect(noNetError._showNetErrorMsg).toHaveBeenCalled();
        expect(scope.addSchoolDistIntoModal ).toHaveBeenCalled();
    });
    
    it('It shuould call the updateExistingCourseModal  method  wit dist = false', function () {
        var controller = createController();

        spyOn(scope, 'onCourseChkUpdate').and.returnValue('some text');
        spyOn(scope, 'removeSchoolDistFrmModal').and.returnValue('some text');
        
        rootScope.userDetails={'data':{'data':{'user':{'domainid':'46238884'}}}};
        
        var schdist_Id= 'someID',
            distschoolChkval = false,
            itemName = 'someName',
            chkbxidstr = 'chkBoxIdStr';
        
        scope.updateExistingCourseModal(schdist_Id, distschoolChkval, itemName, chkbxidstr);
        
        expect(scope.onCourseChkUpdate).toHaveBeenCalled();
        expect(scope.removeSchoolDistFrmModal ).toHaveBeenCalled();
    });
    
    
     it('It shuould call the checkSchoolOrDist   method  wit dist = false', function () {
        var controller = createController();

        
        var schdist_Id= 'NonDistID';
        
        scope.disrtictObj = [{'id':'DIST' }]
        
       var returnVal = scope.checkSchoolOrDist(schdist_Id);
        
        expect(returnVal).toBe(false);
    });

    it('It shuould call the checkSchoolOrDist   method  wit dist = false', function () {
        var controller = createController();

        
        var schdist_Id= 'DIST';
        
        scope.disrtictObj = [{'id':'DIST' }]
        
       var returnVal = scope.checkSchoolOrDist(schdist_Id);
        
        expect(returnVal).toBe(true);
    }); 
    
    //  it('It shuould call the addDistPostFix method ', function () {
    //     var controller = createController();

        
    //     scope.schollCousreList =[
    //         {
    //             'courseList':['A1','A2'],
    //             'schoolDomainId':'A12345'
    //          },
    //         {
    //             'courseList':['B1','B2'],
    //             'schoolDomainId':'B12345'
    //          }];
        
    //    // scope.disrtictObj = [{'id':'DIST' }]
        
    //     scope.addDistPostFix(scope.schollCousreList);
        
    //     console.log(scope.schollCousreList[0].courseList[0])
        
    //   //  expect(scope.schollCousreList[0].courseList[0]).toEqual("A1 (District)");
    //     // expect(scope.schollCousreList[0].domainType).toEqual('SCHOOL');
    //     //  expect(scope.schollCousreList[1].courseFrom).toEqual(" (District)");
    //     // expect(scope.schollCousreList[1].domainType).toEqual('SCHOOL');
    //     //  expect(scope.schollCousreList[2].courseFrom).toEqual(" (District)");
    //     // expect(scope.schollCousreList[2].domainType).toEqual('SCHOOL');
        
        
    // });

});