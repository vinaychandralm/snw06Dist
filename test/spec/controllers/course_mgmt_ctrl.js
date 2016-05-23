'use strict';

describe('Copy Course Ctrl', function () {

    var scope, createController, rootScope;
    var $q, noNetError, notAuthenticated, noNetError;
    var deferred, getSchoolData, getSchoolStudent, getSchoolStudentCourse;
    var getEnrollmentStatus, $location, showReport, $timeout, angularHtml;

    var $routeParams, $locale, validateUrlData, GetCourseCatalog, theme, GetExistingCourseCat,
        GetExistingCourseCat, GetNewCourseCatSchool, GetNewCourseCatDist, postcopycourse;
    beforeEach(module('studentActivityReportsAdmin.factories'));
    beforeEach(module('studentActivityReports'));
    beforeEach(module('AdminActivityReports.courseMgmt'));

    beforeEach(inject(function ($rootScope, $controller, _$location_, _$routeParams_,
        _validateUrlData_, _notAuthenticated_, _noNetError_, _getSchoolData_, _GetCourseCatalog_, _GetExistingCourseCat_, _$locale_, _GetNewCourseCatSchool_,
        _GetNewCourseCatDist_, _postcopycourse_, _$q_, _getEnrollmentStatus_, _$timeout_) {

        rootScope = $rootScope;
        scope = $rootScope.$new();
        getEnrollmentStatus: _getEnrollmentStatus_,
            notAuthenticated = _notAuthenticated_;
        noNetError = _noNetError_
        getSchoolData = _getSchoolData_;
        $q = _$q_;
        $location = _$location_;
        $timeout = _$timeout_;
        $routeParams = _$routeParams_;
        $locale = _$locale_;
        validateUrlData = _validateUrlData_;
        GetCourseCatalog = _GetCourseCatalog_;
        GetExistingCourseCat = _GetExistingCourseCat_;
        GetNewCourseCatSchool = _GetNewCourseCatSchool_;
        GetNewCourseCatDist = _GetNewCourseCatDist_;
        postcopycourse = _postcopycourse_

        rootScope.admindetail = {
            data: {
                user: {
                    domainid: "some id"
                }
            }
        };
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

        scope.disrtictObj = [{
            id: 'someid'
        }];
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

                $timeout: $timeout,
                $routeParams: $routeParams,
                validateUrlData: validateUrlData,
                GetCourseCatalog: GetCourseCatalog,
                getSchoolData: getSchoolData,
            });
        };
    }));

    it('It shuould initialize the variables', function () {
        createController();

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
        deferred.resolve({
            config: {},
            data: {
                data: {
                    'domains': [{
                        'id': '12342'
                    }, {
                            'id': '12341'
                        }, {
                            'id': '12340'
                        }],
                    'key': 'someType'
                },
                messageType: 'SUCCESS',
                status: 200,
                statusText: 'OK'
            }
        });


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
        deferred.resolve({
            config: {},
            data: {
                data: {
                    'domains': [{
                        'id': '12342'
                    }, {
                            'id': '12341'
                        }, {
                            'id': '12340'
                        }],
                    'key': 'someType'
                },
                messageType: 'ERROR',
                status: 200,
                statusText: 'OK'
            }
        });


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
        var obj = {
            data: {
                domains: [
                    {
                        "id": "46238884",
                        "name": "Gage Service District",
                        "userspace": "gsd-06",
                        "parentid": "34864588",
                        "reference": "gsd-06",
                        "guid": "693ff705-8958-4804-937b-2e5481f70e07",
                        "flags": 0,
                        "creationdate": "2016-02-10T06:08:47.583Z",
                        "creationby": "30750405",
                        "modifieddate": "2016-02-26T17:10:18.253Z",
                        "modifiedby": "46238944",
                        "version": "3",
                        "data": null
                    },
                    {
                        "id": "46238951",
                        "name": "School1",
                        "userspace": "s1-06",
                        "parentid": "46238884",
                        "reference": "s1-06",
                        "guid": "0dd41a6c-11bb-4ff2-9735-cb2553b48cb5",
                        "flags": 0,
                        "creationdate": "2016-02-10T06:13:52.113Z",
                        "creationby": "30750405",
                        "modifieddate": "2016-02-10T06:13:52.113Z",
                        "modifiedby": "30750405",
                        "version": "1",
                        "data": null
                    },
                    {
                        "id": "46239047",
                        "name": "School2",
                        "userspace": "s2-06",
                        "parentid": "46238884",
                        "reference": "s2-06",
                        "guid": "b6ea6150-e058-4c99-830f-38c38fff1370",
                        "flags": 0,
                        "creationdate": "2016-02-10T06:15:38.42Z",
                        "creationby": "30750405",
                        "modifieddate": "2016-02-10T06:15:38.42Z",
                        "modifiedby": "30750405",
                        "version": "1",
                        "data": null
                    }

                ]
            }
        };
        rootScope.role = 'admin';

        rootScope.userDetails = {
            data: {
                data: {
                    user: {
                        domainid: '46238884'
                    }
                }
            }
        };


        scope.filterDataTODisplay(obj);


        expect(scope.disrtictObj).toEqual([{
            "id": "46238884",
            "name": "Gage Service District",
            "userspace": "gsd-06",
            "parentid": "34864588",
            "reference": "gsd-06",
            "guid": "693ff705-8958-4804-937b-2e5481f70e07",
            "flags": 0,
            "creationdate": "2016-02-10T06:08:47.583Z",
            "creationby": "30750405",
            "modifieddate": "2016-02-26T17:10:18.253Z",
            "modifiedby": "46238944",
            "version": "3",
            "data": null
        }]);

        expect(scope.domainDataScholl).toEqual([{
            "id": "46238951",
            "name": "School1",
            "userspace": "s1-06",
            "parentid": "46238884",
            "reference": "s1-06",
            "guid": "0dd41a6c-11bb-4ff2-9735-cb2553b48cb5",
            "flags": 0,
            "creationdate": "2016-02-10T06:13:52.113Z",
            "creationby": "30750405",
            "modifieddate": "2016-02-10T06:13:52.113Z",
            "modifiedby": "30750405",
            "version": "1",
            "data": null
        },
            {
                "id": "46239047",
                "name": "School2",
                "userspace": "s2-06",
                "parentid": "46238884",
                "reference": "s2-06",
                "guid": "b6ea6150-e058-4c99-830f-38c38fff1370",
                "flags": 0,
                "creationdate": "2016-02-10T06:15:38.42Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-10T06:15:38.42Z",
                "modifiedby": "30750405",
                "version": "1",
                "data": null
            }]);

    });

    it('It shuould call the loadData method with Net ERROR  ', function () {
        var controller = createController();

        var dateStr = scope.dateStringFormat(new Date("October 21, 2016"));

        expect(dateStr).toEqual('2016-10-21');

    });

    it('It shuould call the get_course_catalog_Data method with messageType: SUCCESS ', function () {
        var controller = createController();
        spyOn(GetCourseCatalog, '_get').and.returnValue(deferred.promise);
        scope.disrtictObj = [{
            id: 'someid'
        }];
        var successObj = {
            data: {
                data: {
                    domains: '8765'
                },
                messageType: 'SUCCESS',
                status: 200,
                statusText: 'OK'
            }
        };

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
        rootScope.userDetails = {
            'data': {
                'data': {
                    'user': {
                        'domainid': '46238884'
                    }
                }
            }
        };
        rootScope.userDetails = {
            'data': {
                'data': {
                    'user': 'some value'
                }
            }
        };

        scope.existingCourseList = [
            {
                "schoolDistId": "46238884",
                "name": "Gage Service District",
                "userspace": "gsd-06",
                "parentid": "34864588",
                "reference": "gsd-06",
                "guid": "693ff705-8958-4804-937b-2e5481f70e07",
                "flags": 0,
                "creationdate": "2016-02-10T06:08:47.583Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-26T17:10:18.253Z",
                "modifiedby": "46238944",
                "version": "3",
                "data": null
            },
            {
                "schoolDistId": "46238951",
                "name": "School1",
                "userspace": "s1-06",
                "parentid": "46238884",
                "reference": "s1-06",
                "guid": "0dd41a6c-11bb-4ff2-9735-cb2553b48cb5",
                "flags": 0,
                "creationdate": "2016-02-10T06:13:52.113Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-10T06:13:52.113Z",
                "modifiedby": "30750405",
                "version": "1",
                "data": null
            },
            {
                "schoolDistId": "46239047",
                "name": "School2",
                "userspace": "s2-06",
                "parentid": "46238884",
                "reference": "s2-06",
                "guid": "b6ea6150-e058-4c99-830f-38c38fff1370",
                "flags": 0,
                "creationdate": "2016-02-10T06:15:38.42Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-10T06:15:38.42Z",
                "modifiedby": "30750405",
                "version": "1",
                "data": null
            }
        ];

        scope.removeSchoolDistFrmModal('46238884');

        expect(scope.existingCourseList.length).toEqual(2);

    });

    it('It shuould call the addSchoolDistIntoModal method with  PUSH ', function () {
        var controller = createController();

        scope.existingCourseList = [
            {
                "schoolDistId": "46238884",
                "name": "Gage Service District",
                "userspace": "gsd-06",
                "parentid": "34864588",
                "reference": "gsd-06",
                "guid": "693ff705-8958-4804-937b-2e5481f70e07",
                "flags": 0,
                "creationdate": "2016-02-10T06:08:47.583Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-26T17:10:18.253Z",
                "modifiedby": "46238944",
                "version": "3",
                "data": null
            },
            {
                "schoolDistId": "46238951",
                "name": "School1",
                "userspace": "s1-06",
                "parentid": "46238884",
                "reference": "s1-06",
                "guid": "0dd41a6c-11bb-4ff2-9735-cb2553b48cb5",
                "flags": 0,
                "creationdate": "2016-02-10T06:13:52.113Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-10T06:13:52.113Z",
                "modifiedby": "30750405",
                "version": "1",
                "data": null
            },
            {
                "schoolDistId": "46239047",
                "name": "School2",
                "userspace": "s2-06",
                "parentid": "46238884",
                "reference": "s2-06",
                "guid": "b6ea6150-e058-4c99-830f-38c38fff1370",
                "flags": 0,
                "creationdate": "2016-02-10T06:15:38.42Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-10T06:15:38.42Z",
                "modifiedby": "30750405",
                "version": "1",
                "data": null
            }
        ];
        scope.addSchoolDistIntoModal('46238884', 'school1', {
            'obj': 'some object'
        }, 'xyz');


        expect(scope.existingCourseList.length).toEqual(4);

    });

    it('It shuould call the updateNewCourseForSchool method with  PUSH ', function () {
        var controller = createController();

        scope.schollNewCousreList = [
            {
                "schoolDistId": "46238884",
                "name": "Gage Service District",
                "userspace": "gsd-06",
                "parentid": "34864588",
                "reference": "gsd-06",
                "guid": "693ff705-8958-4804-937b-2e5481f70e07",
                "flags": 0,
                "creationdate": "2016-02-10T06:08:47.583Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-26T17:10:18.253Z",
                "modifiedby": "46238944",
                "version": "3",
                "data": null
            },
            {
                "schoolDistId": "46238951",
                "name": "School1",
                "userspace": "s1-06",
                "parentid": "46238884",
                "reference": "s1-06",
                "guid": "0dd41a6c-11bb-4ff2-9735-cb2553b48cb5",
                "flags": 0,
                "creationdate": "2016-02-10T06:13:52.113Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-10T06:13:52.113Z",
                "modifiedby": "30750405",
                "version": "1",
                "data": null
            },
            {
                "schoolDistId": "46239047",
                "name": "School2",
                "userspace": "s2-06",
                "parentid": "46238884",
                "reference": "s2-06",
                "guid": "b6ea6150-e058-4c99-830f-38c38fff1370",
                "flags": 0,
                "creationdate": "2016-02-10T06:15:38.42Z",
                "creationby": "30750405",
                "modifieddate": "2016-02-10T06:15:38.42Z",
                "modifiedby": "30750405",
                "version": "1",
                "data": null
            }
        ];
        scope.updateNewCourseForSchool('some course array list', {
            'id': 'someid',
            'name': 'some Name',
        });

        expect(scope.schollNewCousreList.length).toEqual(4);

    });
    it('It shuould call the getNewCourseListForScholl  method with messageType: Success ', function () {
        var controller = createController();

        spyOn(GetNewCourseCatSchool, '_get').and.returnValue(deferred.promise);
        spyOn(scope, 'updateNewCourseForSchool').and.returnValue('some text');
        spyOn(scope, 'buildMainModal').and.returnValue('some text');

        var domainObj = {
            id: 'some id',
            name: 'some name'
        }
        scope.disrtictObj = [{
            "id": "46238884",
            "name": "Gage Service District",
            "userspace": "gsd-06",
            "parentid": "34864588",
            "reference": "gsd-06",
            "guid": "693ff705-8958-4804-937b-2e5481f70e07",
            "flags": 0,
            "creationdate": "2016-02-10T06:08:47.583Z",
            "creationby": "30750405",
            "modifieddate": "2016-02-26T17:10:18.253Z",
            "modifiedby": "46238944",
            "version": "3",
            "data": null
        }];

        scope.getNewCourseListForScholl(domainObj)

        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({
            data: {
                data: {
                    domains: '8765',
                    course: 'some course'
                },
                messageType: 'SUCCESS',
                status: 200,
                statusText: 'OK'
            }
        });
        scope.$apply();

        expect(GetNewCourseCatSchool._get).toHaveBeenCalled();
        expect(scope.newCourseCatLodingLayer).toEqual(false);

        // expect(scope.schollNewCousreList.length).toEqual(4);

    });

    it('It shuould call the get_district_School_Data  method with messageType: Error on 200 ', function () {
        var controller = createController();

        spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);
        spyOn(notAuthenticated, '_showErrorMsg').and.returnValue('some text');

        rootScope.userDetails = {
            'data': {
                'data': {
                    'user': {
                        'domainid': '46238884'
                    }
                }
            }
        };

        scope.get_district_School_Data();

        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({
            data: {
                data: {
                    domains: '8765',
                    course: 'some course'
                },
                messageType: 'ERROR',
                status: 200,
                statusText: 'OK'
            }
        });
        scope.$apply();

        expect(getSchoolData._get).toHaveBeenCalled();
        expect(notAuthenticated._showErrorMsg).toHaveBeenCalled();
        expect(scope.distSchollLodingLayer).toEqual(false);


    });

    it('It shuould call the get_district_School_Data  method with messageType: Error on 500 ', function () {
        var controller = createController();

        spyOn(getSchoolData, '_get').and.returnValue(deferred.promise);
        spyOn(noNetError, '_showNetErrorMsg').and.returnValue('some text');

        rootScope.userDetails = {
            'data': {
                'data': {
                    'user': {
                        'domainid': '46238884'
                    }
                }
            }
        };

        scope.get_district_School_Data();

        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();
        scope.$apply();

        expect(getSchoolData._get).toHaveBeenCalled();
        expect(noNetError._showNetErrorMsg).toHaveBeenCalled();
        expect(scope.distSchollLodingLayer).toEqual(false);
    });

    //updateExistingCourseModal = function (schdist_Id, distschoolChkval, itemName, chkbxidstr) {
    it('It shuould call the updateExistingCourseModal  method  ', function () {
        var controller = createController();

        spyOn(GetExistingCourseCat, '_get').and.returnValue(deferred.promise);
        spyOn(scope, 'addSchoolDistIntoModal').and.returnValue('some text');

        rootScope.userDetails = {
            'data': {
                'data': {
                    'user': {
                        'domainid': '46238884'
                    }
                }
            }
        };

        var schdist_Id = 'someID',
            distschoolChkval = true,
            itemName = 'someName',
            chkbxidstr = 'chkBoxIdStr';

        scope.updateExistingCourseModal(schdist_Id, distschoolChkval, itemName, chkbxidstr);

        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({
            data: {
                data: {
                    domains: '8765',
                    course: 'some course'
                },
                messageType: 'SUCCESS',
                status: 200,
                statusText: 'OK'
            }
        });
        scope.$apply();



        expect(GetExistingCourseCat._get).toHaveBeenCalled();
        //expect(noNetError._showNetErrorMsg).toHaveBeenCalled();
        expect(scope.addSchoolDistIntoModal).toHaveBeenCalled();
    });

    it('It shuould call the updateExistingCourseModal  method  wit dist = false', function () {
        var controller = createController();

        spyOn(scope, 'onCourseChkUpdate').and.returnValue('some text');
        spyOn(scope, 'removeSchoolDistFrmModal').and.returnValue('some text');

        rootScope.userDetails = {
            'data': {
                'data': {
                    'user': {
                        'domainid': '46238884'
                    }
                }
            }
        };

        var schdist_Id = 'someID',
            distschoolChkval = false,
            itemName = 'someName',
            chkbxidstr = 'chkBoxIdStr';

        scope.updateExistingCourseModal(schdist_Id, distschoolChkval, itemName, chkbxidstr);

        expect(scope.onCourseChkUpdate).toHaveBeenCalled();
        expect(scope.removeSchoolDistFrmModal).toHaveBeenCalled();
    });


    it('It shuould call the checkSchoolOrDist   method  wit dist = false', function () {
        var controller = createController();


        var schdist_Id = 'NonDistID';

        scope.disrtictObj = [{
            'id': 'DIST'
        }]

        var returnVal = scope.checkSchoolOrDist(schdist_Id);

        expect(returnVal).toBe(false);
    });

    it('It shuould call the checkSchoolOrDist   method  wit dist = false', function () {
        var controller = createController();


        var schdist_Id = 'DIST';

        scope.disrtictObj = [{
            'id': 'DIST'
        }]

        var returnVal = scope.checkSchoolOrDist(schdist_Id);

        expect(returnVal).toBe(true);
    });

    it('It should call removeNewSchollCourseFrmModal method', function () {
        var controller = createController();
        var domainObj = {
            'name': 'abc'
        };
        scope.schollNewCousreList = [{
            'schoolName': 'abc'
        }];
        var len = scope.schollNewCousreList.length;
        scope.removeNewSchollCourseFrmModal(domainObj);
    });

    it('It should call addDataForCopyApi method', function () {
        var controller = createController();
        scope.mainCourseArryAsModal = [{
            'courseList': [{
                'name': 'abc',
                'domainType': 'DISTRICT',
                'Domain_ID': scope.disrtictObj[0].id
            }]
        }];

        var len = scope.mainCourseArryAsModal[0].courseList.length;
        //var len;
        scope.addDataForCopyApi();

        // expect(len).toBe(scope.mainCourseArryAsModal[0].courseList.length);
        expect(scope.mainCourseArryAsModal[0].courseList[0].domainType).toEqual('DISTRICT');
        expect(scope.mainCourseArryAsModal[0].courseList[0].Domain_ID).toEqual(scope.disrtictObj[0].id);
    });

    describe('showModalPopup spec', function () {
        // var controller = createController();

        beforeEach(function () {
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['text', 'modal']);
            angular.element.and.returnValue(angularHtml);

        });
        it('call with showModalPopup spec', function () {
            var controller = createController();
            scope.showModalPopup('msg');
            expect(angular.element).toHaveBeenCalledWith('#modalContent');
            expect(angular.element().text).toHaveBeenCalledWith('msg');
            expect(angular.element).toHaveBeenCalledWith('#msgModal');
            expect(angular.element().modal).toHaveBeenCalledWith('show');
        });
    });


    describe('It should call onCourseChkUpdate method', function () {
        beforeEach(function () {
            spyOn(angular, 'element').and.callThrough();
            //            spyOn(scope, 'getNewCourseListForDistrict');

            angularHtml = jasmine.createSpyObj(angular.element, ['is']);
            angular.element.and.returnValue(angularHtml);

        });
        it('It should call onCourseChkUpdate method for true', function () {
            var controller = createController();
            spyOn(scope, 'getSecectedCourseCatalog').and.returnValue([1, 2]);
            //spyOn(scope, 'getNewCourseListForDistrict');
            spyOn(scope, 'buildMainModal');
            var isDistSelected = true;

            scope.onCourseChkUpdate('idx', 'chkbxidstr');

            var idArrayOfSelectedCourseCat = scope.getSecectedCourseCatalog();
            expect(idArrayOfSelectedCourseCat).toEqual([1, 2]);
            expect(scope.getSecectedCourseCatalog).toHaveBeenCalled();

            expect(angular.element).toHaveBeenCalledWith('#distCollapsable');
            expect(angular.element().is).toHaveBeenCalledWith(":checked");
            //expect(scope.getNewCourseListForDistrict).toHaveBeenCalled();
            expect(scope.buildMainModal).toHaveBeenCalled();
            // expect(scope.getNewCourseListForDistrict).toHaveBeenCalled();
            //          expect(scope.getNewCourseListForDistrict).toHaveBeenCalled();           

        });
    });

    describe('It should call callAjx method', function () {

        var schdist_Id = 0;
        var itemName = "some";
        var domainObj = "value";
        var distObjId = "few";

        it('callAjx spec true', function () {
            createController();
            spyOn(scope, 'getNewCourseListForDistrict');
            var chkbxidstr = 'distCollapsable';
            scope.callAjx(schdist_Id, chkbxidstr, itemName, domainObj, distObjId);

            expect(scope.getNewCourseListForDistrict).toHaveBeenCalled();
        });
        it('callAjx spec false', function () {
            createController();
            spyOn(scope, 'getNewCourseListForScholl');
            var chkbxidstr = 'someValue';
            scope.callAjx(schdist_Id, chkbxidstr, itemName, domainObj, distObjId);
            expect(scope.getNewCourseListForScholl).toHaveBeenCalledWith(domainObj);
        });
    });


    describe('It should call uncheckAllCourseCatalog method', function () {
        beforeEach(function () {
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['each']);
            angular.element.and.returnValue(angularHtml);
        });
        it('dsjk', function () {
            createController();
            scope.uncheckAllCourseCatalog();
            expect(angular.element).toHaveBeenCalledWith("#courseCatlogs input:checkbox:checked");
            // expect(angular.element().each).toHaveBeenCalledWith("some_value");
        });
    });


    describe('It should call onCourseTypeClick method', function () {

        //        beforeEach(function(){
        //            spyOn()
        //        })
        it('onCourseTypeClick spec true', function () {

            createController();
            spyOn(scope, 'getNewCourseListForDistrict');
            scope.courseType = 'Continuous';
            scope.onCourseTypeClick();
            expect(scope.hideCalenderArea).toBe(true);
        });

        it('onCourseTypeClick spec false', function () {

            createController();
            spyOn(scope, 'getNewCourseListForDistrict');
            scope.courseType = 'some';
            scope.onCourseTypeClick();
            expect(scope.hideCalenderArea).toBe(false);
        });
    });


    describe('It should call onNewCourseClick method', function () {
        beforeEach(function () {
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['is', 'prop']);
            angular.element.and.returnValue(angularHtml);
        });
        it('onNewCourseClick method', function () {
            var val = false,
                parentChkBoxId = '#checkboxMainNewCourse_pIndex';
            createController();
            scope.onNewCourseClick('idStr', 'pIndex');
            expect(angular.element).toHaveBeenCalledWith('#' + 'idStr');
            expect(angular.element().is).toHaveBeenCalledWith(":checked");
            expect(val).toBe(false);
            expect(parentChkBoxId).toBe('#checkboxMainNewCourse_' + 'pIndex');
            // expect(angular.element).toHaveBeenCalledWith(parentChkBoxId);
            // expect(angular.element().prop).toHaveBeenCalledWith('checked', false);
        });
    });

    //    $scope.go = function (path) {
    //            $location.path(path);
    //        };


    it('It should call go method', function () {
        spyOn($location, 'path');
        //        scope.go = function (path);
        createController();
        scope.go('path');
        expect($location.path).toHaveBeenCalledWith('path');
    });

    describe('It should call onclicktoggleicon  method', function () {

        it('onclicktoggleicon spec true', function () {
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['removeClass', 'addClass', 'hasClass']);
            angular.element.and.returnValue(angularHtml);
            angular.element().hasClass.and.returnValue(true);
            createController();
            scope.onclicktoggleicon('someValue');
            expect(angular.element).toHaveBeenCalledWith("#someValue");
            expect(angular.element().addClass).toHaveBeenCalledWith('fa-caret-up');
            expect(angular.element().removeClass).toHaveBeenCalledWith('fa-caret-down');

        });

        it('onclicktoggleicon spec false', function () {
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['removeClass', 'addClass', 'hasClass']);
            angular.element.and.returnValue(angularHtml);
            angular.element().hasClass.and.returnValue(false);
            createController();
            scope.onclicktoggleicon('someValue');
            expect(angular.element).toHaveBeenCalledWith("#someValue");
            expect(angular.element().addClass).toHaveBeenCalledWith('fa-caret-down');
            expect(angular.element().removeClass).toHaveBeenCalledWith('fa-caret-up');

        });

    });
    describe('It should call onDistSchollChkUpdate  method', function () {

        it('common code', function () {
            createController();
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['is', 'attr', 'removeAttr']);
            angular.element.and.returnValue(angularHtml);
            angular.element().is.and.returnValue(false);
            spyOn(scope, 'updateExistingCourseModal').and.callThrough();
            spyOn(scope, 'buildMainModal');
            var domainObj = {
                a: 2,
                b: 3
            }
            scope.multiselectExistingCatalog = [{}, {}];
            scope.onDistSchollChkUpdate(1, 'distCollapsable', 'itemName', domainObj, 2);
            expect(scope.updateExistingCourseModal).toHaveBeenCalledWith(1, false, 'itemName', 'distCollapsable');
            expect(scope.isDistNotSelected).toBe(true);
            expect(angular.element).toHaveBeenCalledWith('#existCatlist button');
            expect(angular.element().attr).toHaveBeenCalled();
            expect(scope.buildMainModal).toHaveBeenCalled();


        });
        it('not distCollapsable', function () {

            createController();
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['is', 'attr', 'removeAttr']);
            angular.element.and.returnValue(angularHtml);
            angular.element().is.and.returnValue(false);
            spyOn(scope, 'updateExistingCourseModal');
            spyOn(scope, 'buildMainModal');
            spyOn(scope, 'removeNewSchollCourseFrmModal');
            var domainObj = {
                a: 2,
                b: 3
            }
            scope.multiselectExistingCatalog = [{}, {}];
            scope.onDistSchollChkUpdate(1, 're', 'itemName', domainObj, 2);
            expect(scope.updateExistingCourseModal).toHaveBeenCalledWith(1, false, 'itemName', 're');
            expect(scope.isDistNotSelected).toBe(true);
            expect(angular.element).toHaveBeenCalledWith('#existCatlist button');
            expect(angular.element().attr).toHaveBeenCalled();
            expect(scope.buildMainModal).toHaveBeenCalled();
            expect(scope.removeNewSchollCourseFrmModal).toHaveBeenCalledWith(domainObj);



        })

    });

    describe('It should call addDistPostFix  method', function () {


        it('addDistPostFix', function () {
            createController();
            var samp = [{
                courseList: [{
                    courseFrom: 'good',
                    Domain_ID: '2',
                    domainType: 'fb'
                }],
                schoolDomainId: '5'
            }]
            scope.addDistPostFix(samp);
            expect(samp[0].courseList[0].courseFrom).toBe(" (District)");
            expect(samp[0].courseList[0].Domain_ID).toBe('5');
            expect(samp[0].courseList[0].domainType).toBe('SCHOOL');
        });

    });

    describe('getCopyOfScholls spec', function () {

        it('getCopyOfScholls calls', function () {
            createController();
            scope.multiselectExistingCatalog = [{}, {}];
            spyOn(angular, 'copy').and.returnValue([1, 2, 3]);

            spyOn(scope, 'addDistPostFix');
            spyOn(scope, 'getSecectedCourseCatalog').and.returnValue([1, 2, 3]);
            spyOn(scope, 'addDistrictObjects');
            scope.getCopyOfScholls();
            scope.schollNewCousreList = [1, 2, 3]
            expect(angular.copy).toHaveBeenCalledWith([]);
            expect(scope.addDistPostFix).toHaveBeenCalledWith([1, 2, 3]);
            expect(scope.getSecectedCourseCatalog).toHaveBeenCalled();
            //expect(scope.addDistrictObjects).toHaveBeenCalledWith([1, 2, 3]);


        });
    });
    
    
    
     describe('handleCopyEvent  spec', function () {

        it('handleCopyEvent calls wit Success response', function () {
            createController();
           // scope.multiselectExistingCatalog = [{}, {}];
         
            spyOn(angular, 'element').and.returnValue([1, 2, 3]);
            spyOn(scope, 'getSelectedNewCourses').and.returnValue([1, 2, 3]);
            spyOn( postcopycourse, '_post').and.returnValue(deferred.promise);
            spyOn(scope, 'getAllSelectedDistNSchool');
            spyOn(scope, 'showModalPopup');
            
           
            
            scope.handleCopyEvent();
            
            deferred.resolve({ config: {}, data: {
                 data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' },
                 messageType: 'SUCCESS', status: 200, statusText: 'OK' } });
            scope.$apply();
            
            scope.schollNewCousreList = [1, 2, 3]
            
            expect(scope.showWholePgLoading).toBe(true);
            
            expect(angular.element).toHaveBeenCalledWith("#newcourseCatlogs input:checkbox:checked");
            
             expect(scope.getAllSelectedDistNSchool).toHaveBeenCalled();
             expect(scope.showModalPopup).toHaveBeenCalledWith("New Courses has been copied successfully.");
            expect(scope.getSelectedNewCourses).toHaveBeenCalled();
            expect(postcopycourse._post).toHaveBeenCalled();
        });
        
             it('handleCopyEvent calls wit Success response', function () {
            createController();
         
            spyOn(angular, 'element').and.returnValue([1, 2, 3]);
            spyOn(scope, 'getSelectedNewCourses').and.returnValue([1, 2, 3]);
            spyOn( postcopycourse, '_post').and.returnValue(deferred.promise);
            spyOn(scope, 'getAllSelectedDistNSchool');
            spyOn(scope, 'showModalPopup');
            
           
            
            scope.handleCopyEvent();
            
            deferred.resolve({ config: {}, data: {
                 data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' },
                 messageType: 'ERROR', status: 200, statusText: 'OK' } });
            scope.$apply();
            
            scope.schollNewCousreList = [1, 2, 3]
            
            expect(scope.showWholePgLoading).toBe(false);
            
            expect(angular.element).toHaveBeenCalledWith("#newcourseCatlogs input:checkbox:checked");
            
             expect(scope.showModalPopup).toHaveBeenCalledWith("New Courses did not get copied, Please try again");
            expect(scope.getSelectedNewCourses).toHaveBeenCalled();
            expect(postcopycourse._post).toHaveBeenCalled();


        });
           it('handleCopyEvent calls with Defered or Rjected Call', function () {
            createController();
         
            spyOn(angular, 'element').and.returnValue([1, 2, 3]);
            spyOn(scope, 'getSelectedNewCourses').and.returnValue([1, 2, 3]);
            spyOn( postcopycourse, '_post').and.returnValue(deferred.promise);
            spyOn(scope, 'getAllSelectedDistNSchool');
            spyOn(scope, 'showModalPopup');
            
           
            
            scope.handleCopyEvent();
            
            deferred.reject();;
            scope.$apply();
            
            scope.schollNewCousreList = [1, 2, 3]
            
            expect(scope.showWholePgLoading).toBe(false);
            
            expect(angular.element).toHaveBeenCalledWith("#newcourseCatlogs input:checkbox:checked");
            
             expect(scope.showModalPopup).toHaveBeenCalledWith("New Courses did not get copied, Please try again");
            expect(scope.getSelectedNewCourses).toHaveBeenCalled();
            expect(postcopycourse._post).toHaveBeenCalled();


        });
    });


});