'use strict';


var courseModule = angular.module('AdminActivityReports.courseMgmt', []);
courseModule.controller('courseMgmtCtrl', ['$scope', '$rootScope', '$location', '$theme', '$routeParams', 'validateUrlData',
    'notAuthenticated', 'noNetError', 'getSchoolData', 'GetCourseCatalog', 'GetExistingCourseCat', '$locale', '_',
    'GetNewCourseCatSchool', 'GetNewCourseCatDist', 'postcopycourse', '$timeout', 'GetCourseWithCatalogId',
    function ($scope, $rootScope, $location, theme, $routeParams, validateUrlData, notAuthenticated, noNetError,
        getSchoolData, GetCourseCatalog, GetExistingCourseCat, $locale, _, GetNewCourseCatSchool, GetNewCourseCatDist,
        postcopycourse, $timeout, GetCourseWithCatalogId) {

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
            $scope.courseType = 'Continuous';
            $scope.DistNewCourseArray = null;

            //list modals
            $scope.courseCatalogList = null;
            $scope.existingCourseList = new Array();
            $scope.schollNewCousreList = new Array();
            $scope.SchollNewCourseMasterArray;
            $scope.mainCourseArryAsModal;

            //loding layers vars
            $scope.courseCatLodingLayer = false;
            $scope.distSchollLodingLayer = false;
            $scope.existingCourseLodingLayer = false;
            $scope.newCourseCatLodingLayer = false;

            $rootScope.userspace = $routeParams.userspace
            $scope.urlDetails = $rootScope.winConfigObj;
            $scope.DistChkBoxID = 'distCollapsable';
            $scope.startDateStartActivity;
            $scope.maxDateStartActivity;
            $scope.startDateEndActivity;
            $scope.showWholePgLoading = false;
            $scope.hideCalenderArea = true;
            $scope.courseWithCatalogIDList = null;
            $scope.catalogIdonlyArray = [];
            $scope.matcehCourseCatalog = [];
            $scope.uniqIdListOfInitalExitingcourse = null;
            $scope.isDistNotSelected = true;
            $scope.newCourseListForDistrictCallStack = [];
            $scope.newCourseListForSchollCallStack = [];



        };
        // $scope.checkOnCourseCatalog = function () {
        //     // var catListBoxId = 'courseCatelogListBox';
        //     //var len = $scope.uniqIdListOfInitalExitingcourse.length;

        //     // for (var i = 0; i < len; i++) {
        //    // angular.element("#courseCatlogs input").prop("checked", true);
        //     // }
        //     $scope.onCourseChkUpdate();
        // }
        // $scope.getMatchedCoursedCatalog = function () {
        //     var existingCousreLen = $scope.existingCourseList[0].courseList.length;
        //     var fullCourseListLen = $scope.courseWithCatalogIDList.length;
        //     var catalogIdListtoCheck = [];
        //     // console.log('................ ',$scope.existingCourseList[0].courseList);
        //     // console.log('................----------- ',$scope.courseWithCatalogIDList);

        //     for (var i = 0; i < existingCousreLen; i++) {
        //         for (var j = 0; j < fullCourseListLen; j++) {
        //             if ($scope.existingCourseList[0].courseList[i].baseid == $scope.courseWithCatalogIDList[j].id) {
        //                 catalogIdListtoCheck.push($scope.courseWithCatalogIDList[j].domainid);
        //             }
        //         }
        //     }
        //     //console.log(catalogIdListtoCheck);
        //     //console.log(_.uniq(catalogIdListtoCheck));
        //     $scope.uniqIdListOfInitalExitingcourse = _.uniq(catalogIdListtoCheck);
        //     $scope.checkOnCourseCatalog();
        // }

        // $scope.getExistingCourseWithCatalog = function (catalogIdonlyArray) {
        //     // $scope.courseCatLodingLayer = true;
        //     $scope.distSchollLodingLayer = true;
        //     GetCourseWithCatalogId._get(catalogIdonlyArray).then(function onsuccess(response) {
        //         if (response.data.messageType === "ERROR") {
        //             //Do for stuff when an error msg in succes api.
        //             $scope.courseCatLodingLayer = false;
        //             $scope.distSchollLodingLayer = false;
        //         }
        //         $scope.courseWithCatalogIDList = response.data.data.course;

        //         $scope.courseCatLodingLayer = false;
        //         $scope.distSchollLodingLayer = false;
        //         //console.log( $scope.courseWithCatalogIDList);
        //         // $scope.getMatchedCoursedCatalog();

        //     }, function onerror(response) {
        //         //Do for stuff when an error come on api calling.
        //         $scope.courseCatLodingLayer = false;
        //         $scope.distSchollLodingLayer = false;
        //     });
        // };
        // $scope.getCatalogIdonlyArray = function (courseCatalogListArray) {

        //     var len = courseCatalogListArray.length;

        //     for (var i = 0; i < len; i++) {
        //         $scope.catalogIdonlyArray.push(courseCatalogListArray[i].id);
        //     }

        // };

        $scope.get_course_catalog_Data = function () {

            $scope.courseCatLodingLayer = true;
            var distID = $scope.disrtictObj[0].id;
            GetCourseCatalog._get(distID).then(function onsuccess(response) {
                if (response.data.messageType === "ERROR") {
                    //Do for stuff when an error msg in succes api.
                    $scope.courseCatLodingLayer = false;
                }
                $scope.courseCatalogList = response.data.data.domains;
                $scope.courseCatLodingLayer = false;
                $scope.distSchollLodingLayer = false;


            }, function onerror(response) {
                //Do for stuff when an error come on api calling.
                $scope.courseCatLodingLayer = false;
            });

        };

        $scope.filterDataTODisplay = function (domainData) {
            var domainDataArray = domainData.data.domains;
            $scope.domainDataScholl = null;
            var len = domainDataArray.length;

            if ($rootScope.role === 'admin') {
                $scope.isTeacherRole = false;

            }
            //there will be only one Object element for district in domain list array
            // hence  loop will break as soon as it find matched domainID Object
            for (var i = 0; i < len; i++) {
                if (domainDataArray[i].id === $rootScope.userDetails.data.data.user.domainid) {
                    $scope.disrtictObj = domainDataArray.splice(i, 1);

                    break;
                }
            }
            // In Case of teacher there only only school data.
            $scope.domainDataScholl = domainDataArray;
        }

        $scope.get_district_School_Data = function () {
            angular.element('#existCatlist button').attr('disabled', true);
            $scope.distSchollLodingLayer = true;
            var domainid = $rootScope.userDetails.data.data.user.domainid;
            var token = $rootScope.token;
            var urls = $scope.urlDetails;
            getSchoolData._get(domainid, token, urls)
                .then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        $scope.distSchollLodingLayer = false;
                        return;
                    }

                    $scope.filterDataTODisplay(response.data);
                    $scope.get_course_catalog_Data();

                }, function onerror(response) {
                    noNetError._showNetErrorMsg();
                    $scope.distSchollLodingLayer = false;
                });

        }

        $scope.loadData = function () {
            $scope.showLogErrorPg = true;
            $rootScope.bodybg = 'bodyBgViolat';
            validateUrlData._get($routeParams.role, $routeParams.userid, $routeParams.token, $scope.urlDetails)
                .then(function onsuccess(response) {

                    $rootScope.firstName = response.data.firstname;
                    $rootScope.lastName = response.data.lastname;
                    if (response.data.messageType === "ERROR" || $routeParams.role !== 'admin') {
                        notAuthenticated._showErrorMsg();
                        $scope.showLogErrorPg = true;
                    } else {

                        //Storing userdetail response into rootscope.
                        $rootScope.userDetails = response;
                        $scope.showLogErrorPg = false;
                        $rootScope.bodybg = 'bodyBgwhite';
                        $rootScope.showoverlay = false;

                        //Fetching data after successfull authentication
                        $scope.get_district_School_Data();


                    }
                }, function onError(errResponse) {
                    console.log("err Response ", errResponse);
                    $scope.showLogErrorPg = true;
                    noNetError._showNetErrorMsg();
                });
        };
        $scope.removeSchoolDistFrmModal = function (schdist_Id) {

            var len = $scope.existingCourseList.length;
            for (var i = 0; i < len; i++) {
                if (schdist_Id === $scope.existingCourseList[i].schoolDistId) {
                    $scope.existingCourseList.splice(i, 1);
                    break;
                }
            }

        };
        $scope.addSchoolDistIntoModal = function (schdist_Id, itemName, existingCourses, chkbxidstr) {
            var obj = {};
            obj.schoolDistId = schdist_Id;
            obj.schoolDistName = itemName;
            obj.courseList = existingCourses;

            //Updating list modal of Existing course list
            var isDistSelected = angular.element('#distCollapsable').is(":checked");
            if (isDistSelected && (chkbxidstr === 'distCollapsable')) {
                $scope.existingCourseList.unshift(obj);

            } else {
                $scope.existingCourseList.push(obj);
            }
        }

        $scope.updateExistingCourseModal = function (schdist_Id, distschoolChkval, itemName, chkbxidstr) {
            angular.element('#' + chkbxidstr).attr("disabled", true);
            if (distschoolChkval === false) {
                $scope.removeSchoolDistFrmModal(schdist_Id, itemName);
                angular.element('#' + chkbxidstr).removeAttr("disabled");
                $scope.onCourseChkUpdate();
            } else {

                $scope.existingCourseLodingLayer = true;
                GetExistingCourseCat._get(schdist_Id, chkbxidstr).then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        $scope.existingCourseLodingLayer = false;

                    } else {
                        $scope.addSchoolDistIntoModal(schdist_Id, itemName, response.data.data.course, chkbxidstr);
                        angular.element('#' + chkbxidstr).removeAttr("disabled");
                        
                        // if (chkbxidstr === 'distCollapsable') {
                        //     $scope.onCourseChkUpdate();
                        // }
                        $scope.existingCourseLodingLayer = false;
                    }
                }, function onErr(response) {
                    $scope.existingCourseLodingLayer = false;
                });
            }

        };
        $scope.updateNewCourseForSchool = function (courseArray, domainObj) {

            var obj = {};
            obj.schoolDomainId = domainObj.id;
            obj.schoolName = domainObj.name;
            obj.courseList = courseArray;

            //Updating list modal of Existing course list
            $scope.schollNewCousreList.push(obj);
        };
        // $scope.removeNewSchollCourseFrmModal = function (domainObj) {
        //     var len = $scope.schollNewCousreList.length;
        //     for (var i = 0; i < len; i++) {
        //         if (domainObj.name === $scope.schollNewCousreList[i].schoolName) {
        //             $scope.schollNewCousreList.splice(i, 1);
        //             break;
        //         }
        //     }
        //     //copying scholl after removal
        //     $scope.SchollNewCourseMasterArray = angular.copy($scope.schollNewCousreList);
        // };

        $scope.checkSchoolOrDist = function (schdist_Id) {

            if ($scope.disrtictObj[0].id === schdist_Id) {
                return true;
            } else {
                return false;
            }

        };
        $scope.getSecectedCourseCatalog = function () {

            var idArrayOfSelectedCourseCat = new Array();
            var len = $scope.multiselectExistingCatalog.length;
            for (var i = 0; i < len; i++) {
                idArrayOfSelectedCourseCat.push($scope.multiselectExistingCatalog[i].id);
            }

            return idArrayOfSelectedCourseCat;
        };
        $scope.getSelectedNewCourses = function () {

            var objArrayOfSelected = new Array();
            angular.element("#newcourseCatlogs input:checkbox:checked").each(function () {
                var obj = {};
                obj.courseid = angular.element(this).attr('data-courseId');
                obj.domainid = angular.element(this).attr('data-domainid');
                obj.domaintype = angular.element(this).attr('data-domainType');
                obj.type = $scope.courseType;
                obj.startdate = $scope.dateStringFormat(new Date($scope.startDateStartActivity));
                obj.enddate = $scope.dateStringFormat(new Date($scope.startDateEndActivity))

                objArrayOfSelected.push(obj);

            });

            $scope.dateStringFormat(new Date($scope.startDateStartActivity)), $scope.dateStringFormat(new Date($scope.startDateEndActivity));
            return objArrayOfSelected;
        };


        $scope.addDistPostFix = function (dupSchollArray) {
            var len = dupSchollArray.length;
            for (var i = 0; i < len; i++) {
                var tempSchollObj = dupSchollArray[i];
                var objLen = tempSchollObj.courseList.length;
                for (var j = 0; j < objLen; j++) {
                    tempSchollObj.courseList[j].courseFrom = " (District)";
                    //This case for school data.
                    tempSchollObj.courseList[j].Domain_ID = tempSchollObj.schoolDomainId;
                    tempSchollObj.courseList[j].domainType = 'SCHOOL';
                }
            }
        }

        $scope.addDistrictObjects = function (tempSchollArray) {
            var schollCourseLen = tempSchollArray.length;
            for (var i = 0; i < schollCourseLen; i++) {
                if ($scope.DistNewCourseArray != null) {
                    var DistArrayLen = $scope.DistNewCourseArray.length;
                    for (var j = 0; j < DistArrayLen; j++) {
                        var obj = angular.copy($scope.DistNewCourseArray[j]);
                        obj.courseFrom = " (Course Catalog)";
                        //This case for school data.
                        obj.Domain_ID = tempSchollArray[i].schoolDomainId;
                        obj.domainType = 'COURSE CATALOG';

                        tempSchollArray[i].courseList.push(obj);
                    }
                }
            }
        };

        $scope.getCopyOfScholls = function () {

            var tempSchollArray = angular.copy($scope.schollNewCousreList);
            $scope.addDistPostFix(tempSchollArray);

            var idArrayOfSelectedCourseCat = $scope.getSecectedCourseCatalog();
            var isDistSelected = angular.element('#distCollapsable').is(":checked");
            if (isDistSelected && idArrayOfSelectedCourseCat.length > 0) {

                $scope.addDistrictObjects(tempSchollArray);
            }

            return tempSchollArray;
        };
        $scope.addDataForCopyApi = function () {

            if ($scope.mainCourseArryAsModal[0].courseList) {
                var len = $scope.mainCourseArryAsModal[0].courseList.length;
                for (var i = 0; i < len; i++) {
                    $scope.mainCourseArryAsModal[0].courseList[i].domainType = "DISTRICT";
                    $scope.mainCourseArryAsModal[0].courseList[i].Domain_ID = $scope.disrtictObj[0].id;
                }
            }
        };

        $scope.buildMainModal = function () {

            $scope.mainCourseArryAsModal = new Array();
            var idArrayOfSelectedCourseCat = $scope.getSecectedCourseCatalog();
            var isDistSelected = angular.element('#distCollapsable').is(":checked");
            if (isDistSelected && idArrayOfSelectedCourseCat.length > 0) {
                var obj = {};
                obj.schoolDomainId = $scope.disrtictObj[0].id;
                obj.schoolName = $scope.disrtictObj[0].name;
                obj.courseList = $scope.DistNewCourseArray;
                $scope.mainCourseArryAsModal.push(obj);
                $scope.addDataForCopyApi();
            }

            var copyOfScholl = $scope.getCopyOfScholls();
            var schollSalveLen = $scope.schollNewCousreList.length;

            for (var k = 0; k < schollSalveLen; k++) {

                $scope.mainCourseArryAsModal.push(angular.copy(copyOfScholl[k]));
            }
        };
        
        $scope.newCourseCatLodingLayerOnOff = function(){
            if (($scope.newCourseListForSchollCallStack.length === 0) && ($scope.newCourseListForDistrictCallStack.length === 0))
                return false;
            else
                return true;
            
        }

        $scope.getNewCourseListForScholl = function (domainObj) {
            $scope.newCourseListForSchollCallStack.push({ 'dummyobject': 'dummyvalue' });
            $scope.newCourseCatLodingLayer = true;
            GetNewCourseCatSchool._get(domainObj.id, $scope.disrtictObj[0].id, domainObj.name).then(function onsuccess(response) {
                $scope.newCourseListForSchollCallStack.pop();
                if (response.data.messageType === "ERROR") {
                  //  if (($scope.newCourseListForSchollCallStack.length === 0) && ($scope.newCourseListForDistrictCallStack.length === 0))
                        $scope.newCourseCatLodingLayer = $scope.newCourseCatLodingLayerOnOff();
                } else {
                    $scope.updateNewCourseForSchool(response.data.data.course, domainObj);
                    $scope.buildMainModal();
                   // if (($scope.newCourseListForSchollCallStack.length === 0) && ($scope.newCourseListForDistrictCallStack.length === 0))
                        $scope.newCourseCatLodingLayer = $scope.newCourseCatLodingLayerOnOff();;
                }
            }, function onErr(response) {
                $scope.newCourseListForSchollCallStack.pop();
              //  if (($scope.newCourseListForSchollCallStack.length === 0) && ($scope.newCourseListForDistrictCallStack.length === 0))
                    $scope.newCourseCatLodingLayer = $scope.newCourseCatLodingLayerOnOff();;
            });

        }

        $scope.getNewCourseListForDistrict = function () {
            $scope.newCourseListForDistrictCallStack.push({ 'dummyobject': 'dummyvalue' });
            var idArrayOfSelectedCourseCat = $scope.getSecectedCourseCatalog();
            var distObjId = $scope.disrtictObj[0].id;
            var isDistSelected = angular.element('#distCollapsable').is(":checked");
            if (isDistSelected && idArrayOfSelectedCourseCat.length > 0) {
                $scope.newCourseCatLodingLayer = true;

                GetNewCourseCatDist._get(distObjId, idArrayOfSelectedCourseCat).then(function onsuccess(response) {
                    $scope.newCourseListForDistrictCallStack.pop();
                    if (response.data.messageType === "ERROR") {
               // if (($scope.newCourseListForSchollCallStack.length === 0) && ($scope.newCourseListForDistrictCallStack.length === 0))
                            $scope.newCourseCatLodingLayer = $scope.newCourseCatLodingLayerOnOff();

                        return;
                    } else {
                        var res = response.data.data.course;
                        $scope.DistNewCourseArray = angular.copy(res);
                        $scope.buildMainModal();
               // if (($scope.newCourseListForSchollCallStack.length === 0) && ($scope.newCourseListForDistrictCallStack.length === 0))
                            $scope.newCourseCatLodingLayer = $scope.newCourseCatLodingLayerOnOff();
                    }
                },
                    function error(response) {
                        $scope.newCourseListForDistrictCallStack.pop();
                //if (($scope.newCourseListForSchollCallStack.length === 0) && ($scope.newCourseListForDistrictCallStack.length === 0))
                            $scope.newCourseCatLodingLayer = $scope.newCourseCatLodingLayerOnOff();
                        return;
                    });
            }
        };

        $scope.callAjx = function (schdist_Id, chkbxidstr, itemName, domainObj, distObjId) {
            if (chkbxidstr === 'distCollapsable') {
                //call Dist Data Ajx
                $scope.getNewCourseListForDistrict();
            } else {
                //call scholl data
                $scope.getNewCourseListForScholl(domainObj);
            }
        };

        $scope.removeNewSchollCourseFrmModal = function (domainObj) {
            var len = $scope.schollNewCousreList.length;
            for (var i = 0; i < len; i++) {
                if (domainObj.name === $scope.schollNewCousreList[i].schoolName) {
                    $scope.schollNewCousreList.splice(i, 1);
                    break;
                }
            }

        };
        $scope.uncheckAllCourseCatalog = function () {
            angular.element("#courseCatlogs input:checkbox:checked").each(function () {
                angular.element(this).prop('checked', false);
            });
        }
        $scope.onDistSchollChkUpdate = function (schdist_Id, chkbxidstr, itemName, domainObj, distObjId) {

            var distschoolChkval = angular.element('#' + chkbxidstr).is(":checked");
            $scope.updateExistingCourseModal(schdist_Id, distschoolChkval, itemName, chkbxidstr);
            if (angular.element('#' + $scope.DistChkBoxID).is(":checked")) {
                $scope.isDistNotSelected = false;
                angular.element('#existCatlist button').removeAttr('disabled', true);

            } else {
                $scope.isDistNotSelected = true;
                angular.element('#existCatlist button').attr('disabled', true);
                //$scope.uncheckAllCourseCatalog();
            }


            if (distschoolChkval) {
                //Addition
                $scope.callAjx(schdist_Id, chkbxidstr, itemName, domainObj, distObjId);
            }
            if (chkbxidstr === 'distCollapsable') {
                //In Case of District
                $scope.buildMainModal();

            } else {
                //In case of Scholl
                $scope.removeNewSchollCourseFrmModal(domainObj);
                $scope.buildMainModal();
            }

        }

        $scope.onCourseChkUpdate = function (idx, chkbxidstr) {
            var idArrayOfSelectedCourseCat = $scope.getSecectedCourseCatalog();
            var isDistSelected = angular.element('#distCollapsable').is(":checked");
            if (isDistSelected && (idArrayOfSelectedCourseCat.length > 0)) {
                $scope.getNewCourseListForDistrict();
            }
            $scope.buildMainModal();

        };

        $scope.dateStringFormat = function (dateObj) {
            var dd = dateObj.getDate();
            var mm = dateObj.getMonth() + 1; //As for January strats with 0

            var yyyy = dateObj.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            return (yyyy + '-' + mm + '-' + dd);
        };

        $scope.onCourseTypeClick = function () {

            if ($scope.courseType === 'Continuous') {
                $scope.hideCalenderArea = true;
            } else {
                $scope.hideCalenderArea = false;
            }

        };

        $scope.getAllSelectedDistNSchool = function () {


            var idArrayOfSelectedDistSchool = new Array();
            angular.element("#distSchoolContainer input:checkbox:checked").each(function () {

                idArrayOfSelectedDistSchool.push(this.id);
            });
            return idArrayOfSelectedDistSchool;
        };

        $scope.updateRespectiveColumns = function (idArrayofDistSchool) {
            //Erasing existing Course array.
            $scope.existingCourseList = new Array();
            var len = idArrayofDistSchool.length;
            for (var i = 0; i < len; i++) {
                angular.element('#' + idArrayofDistSchool[i]).triggerHandler('click');
            }
            $scope.showWholePgLoading = false;
        };

        $scope.handleCopyEvent = function () {

            var selectedNewCoursedId = angular.element("#newcourseCatlogs input:checkbox:checked");
            if (selectedNewCoursedId.length === 0) {

                $scope.showModalPopup("There is no new courses to be copied from New Courses.");
                return;
            }

            $scope.showWholePgLoading = true;
            var objArrayOfSelected = $scope.getSelectedNewCourses();
            if (objArrayOfSelected.length > 0) {
                postcopycourse._post(objArrayOfSelected, $scope.disrtictObj[0].id).then(function (response) {
                    // success callback
                    if (response.data.messageType === 'SUCCESS') {
                        var idArrayOfSelectedDistSchool = $scope.getAllSelectedDistNSchool();

                        $timeout(function () {
                            $scope.updateRespectiveColumns(idArrayOfSelectedDistSchool);
                        }, 1000);

                        $scope.showModalPopup("New Courses has been copied successfully.");

                    } else {
                        $scope.showWholePgLoading = false;

                        $scope.showModalPopup("New Courses did not get copied, Please try again");

                    }
                },
                    function (response) {
                        $scope.showWholePgLoading = false;

                        $scope.showModalPopup("New Courses did not get copied, Please try again");
                    });
            }
        };
        $scope.onNewCourseClick = function (idStr, pIndex) {
            console.log(idStr, pIndex);
            var val = angular.element('#' + idStr).is(":checked");
            var parentChkBoxId = '#checkboxMainNewCourse_' + pIndex;
            if (val == false) {
                angular.element('#checkboxMainNewCourse_' + pIndex).prop('checked', false);

            }
        };
        $scope.onAllSelectCheck = function (idstr, childListId) {
            console.log("idstr  ", idstr);
            console.log("childListId  ", childListId);

            var listSbling = angular.element("#" + childListId).find('li')
            if (angular.element('#' + idstr).is(":checked")) {
                angular.element(listSbling).each(function () {
                    angular.element(this).find('input').prop('checked', true);
                });

            } else {
                angular.element(listSbling).each(function () {
                    angular.element(this).find('input').prop('checked', false);
                });
            }
        };


        $scope.showModalPopup = function (msg) {
            angular.element('#modalContent').text(msg);
            angular.element('#msgModal').modal('show');
        };

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.dateUpdate = function () {
            var currDate = new Date();
            $scope.startDateStartActivity = currDate.setDate(currDate.getDate());
            $scope.maxDateStartActivity = new Date().setDate(new Date().getDate());
            $scope.minDateStartActivity = new Date().setDate(new Date().getDate() - 1);
            $scope.startDateEndActivity = new Date().setDate(new Date().getDate() + 365);
        }

        $scope.onclicktoggleicon = function (idStr) {
            if (angular.element("#" + idStr).hasClass('fa-caret-down')) {
                angular.element("#" + idStr).removeClass('fa-caret-down');
                angular.element("#" + idStr).addClass('fa-caret-up');
            } else {
                angular.element("#" + idStr).addClass('fa-caret-down');
                angular.element("#" + idStr).removeClass('fa-caret-up');
            }
        }


        $scope._multiselectExistingCatalog_ = function () {
            //   console.log($scope.multiselectExistingCatalog);
            // for (var i = 0; i < $scope.multiselectModelAdminStudentCourse.length; i++) {
            //     $scope.studentCourseListIds.push($scope.multiselectModelAdminStudentCourse[i].id);
            // }

        };
        $scope.$watch('multiselectExistingCatalog', $scope._multiselectExistingCatalog_, true);
        //Initilizing variables.
        $scope.initValues();

        //Laoding data
        $scope.loadData();

        $scope.dateUpdate();

    }]);
