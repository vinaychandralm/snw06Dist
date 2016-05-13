'use strict';

describe('GetCourseCatalog Ajax Call', function () {

    // load the controller's module
    beforeEach(module('studentActivityReportscommomns.factories'));

    var basePath, scope, GetCourseCatalog, rootScope, http, GetExistingCourseCat, GetNewCourseCatSchool,GetNewCourseCatDist,postcopycourse;
    

    //   // Initialize the controller and a mock scope
    beforeEach(inject(function ($http, $rootScope, _GetCourseCatalog_, _GetExistingCourseCat_, _GetNewCourseCatSchool_,_GetNewCourseCatDist_,_postcopycourse_) {
        rootScope = $rootScope;
        http = $http;
        scope = $rootScope.$new();
        GetCourseCatalog = _GetCourseCatalog_;
        GetExistingCourseCat = _GetExistingCourseCat_;
        GetNewCourseCatSchool = _GetNewCourseCatSchool_;
        GetNewCourseCatDist = _GetNewCourseCatDist_;
        postcopycourse= _postcopycourse_;
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
        rootScope.token = "~gzYwCAAAAAQZvSzPzYfwJA.GeZPIOOrBFAT8-FCPiYVTC";

        spyOn(http, "get").and.returnValue("some value");
        spyOn(http, "post").and.returnValue("some post value");
    }));

    it('should call the GetCourseCatalog function', function () {
        // var url = basePath + domainid + '?token=' + token;
        var get = GetCourseCatalog._get(rootScope);
        expect(http.get).toHaveBeenCalled();
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });


    it('should call the GetExistingCourseCat function', function () {
        // var url = basePath + domainid + '?token=' + token;
        var _domainID = "someDomainID";
        var chkboxstr = "SomeChkboxStr"
        var get = GetExistingCourseCat._get(_domainID, chkboxstr);
        expect(http.get).toHaveBeenCalledWith(rootScope.winConfigObj.existingCourseUrl + _domainID + "?token=" + rootScope.token);
        expect(get).toEqual("some value");
        // expect(http.get).toBe("some value");
    });

    it('should call the GetNewCourseCatSchool function', function () {
        var schoolId = "someschoolIdID";
        var distId = "somedistId";
        var get = GetNewCourseCatSchool._get(schoolId, distId);
        expect(http.get).toHaveBeenCalled();
        expect(get).toEqual("some value");
    });
    
    
     it('should call the GetNewCourseCatDist function', function () {
        var distObjId = "somedistObjId";
        var idArrayOfSelectedCourseCat = ['1234560','1234561','1234562'];
        var get = GetNewCourseCatDist._get(distObjId, idArrayOfSelectedCourseCat);
        expect(http.get).toHaveBeenCalledWith(rootScope.winConfigObj.newCourseList + distObjId  +"?baseDomainId="+idArrayOfSelectedCourseCat.join() + "&type=district&token="+rootScope.token);
        expect(get).toEqual("some value");
    });
    
     it('should call the postcopycourse function', function () {
        //var distObjId = "somedistObjId";
      //  var idArrayOfSelectedCourseCat = ['1234560','1234561','1234562'];
        var objArray = [{'prop1':'name_X','id': '1234522'},{'prop1':'name_Y','id': '1234555'},{'prop1':'name_Z','id': '123456'}]
        var post = postcopycourse._post(objArray);
        expect(http.post).toHaveBeenCalled();
        expect(post).toEqual("some post value");
    });
    
   
});