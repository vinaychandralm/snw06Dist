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

        createController = function () {
            return $controller('courseMgmtCtrl', {
                $rootScope: rootScope,
                $scope: scope,
                notAuthenticated: notAuthenticated,
                noNetError: noNetError,
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
        createController();

        $routeParams.role = 'admin';
        spyOn(scope, 'get_district_School_Data').and.returnValue('Some text');

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
        createController();

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
        createController();

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
        createController();
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
        createController();

        var dateStr = scope.dateStringFormat(new Date("October 21, 2016"));

        expect(dateStr).toEqual('2016-10-21');

    });

    it('It shuould call the get_course_catalog_Data method with messageType: SUCCESS ', function () {
        createController();
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
    it('It shuould call the get_course_catalog_Data method with messageType: ERROR ', function () {
        createController();
        spyOn(GetCourseCatalog, '_get').and.returnValue(deferred.promise);
        scope.disrtictObj = [{
            id: 'someid'
        }];
        var successObj = {
            data: {
                data: {
                    domains: '8765'
                },
                messageType: 'ERROR',
                status: 200,
                statusText: 'OK'
            }
        };

        scope.get_course_catalog_Data();

        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve(successObj);

        // We have to call apply for this to work
        scope.$apply();

        expect(scope.courseCatLodingLayer).toBe(false);
        expect(scope.distSchollLodingLayer).toBe(false);

        expect(scope.courseCatalogList).toEqual(successObj.data.data.domains);
        expect(GetCourseCatalog._get).toHaveBeenCalledWith(scope.disrtictObj[0].id);
    });
    it('It shuould call the get_course_catalog_Data method with messageType: Defered ', function () {
        createController();
        spyOn(GetCourseCatalog, '_get').and.returnValue(deferred.promise);
        scope.disrtictObj = [{
            id: 'someid'
        }];
        var successObj = {
            data: {
                data: {
                    domains: '8765'
                },
                messageType: 'ERROR',
                status: 200,
                statusText: 'OK'
            }
        };

        scope.get_course_catalog_Data();

        // Setup the data we wish to return for the .then function in the controller
        deferred.reject();

        // We have to call apply for this to work
        scope.$apply();

        expect(scope.courseCatLodingLayer).toBe(false);
        // expect(scope.distSchollLodingLayer).toBe(false);

        // expect(scope.courseCatalogList).toEqual(successObj.data.data.domains);
        expect(GetCourseCatalog._get).toHaveBeenCalledWith(scope.disrtictObj[0].id);
    });


    it('It shuould call the removeSchoolDistFrmModal method with messageType: SUCCESS ', function () {
        createController();

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
        createController();

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
        createController();

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
        createController();

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
    it('It shuould call the getNewCourseListForScholl  method with messageType: ERROR ', function () {
        createController();

        spyOn(GetNewCourseCatSchool, '_get').and.returnValue(deferred.promise);
        spyOn(scope, 'updateNewCourseForSchool').and.returnValue('some text');
        spyOn(scope, 'buildMainModal').and.returnValue('some text');
        spyOn(scope, 'newCourseCatLodingLayerOnOff').and.returnValue(true);

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
                messageType: 'ERROR',
                status: 200,
                statusText: 'OK'
            }
        });
        scope.$apply();

        expect(GetNewCourseCatSchool._get).toHaveBeenCalled();
        expect(scope.newCourseCatLodingLayer).toEqual(true);
        expect(scope.newCourseCatLodingLayerOnOff).toHaveBeenCalled();

        // expect(scope.schollNewCousreList.length).toEqual(4);

    });
    it('It shuould call the getNewCourseListForScholl  method with messageType: Defered Object ', function () {
        createController();

        spyOn(GetNewCourseCatSchool, '_get').and.returnValue(deferred.promise);
        spyOn(scope, 'updateNewCourseForSchool').and.returnValue('some text');
        spyOn(scope, 'buildMainModal').and.returnValue('some text');
        spyOn(scope, 'newCourseCatLodingLayerOnOff').and.returnValue(true);

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
        deferred.reject();
        scope.$apply();

        expect(GetNewCourseCatSchool._get).toHaveBeenCalled();
        expect(scope.newCourseCatLodingLayer).toEqual(true);
        expect(scope.newCourseCatLodingLayerOnOff).toHaveBeenCalled();

        // expect(scope.schollNewCousreList.length).toEqual(4);

    });

    it('It shuould call the get_district_School_Data  method with messageType: Error on 200 ', function () {
        createController();

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
        createController();

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

    it('It shuould call the updateExistingCourseModal  method  ', function () {
        createController();

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
        expect(scope.addSchoolDistIntoModal).toHaveBeenCalled();
    });

    it('It shuould call the updateExistingCourseModal  method  wit dist = false', function () {
        createController();

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
        createController();


        var schdist_Id = 'NonDistID';

        scope.disrtictObj = [{
            'id': 'DIST'
        }]

        var returnVal = scope.checkSchoolOrDist(schdist_Id);

        expect(returnVal).toBe(false);
    });

    it('It shuould call the checkSchoolOrDist   method  wit dist = false', function () {
        createController();


        var schdist_Id = 'DIST';

        scope.disrtictObj = [{
            'id': 'DIST'
        }]

        var returnVal = scope.checkSchoolOrDist(schdist_Id);

        expect(returnVal).toBe(true);
    });

    it('It should call removeNewSchollCourseFrmModal method', function () {
        createController();
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
        createController();
        scope.mainCourseArryAsModal = [{
            'courseList': [{
                'name': 'abc',
                'domainType': 'DISTRICT',
                'Domain_ID': scope.disrtictObj[0].id
            }]
        }];

        var len = scope.mainCourseArryAsModal[0].courseList.length;
        scope.addDataForCopyApi();

        expect(scope.mainCourseArryAsModal[0].courseList[0].domainType).toEqual('DISTRICT');
        expect(scope.mainCourseArryAsModal[0].courseList[0].Domain_ID).toEqual(scope.disrtictObj[0].id);
    });

    describe('showModalPopup spec', function () {

        beforeEach(function () {
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['text', 'modal']);
            angular.element.and.returnValue(angularHtml);

        });
        it('call with showModalPopup spec', function () {
            createController();
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

            angularHtml = jasmine.createSpyObj(angular.element, ['is']);
            angular.element.and.returnValue(angularHtml);

        });
        it('It should call onCourseChkUpdate method for true', function () {
            createController();
            spyOn(scope, 'getSecectedCourseCatalog').and.returnValue([1, 2]);
            spyOn(scope, 'buildMainModal');
            var isDistSelected = true;

            scope.onCourseChkUpdate('idx', 'chkbxidstr');

            var idArrayOfSelectedCourseCat = scope.getSecectedCourseCatalog();
            expect(idArrayOfSelectedCourseCat).toEqual([1, 2]);
            expect(scope.getSecectedCourseCatalog).toHaveBeenCalled();

            expect(angular.element).toHaveBeenCalledWith('#distCollapsable');
            expect(angular.element().is).toHaveBeenCalledWith(":checked");
            expect(scope.buildMainModal).toHaveBeenCalled();

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
        });
    });


    describe('It should call onCourseTypeClick method', function () {

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
        });
    });


    it('It should call go method', function () {
        spyOn($location, 'path');
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

        });
    });



    describe('handleCopyEvent  spec', function () {

        it('handleCopyEvent calls wit Success response', function () {
            createController();
            spyOn(angular, 'element').and.returnValue([1, 2, 3]);
            spyOn(scope, 'getSelectedNewCourses').and.returnValue([1, 2, 3]);
            spyOn(postcopycourse, '_post').and.returnValue(deferred.promise);
            spyOn(scope, 'getAllSelectedDistNSchool');
            spyOn(scope, 'showModalPopup');
            spyOn(scope, 'updateRespectiveColumns');




            scope.handleCopyEvent();

            deferred.resolve({
                config: {}, data: {
                    data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' },
                    messageType: 'SUCCESS', status: 200, statusText: 'OK'
                }
            });
            scope.$apply();

            $timeout(function () {
                scope.updateRespectiveColumns();
            }, 900);
            expect(scope.updateRespectiveColumns).not.toHaveBeenCalled();
            $timeout.flush(1000);
            expect(scope.updateRespectiveColumns).toHaveBeenCalled();




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
            spyOn(postcopycourse, '_post').and.returnValue(deferred.promise);
            spyOn(scope, 'getAllSelectedDistNSchool');
            spyOn(scope, 'showModalPopup');



            scope.handleCopyEvent();

            deferred.resolve({
                config: {}, data: {
                    data: { 'domains': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' },
                    messageType: 'ERROR', status: 200, statusText: 'OK'
                }
            });
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
            spyOn(postcopycourse, '_post').and.returnValue(deferred.promise);
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


    describe('getNewCourseListForDistrict   spec', function () {

        it('getNewCourseListForDistrict  calls with Success response', function () {
            createController();
            scope.disrtictObj = [{ 'id': "idtsr" }];
            spyOn(scope, 'getSecectedCourseCatalog').and.returnValue([1, 2, 3]);
            spyOn(GetNewCourseCatDist, '_get').and.returnValue(deferred.promise);
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['is']);
            angular.element.and.returnValue(angularHtml);
            angular.element().is.and.returnValue(true);
            spyOn(angular, 'copy').and.callThrough();;
            spyOn(scope, 'newCourseCatLodingLayerOnOff').and.returnValue(true);
            spyOn(scope, 'buildMainModal');
            scope.getNewCourseListForDistrict();
            deferred.resolve({
                config: {}, data: {
                    data: { 'course': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' },
                    messageType: 'SUCCESS', status: 200, statusText: 'OK'
                }
            });
            scope.$apply();

            expect(angular.element).toHaveBeenCalledWith('#distCollapsable');
            expect(angular.element().is).toHaveBeenCalled();
            expect(scope.newCourseCatLodingLayer).toBe(true);
            expect(scope.DistNewCourseArray).toEqual([{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }]);
            expect(scope.buildMainModal).toHaveBeenCalled();
            expect(scope.getSecectedCourseCatalog).toHaveBeenCalled();
            expect(angular.copy).toHaveBeenCalled();
        });
        it('getNewCourseListForDistrict  calls with ERROR response', function () {
            createController();
            scope.disrtictObj = [{ 'id': "idtsr" }];
            spyOn(scope, 'getSecectedCourseCatalog').and.returnValue([1, 2, 3]);
            spyOn(GetNewCourseCatDist, '_get').and.returnValue(deferred.promise);
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['is']);
            angular.element.and.returnValue(angularHtml);
            angular.element().is.and.returnValue(true);
            spyOn(scope, 'newCourseCatLodingLayerOnOff').and.returnValue(true);
            scope.getNewCourseListForDistrict();
            deferred.resolve({
                config: {}, data: {
                    data: { 'course': [{ 'id': '12342' }, { 'id': '12341' }, { 'id': '12340' }], 'key': 'someType' },
                    messageType: 'ERROR', status: 200, statusText: 'OK'
                }
            });
            scope.$apply();

            expect(angular.element).toHaveBeenCalledWith('#distCollapsable');
            expect(angular.element().is).toHaveBeenCalled();
            expect(scope.getSecectedCourseCatalog).toHaveBeenCalled();
            expect(scope.newCourseCatLodingLayer).toBe(true);
        });
        it('getNewCourseListForDistrict  calls with Defered response', function () {
            createController();
            scope.disrtictObj = [{ 'id': "idtsr" }];
            spyOn(scope, 'getSecectedCourseCatalog').and.returnValue([1, 2, 3]);
            spyOn(GetNewCourseCatDist, '_get').and.returnValue(deferred.promise);
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['is']);
            angular.element.and.returnValue(angularHtml);
            angular.element().is.and.returnValue(true);
            spyOn(scope, 'newCourseCatLodingLayerOnOff').and.returnValue(true);
            scope.getNewCourseListForDistrict();
            deferred.reject();
            scope.$apply();

            expect(angular.element).toHaveBeenCalledWith('#distCollapsable');
            expect(scope.getSecectedCourseCatalog).toHaveBeenCalled();
            expect(angular.element().is).toHaveBeenCalled();
            expect(scope.newCourseCatLodingLayer).toBe(true);
        });
    });
    describe('buildMainModal spec', function () {
        it("common code", function () {
            createController();

            var obj = {};
            obj.schoolDomainId = scope.disrtictObj[0].id;
            obj.schoolName = scope.disrtictObj[0].name
            obj.courseList = scope.DistNewCourseArray;
            //scope.mainCourseArryAsModal.push(obj);
            spyOn(scope, 'getSecectedCourseCatalog').and.callThrough();
            spyOn(angular, 'element').and.callThrough();
            spyOn(scope, 'addDataForCopyApi');
            angularHtml = jasmine.createSpyObj(angular.element, ['is']);
            angular.element.and.returnValue(angularHtml);
            angular.element().is.and.returnValue(true)
            scope.mainCourseArryAsModal = [];
            scope.multiselectExistingCatalog = [{}, {}];
            scope.buildMainModal();
            expect(scope.getSecectedCourseCatalog).toHaveBeenCalled();
            expect(angular.element).toHaveBeenCalledWith('#distCollapsable');
            expect(angular.element().is).toHaveBeenCalledWith(":checked");
            expect(scope.addDataForCopyApi).toHaveBeenCalled();
            expect(scope.mainCourseArryAsModal).toEqual([{
                schoolDomainId: 'someid',
                schoolName: undefined,
                courseList: null
            }])
        });

        describe('addDistrictObjects spec', function () {
            it('addDistrictObjects', function () {
                createController();
                scope.DistNewCourseArray = [{
                    '1': '01'
                }, {
                        '2': '02'
                    }];


                var tempSchollArray = [{
                    courseList: [],
                    schoolDomainId: '5',

                }]
                scope.addDistrictObjects(tempSchollArray);
                var expRes = [{
                    courseList: [
                        {
                            1: '01',
                            courseFrom: ' (Course Catalog)',
                            Domain_ID: '5',
                            domainType: 'COURSE CATALOG'
                        },
                        {
                            2: '02',
                            courseFrom: ' (Course Catalog)',
                            Domain_ID: '5',
                            domainType: 'COURSE CATALOG'
                        }],
                    schoolDomainId: '5'
                }]
                expect(tempSchollArray).toEqual(expRes);

            });

        });
        it('updateRespectiveColumns  spec', function () {
            createController();
            var idArrayofDistSchool = [1, 2];
            spyOn(angular, 'element').and.callThrough();
            angularHtml = jasmine.createSpyObj(angular.element, ['triggerHandler']);
            angular.element.and.returnValue(angularHtml);
            var len = 2;
            scope.updateRespectiveColumns(idArrayofDistSchool);
            expect(angular.element).toHaveBeenCalledWith('#' + idArrayofDistSchool[0]);
            expect(angular.element().triggerHandler).toHaveBeenCalledWith("click");

        });
    });

    // describe('getSelectedNewCourses spec', function () {
    //     beforeEach(function () {
    //         spyOn(angular, 'element').and.callFake(function(){
    //             return jQuery(["<div data-domainid='1' data-courseid='10' data-domaintype='school'></div>","<div data-domain-id='2' data-courseid='20' data-domaintype='school'></div>"])
    //         });
    //         //createController();
    //     });
    //     afterEach(function(){
    //        angular.element.and.callThrough(); 
    //     });
    //     var objArrayOfSelected = [];
    //     var obj = {};
    //     it('tesing getSelectedNewCourses', function () {
    //         createController();
    //         scope.courseType = "DemoCouresType"
    //         var returnObj = scope.getSelectedNewCourses();
    //         expect(returnObj.length).toBe(2);
    //         console.log(returnObj);
    //       //  expect(returnObj[0].domainid).toBe('1');
    //             // expect(returnObj[0].courseid).toBe('10');
    //             // expect(returnObj[0].domaintype).toBe('school');
    //         expect(returnObj[0].type).toBe('DemoCouresType');
            
    //     });
    // });
});
