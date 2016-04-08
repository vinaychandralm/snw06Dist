'use strict';


var courseModule = angular.module('AdminActivityReports.courseMgmt', []);
courseModule.controller('courseMgmtCtrl', ['$scope', '$rootScope', '$location', '$theme', '$routeParams', 'validateUrlData',
    'notAuthenticated', 'noNetError', 'getSchoolData', 'GetCourseCatalog', 'GetExistingCourseCat', '$locale', '_',
    'GetNewCourseCatSchool', 'GetNewCourseCatDist',
    function ($scope, $rootScope, $location, theme, $routeParams, validateUrlData, notAuthenticated, noNetError,
        getSchoolData, GetCourseCatalog, GetExistingCourseCat, $locale, _, GetNewCourseCatSchool, GetNewCourseCatDist) {

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
            $scope.schollNewCousreList = new Array();

            $scope.DistNewCourseMasterArray;
            $scope.DistNewCourseSlaveArray;

            $scope.SchollNewCourseMasterArray;
            $scope.SchollNewCourseSlaveArray;
            
            $scope.mainCourseArryAsModal;
            
            //loding layers flags
            $scope.courseCatLodingLayer = false;
            $scope.distSchollLodingLayer = false;
            $scope.existingCourseLodingLayer = false;
            $scope.newCourseCatLodingLayer = false;
    
            //putting 'userspace' value to root scope so that it is avilable to all ctrls
            $rootScope.userspace = $routeParams.userspace
            $scope.urlDetails = $rootScope.winConfigObj;
            // console.log($scope.urlDetails);
            
            $scope.DistChkBoxID = 'distCollapsable';


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

                console.log("$scope.courseCatalogList ", $scope.courseCatalogList);

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
                //Call Update method of MAster Modal
                
                $scope.onCourseChkUpdate();
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
        $scope.updateNewCourseForSchool = function (courseArray, domainObj) {
            // $scope.schollNewCousreList ;
            
            var obj = {};
            obj.schoolDomainId = domainObj.id;
            obj.schoolName = domainObj.name;
            obj.courseList = courseArray;
            
            //Updating list modal of Existing course list  
            $scope.schollNewCousreList.push(obj);
            
            //copying scholl after adding
            $scope.SchollNewCourseMasterArray = angular.copy($scope.schollNewCousreList);

            console.log("Added  ", $scope.schollNewCousreList);
        };
        $scope.removeNewSchollCourseFrmModal = function (domainObj) {
            var len = $scope.schollNewCousreList.length;
            for (var i = 0; i < len; i++) {
                if (domainObj.name === $scope.schollNewCousreList[i].schoolName) {
                    $scope.schollNewCousreList.splice(i, 1);
                    break;
                }
            }
            //copying scholl after removal
            $scope.SchollNewCourseMasterArray = angular.copy($scope.schollNewCousreList);
            console.log("After removal  ", $scope.schollNewCousreList);
        };


        $scope.updateNewCourseListForSchool = function (domainObj, distObjId, chkbxidstr) {
            console.log("updateNewCourseListForSchool ", $scope.disrtictObj);
            console.log(domainObj.id, domainObj.name, $scope.disrtictObj[0].id, chkbxidstr);
             
             
            //angular.element('#' + chkbxidstr).removeAttr("disabled",true);
            var distschoolChkval = angular.element('#' + chkbxidstr).is(":checked");
            if (distschoolChkval === false) {

                $scope.removeNewSchollCourseFrmModal(domainObj);
                // angular.element('#' + chkbxidstr).removeAttr("disabled");
                
            } else {
                $scope.newCourseCatLodingLayer = true;
                GetNewCourseCatSchool._get(domainObj.id, $scope.disrtictObj[0].id, domainObj.name).then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        $scope.newCourseCatLodingLayer = false;
                    } else {
                        // $scope.addSchoolDistIntoModal(schdist_Id, itemName, response.data.data.domain);
                        console.log("........................", domainObj.name)


                        angular.element('#' + chkbxidstr).removeAttr("disabled");
                        // $scope.existingCourseLodingLayer = false;
                   
                        $scope.updateNewCourseForSchool(response.data.data.course, domainObj);

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
        $scope.getSecectedCourseCatalog = function () {

            var idArrayOfSelectedCourseCat = new Array();
            angular.element("#courseCatlogs input:checkbox:checked").each(function () {
                console.log(angular.element(this).attr('data-course-id'));

                idArrayOfSelectedCourseCat.push(angular.element(this).attr('data-course-id'));
            });
            return idArrayOfSelectedCourseCat;
            //  console.log( angular.element("#courseCatlogs input:checkbox") );
            //console.log( angular.element("#courseCatlogs input:checkbox:checked") );
        };

        $scope.applyPostFixForScholl = function () {
            var schollCourseLen = $scope.SchollNewCourseSlaveArray.length;
            for (var i = 0; i < schollCourseLen; i++) {
                var tempLen = $scope.SchollNewCourseSlaveArray[i].courseList.length;
                var currOBjRef = $scope.SchollNewCourseSlaveArray[i].courseList;
                for (var j = 0; j < tempLen; j++) {
                   
                    currOBjRef[j].title = currOBjRef[j].title + " (District)";
                }

            }
            console.log("after adding Title in slave school array  ",$scope.SchollNewCourseSlaveArray);
            
            //Copying into master after adding district as postfix;
            $scope.SchollNewCourseMasterArray = angular.copy($scope.SchollNewCourseSlaveArray);
               
        };
        $scope.applyPostfixNMergeSchollModals = function () {
            
            // $scope.DistNewCourseMasterArray;
            // $scope.DistNewCourseSlaveArray;
            
            // $scope.SchollNewCourseMasterArray;
            // $scope.SchollNewCourseSlaveArray;
            
            
           // var DistArrayLen = $scope.DistNewCourseMasterArray.length;
            
            //making slave array of scholls
            $scope.SchollNewCourseSlaveArray = angular.copy($scope.SchollNewCourseMasterArray);

            $scope.applyPostFixForScholl();
            var schollCourseLen = $scope.SchollNewCourseSlaveArray.length;
             for (var i = 0; i < schollCourseLen; i++) {
                // var tempRefObj = $scope.DistNewCourseMasterArray[];
                // console.log($scope.SchollNewCourseSlaveArray[i].courseList, $scope.SchollNewCourseSlaveArray[i]);
                 var DistArrayLen = $scope.DistNewCourseMasterArray.length;
                 for(var j =0; j<DistArrayLen;j++){
                     var obj =angular.copy($scope.DistNewCourseMasterArray[j]);
                    // console.log(obj);
                     obj.title = obj.title + " (Course Catalog)";
                    // console.log(obj.title);
                     $scope.SchollNewCourseSlaveArray[i].courseList.push(obj);
                 }
             }
             
             //Creating Obj after joining both scholl and District data array as Modal to Show On New Course Catalog Section
             console.log("Master Dist Data ",$scope.DistNewCourseMasterArray);
             console.log("Scholl Dist Data ",$scope.SchollNewCourseSlaveArray);
             console.log($scope.disrtictObj[0].id,$scope.disrtictObj[0] );
             var obj = {};
             obj.schoolDomainId = $scope.disrtictObj[0].id;
             obj.schoolName = $scope.disrtictObj[0].name;
             obj.courseList = $scope.DistNewCourseMasterArray;
             
             $scope.mainCourseArryAsModal = new Array();
             $scope.mainCourseArryAsModal.push(obj);
             var schollSalveLen = $scope.SchollNewCourseSlaveArray.length;
             for(var k=0; k<schollSalveLen; k++){
                 $scope.mainCourseArryAsModal.push($scope.SchollNewCourseSlaveArray.shift());
             }

             console.log("$scope.mainCourseArryAsModal  ",$scope.mainCourseArryAsModal)

        };

        $scope.createJointModalForNewCourse = function () {

            $scope.applyPostfixNMergeSchollModals();
           // var obj = {};

        };

        $scope.updateNewCourseListForDistrict = function (distObjId, idArrayOfSelectedCourseCat) {
            console.log("Form updateNewCourseListForDistrict  ", distObjId, idArrayOfSelectedCourseCat);

            GetNewCourseCatDist._get(distObjId, idArrayOfSelectedCourseCat).then(function onsuccess(response) {
                console.log(response);

                var res = response.data.data.course;

                $scope.DistNewCourseMasterArray = angular.copy(res);

                $scope.createJointModalForNewCourse();


            },
                function error(response) {


                });


        };
        
        
        // domainObj.id,'checkbox_'+$index,domainObj.name,domainObj,disrtictObj[0].id
        $scope.onDistSchollChkUpdate = function (schdist_Id, chkbxidstr, itemName, domainObj, distObjId) {

            console.log(schdist_Id, chkbxidstr, itemName);

            var distschoolChkval = angular.element('#' + chkbxidstr).is(":checked");
            $scope.updateExistingCourseModal(schdist_Id, distschoolChkval, itemName, chkbxidstr);

            var isDist = $scope.checkSchoolOrDist(schdist_Id);
            console.log("IsDist ", isDist);
            if (!isDist) {
                // call api for new course in case of school.
                //console.log("From ")
                $scope.updateNewCourseListForSchool(domainObj, distObjId, chkbxidstr);
                // do the needfull condtion if Dist is selected
                
                if(angular.element('#DistChkBoxID').is(":checked")){
                  //  $scope.onCourseChkUpdate();
                }
                
                //$scope.updateNewCourseListForSchool(schdist_Id, itemName,chkbxidstr);
            } else {
                var idArrayOfSelectedCourseCat = $scope.getSecectedCourseCatalog();
                var isDistSelected = angular.element("#" + $scope.DistChkBoxID).is(":checked");

                if (idArrayOfSelectedCourseCat.length > 0 && isDistSelected) {
                    $scope.updateNewCourseListForDistrict(distObjId, idArrayOfSelectedCourseCat);
                }
                else {
                    
                    // Things to do for removal of Dist 
                    console.log("No Course Has been selected");
                    $scope.mainCourseArryAsModal = angular.copy($scope.SchollNewCourseMasterArray);
                }
            }
            
            //  $scope.updateNewCourseList();
        }

        $scope.onCourseChkUpdate = function (idx, chkbxidstr) {
            console.log(idx, chkbxidstr);

            var isDistSelected = angular.element("#" + $scope.DistChkBoxID).is(":checked");
            console.log('isDistSelected  ', isDistSelected)
            if (isDistSelected) {
                var idArrayOfSelectedCourseCat = $scope.getSecectedCourseCatalog();
                if (idArrayOfSelectedCourseCat.length > 0) {
                    $scope.updateNewCourseListForDistrict($scope.disrtictObj[0].id, idArrayOfSelectedCourseCat);
                }
                else {
                    // Things to do for removal of Dist
                    console.log("No Course Has been selected");
                     $scope.mainCourseArryAsModal = angular.copy($scope.SchollNewCourseMasterArray)
                }
            } else {
                // Things to do for removal of Dist 
                console.log("Deselectes District");
                $scope.mainCourseArryAsModal = angular.copy($scope.SchollNewCourseMasterArray)
            }


        }

        $scope.go = function (path) {
            $location.path(path);
        };
    
        //Initilizing variables.
        $scope.initValues();
    
        //Laoding data 
        $scope.loadData();




    }]);