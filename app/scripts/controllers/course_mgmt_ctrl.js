'use strict';


var courseModule = angular.module('AdminActivityReports.courseMgmt', []);
courseModule.controller('courseMgmtCtrl', ['$scope', '$rootScope', '$location', '$theme', '$routeParams', 'validateUrlData',
    'notAuthenticated', 'noNetError', 'getSchoolData', 'GetCourseCatalog', 'GetExistingCourseCat', '$locale', '_','GetNewCourseCatSchool',
    function ($scope, $rootScope, $location, theme, $routeParams, validateUrlData, notAuthenticated, noNetError,
     getSchoolData, GetCourseCatalog, GetExistingCourseCat, $locale, _,GetNewCourseCatSchool) {

        $scope.initValues = function () {

            $locale.DATETIME_FORMATS.SHORTDAY = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
            
            //console.log(_.union([34,35,45,48,49], [48,32,34,55]));
            $rootScope.winConfigObj = window.configObj;
            $rootScope.loadingText = true;
            $rootScope.netErr = false;
            $rootScope.authenticationErr = false;

            $rootScope.token = $routeParams.token;
            $rootScope.userid = $routeParams.userid;
            $rootScope.token = $routeParams.token;
            $rootScope.role = $routeParams.role;
            $scope.showLogErrorPg = true;
            
            //list modals
            $scope.courseCatalogList = null;
            $scope.existingCourseList = new Array();
            $scope.schollNewCousreList =new Array();
            
            //loding layers flags
            $scope.courseCatLodingLayer = false;
            $scope.distSchollLodingLayer = false;
            $scope.existingCourseLodingLayer = false;
            $scope.newCourseCatLodingLayer = false;
    
            //putting 'userspace' value to root scope so that it is avilable to all ctrls
            $rootScope.userspace = $routeParams.userspace
            $scope.urlDetails = $rootScope.winConfigObj;
            // console.log($scope.urlDetails);


        };
        $scope.get_course_catalog_Data = function () {

            $scope.courseCatLodingLayer = true;
            GetCourseCatalog._get().then(function onsuccess(response) {
                if (response.data.messageType === "ERROR") {
                    //Do for stuff when an error msg in succes api.
                }
                // console.log("On Course Catalog Data :", response.data);
                $scope.courseCatalogList = response.data.data.domains;

                $scope.courseCatLodingLayer = false;



            }, function onerror(response) {
                //Do for stuff when an error come on api calling.
            });

        };

        $scope.filterDataTODisplay = function (domainData) {
            var domainDataArray = domainData.data.domains;
            //console.log(domainData.data.domains)
            $scope.domainDataScholl = null;
            var len = domainDataArray.length;

            if ($rootScope.role === 'admin') {
                $scope.isTeacherRole = false;

            } else {
                $scope.isTeacherRole = true;
                // In Case of teacher there only only school data.
                $scope.domainDataScholl = domainDataArray;
                // console.log( $scope.domainDataScholl);
                return
            }
             
            //Note:- there will be only one Object element for district in domain list array
            // hence  loop will break as soon as it find matched domainID Object 
            for (var i = 0; i < len; i++) {
                if (domainDataArray[i].id === $rootScope.userDetails.data.data.user.domainid) {
                    $scope.disrtictObj = domainDataArray.splice(i, 1);
                    // console.log($scope.disrtictObj);
                    break;
                }
            }
            // In Case of teacher there only only school data.
            $scope.domainDataScholl = domainDataArray;
        }

        $scope.get_district_School_Data = function () {

            $scope.distSchollLodingLayer = true;
            getSchoolData._get($rootScope.userDetails.data.data.user.domainid, $rootScope.token, $scope.urlDetails)
                .then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }
                    // console.log(response.data)
                    /*call here data parsing methood   
                      and fufther data instialization
                                          
                     */

                    $scope.filterDataTODisplay(response.data);
                    $scope.distSchollLodingLayer = false;

                }, function onerror(response) {
                    noNetError._showNetErrorMsg();
                });

        }

        $scope.loadData = function () {
            $scope.showLogErrorPg = true;
            $rootScope.bodybg = 'bodyBgViolat';
            validateUrlData._get($routeParams.role, $routeParams.userid, $routeParams.token, $scope.urlDetails)
                .then(function onsuccess(response) {

                    $rootScope.firstName = response.data.firstname;
                    $rootScope.lastName = response.data.lastname;
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                    } else {
                       
                        //Storing userdetail response into rootscope.
                        $rootScope.userDetails = response;
                        $scope.showLogErrorPg = false;
                        $rootScope.bodybg = 'bodyBgwhite';
                        $rootScope.showoverlay = false;
                       
                        //Fetching data after successfull authentication
                        $scope.get_district_School_Data();

                        $scope.get_course_catalog_Data();
                    }
                }, function onError(errResponse) {
                    console.log("err Response ", errResponse);
                    noNetError._showNetErrorMsg();
                });
        };
        $scope.removeSchoolDistFrmModal = function (schdist_Id) {
            
            //  console.log("Called remove from modal wit id ",schdist_Id);
            var len = $scope.existingCourseList.length;
            for (var i = 0; i < len; i++) {
                if (schdist_Id === $scope.existingCourseList[i].schoolDistId) {
                    $scope.existingCourseList.splice(i, 1);
                    break;
                }
            }

        };
        $scope.addSchoolDistIntoModal = function (schdist_Id, itemName, existingCourses) {
            var obj = {};
            obj.schoolDistId = schdist_Id;
            obj.schoolDistName = itemName;
            obj.courseList = existingCourses;
            
            //Updating list modal of Existing course list  
            $scope.existingCourseList.push(obj);
            //$scope.existingCourseList = obj;
            
        }

        $scope.updateExistingCourseModal = function (schdist_Id, distschoolChkval, itemName, chkbxidstr) {

            angular.element('#' + chkbxidstr).attr("disabled", true);
            if (distschoolChkval === false) {
                $scope.removeSchoolDistFrmModal(schdist_Id, itemName);
                angular.element('#' + chkbxidstr).removeAttr("disabled");
            } else {

                $scope.existingCourseLodingLayer = true;
                GetExistingCourseCat._get(schdist_Id, chkbxidstr).then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {

                    } else {
                        $scope.addSchoolDistIntoModal(schdist_Id, itemName, response.data.data.domain);
                        angular.element('#' + chkbxidstr).removeAttr("disabled");
                        $scope.existingCourseLodingLayer = false;
                    }
                }, function onErr(response) {

                });
            }

        };
        $scope.updateNewCourseForSchool=function(courseArray,domainObj){
         // $scope.schollNewCousreList ;
            
            var obj = {};
            obj.schoolDomainId = domainObj.id;
            obj.schoolName = domainObj.name;
            obj.courseList = courseArray;
            
            //Updating list modal of Existing course list  
            $scope.schollNewCousreList.push(obj);
            
            console.log("Added  ",$scope.schollNewCousreList);
          
            
        };
        $scope.removeNewSchollCourseFrmModal=function(domainObj){
            var len = $scope.schollNewCousreList.length;
            for (var i = 0; i < len; i++) {
                if (domainObj.name === $scope.schollNewCousreList[i].schoolName) {
                    $scope.schollNewCousreList.splice(i, 1);
                    break;
                }
            }
            console.log("After removal  ",$scope.schollNewCousreList);
        };
        
        
         //domainObj.id,'checkbox_'+$index,domainObj.name,domainObj,disrtictObj[0].id
        //$scope.updateNewCourseListForSchool(domainObj,distObjId);
  //       $scope.updateNewCourseListForSchool = function (schdist_Id, itemName,chkbxidstr,distschoolChkval) {
         $scope.updateNewCourseListForSchool=function(domainObj,distObjId,chkbxidstr){    
             console.log("updateNewCourseListForSchool ",$scope.disrtictObj);
             console.log(domainObj.id,domainObj.name, $scope.disrtictObj[0].id,chkbxidstr);
             
             
            //angular.element('#' + chkbxidstr).removeAttr("disabled",true);
             var distschoolChkval = angular.element('#' + chkbxidstr).is(":checked");
            if (distschoolChkval === false) {
                
                $scope.removeNewSchollCourseFrmModal(domainObj);
               // angular.element('#' + chkbxidstr).removeAttr("disabled");
                
            }else{
                $scope.newCourseCatLodingLayer = true;
                GetNewCourseCatSchool._get(domainObj.id,$scope.disrtictObj[0].id,domainObj.name).then(function onsuccess(response) {
                if (response.data.messageType === "ERROR") {
                        $scope.newCourseCatLodingLayer = false;
                } else {
                   // $scope.addSchoolDistIntoModal(schdist_Id, itemName, response.data.data.domain);
                   console.log("........................",domainObj.name)
                  // console.log(response)
                   
                    angular.element('#' + chkbxidstr).removeAttr("disabled");
                   // $scope.existingCourseLodingLayer = false;
                   
                   $scope.updateNewCourseForSchool(response.data.data.course,domainObj);
                   
                   $scope.newCourseCatLodingLayer = false;
                }
            }, function onErr(response) {
                angular.element('#' + chkbxidstr).removeAttr("disabled");
            });
            }
            
            

        };
        $scope.checkSchoolOrDist = function (schdist_Id) {

           // console.log($rootScope.userDetails.data.data.user);
            if ($scope.disrtictObj[0].id === schdist_Id) {
                return true;
            } else {
                return false;
            }



        };
      // domainObj.id,'checkbox_'+$index,domainObj.name,domainObj,disrtictObj[0].id
        $scope.onDistSchollChkUpdate = function (schdist_Id, chkbxidstr, itemName,domainObj,distObjId) {

            console.log(schdist_Id, chkbxidstr, itemName);

            var distschoolChkval = angular.element('#' + chkbxidstr).is(":checked");
            $scope.updateExistingCourseModal(schdist_Id, distschoolChkval, itemName, chkbxidstr);

            var isDist = $scope.checkSchoolOrDist(schdist_Id);
            console.log("IsDist ",isDist);
            if (!isDist) {
                // call api for new course in case of school.
                $scope.updateNewCourseListForSchool(domainObj,distObjId,chkbxidstr);
                
                //$scope.updateNewCourseListForSchool(schdist_Id, itemName,chkbxidstr);
            }
            
            //  $scope.updateNewCourseList();
        }

        $scope.onCourseChkUpdate = function (idx, chkbxidstr) {
            // console.log(idx, chkbxidstr);
        }

        $scope.go = function (path) {
            $location.path(path);
        };

        // $rootScope.$watch(function () { // fixed function declaration
        //     return $location.path();
        // },
        //     function (newValue, oldValue) {
        //         //            console.log(newValue, oldValue);
        //         if (newValue === '/') { // Update: variable name case should be the same
        //             // here you can do your tasks
        //             $rootScope.bodybg = 'bodyBgViolat';
        //         }
        //         else {
        //             $rootScope.bodybg = 'bodyBgwhite';
        //         }
        //     },
        //     true);

    
        //Initilizing variables.
        $scope.initValues();
    
        //Laoding data 
        $scope.loadData();




    }]);