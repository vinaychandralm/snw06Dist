'use strict';

var sarModule = angular.module('teacherActivityReports.teacherDetails', []);
sarModule.controller('teacherDetailsCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'getDataCourseTeacher',
    'getEnrollmentStatus', 'getDataStudentTeacher', 'notAuthenticated', 'noNetError', 'iFrameLoading', '$sce', '$timeout','showReport','GetDateAsString','GetEnrollIdAsString',
    function ($scope, $rootScope, $location, $routeParams, getDataCourseTeacher, getEnrollmentStatus,
        getDataStudentTeacher, notAuthenticated, noNetError, iFrameLoading, $sce, $timeout,showReport,GetDateAsString,GetEnrollIdAsString) {

        
        $scope.init = function () {
            $scope.teacherId = $routeParams.teacherId;
            $scope.details = {};
            $rootScope.isblue = false;
            $scope.statusNotSelected = false;
            $scope.courseNotSelected = false;
            $scope.studentNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotgreater = false;
            $scope.inputTeacher = 0;
            $scope.iframeReportUrl = null;
            $scope.oldReportUrl = null;
            $scope.newReportUrl = null;
            $scope.excuedItem = false;
            $scope.multiselectModel = [];
            $scope.courseIdArr = [];
            $scope.courseStudentIdArr = [];
            $scope.multiselectModel2 = [];
            $scope.enrollArr = [];
            $scope.multiselectModelEroll = [];
            $scope.searchagain = "displaynonecls";
            $scope.iframe_row = "displaynonecls";
            $scope.isShowReportView = false;
            
            var currDate = new Date();
            $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
            $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
            $scope.startDateEndActivity = new Date();
            
            //getting service deatil object
            $scope.urlDetails = $rootScope.winConfigObj;
            $scope.enrollmentArr = getEnrollmentStatus.get();
        }

        //setting data on student dropdown list
        $scope.setDataStudent = function (studentCourse) {
            $scope.studentArr = studentCourse;
        };

        //getting data for student dropdown list
        $scope.getDataOFStudent = function (courseIdArr) {

            getDataStudentTeacher._get($rootScope.role, courseIdArr, $scope.urlDetails)
                .then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }
                    $scope.setDataStudent(response.data.data.user);
                }, function onError(response) {
                    console.log("Error on loading Student of Teacher page");
                    noNetError._showNetErrorMsg();
                });
        }


        //setting Course dropDown modal
        $scope.setDataCourseTeacher = function (teacherCourse) {
            $scope.courseArr = teacherCourse.data.course;
            for (var i = 0; i < $scope.courseArr.length; i++) {
                $scope.courseIdArr.push($scope.courseArr[i].id);
            }

            $scope.getDataOFStudent($scope.courseIdArr);

        };

        $scope.loadData = function () {
            getDataCourseTeacher._get($rootScope.role, $rootScope.userid, $scope.urlDetails)
                .then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }
                    $scope.setDataCourseTeacher(response.data);
                }, function onError(response) {
                    console.log("Error Ajax in get Course OF teacher page");
                    noNetError._showNetErrorMsg();
                });
        }

        $scope.onChangeCourseSelect = function (courseIdArr) {
            if (courseIdArr.length === 0) {
                var tempArr = [];
                $scope.setDataStudent(tempArr);

                return;
            }
            getDataStudentTeacher._get($rootScope.role, courseIdArr, $scope.urlDetails)
                .then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    } else {
                        $scope.setDataStudent(response.data.data.user);
                    }

                }, function onError(response) {
                    console.log("Error on loading Student of Teacher page");
                    noNetError._showNetErrorMsg();
                });

        };

        $scope.isInt = function (n) {
            return n % 1 === 0;
        }
       
        $scope.showTeacherReport = function (isDataValidate) {

            if (isDataValidate) {
                var urlDetailObj = $rootScope.winConfigObj;
                var courseStr = $scope.courseIdArr.join(',');
                var courseStudentIds = $scope.courseStudentIdArr.join(',');
                var startDateStr = GetDateAsString.dateStr(new Date($scope.startDateStartActivity));
                var endDateStr = GetDateAsString.dateStr($scope.startDateEndActivity);
                var enrollIdsArray = GetEnrollIdAsString.getEnrollIdStr($scope);
                var enrollStr = enrollIdsArray.join(',');
                var excuseItemStr = $scope.excuedItem ? '1' : '0';

                $scope.newReportUrl = urlDetailObj.reportServiceUrlStudent + '/studentactivityreportforteacher?startdate=' + startDateStr + '&enddate=' + endDateStr
                + '&userid=' + $rootScope.userid + '&courseids=' + courseStr + '&studentids=' + courseStudentIds + '&minimumminutes=' + $scope.inputTeacher + '&enrollmentstatus=' + enrollStr + '&excuseditem='
                + excuseItemStr + '&userspace=' + $rootScope.userspace + '&token=' + $rootScope.token;
                
                //call service to load url in Iframe
                showReport.loadOnIFrame($scope);
            }
        }
        $scope.submit = function () {
            var startDateActivity = new Date($scope.startDateStartActivity);
            var endDateActivity = new Date($scope.startDateEndActivity);
            var isvalidData = true;
            if ($scope.startDateStartActivity == null) {

                $scope.srtDateNotSelected = true;
                isvalidData = false;
            } else {
                $scope.srtDateNotSelected = false;

            }

            if (startDateActivity > endDateActivity || $scope.startDateEndActivity == null) {
                $scope.endDateNotgreater = true;
                isvalidData = false;
            }
            else {
                $scope.endDateNotgreater = false;

            }

            if ($scope.enrollArr.length === 0) {
                $scope.statusNotSelected = true;
                isvalidData = false;
            } else {
                $scope.statusNotSelected = false;

            }

            //TODO for Status select option  $scope.statusNotSelected = true;

            if ($scope.courseIdArr.length === 0) {
                $scope.courseNotSelected = true;
                isvalidData = false;
            } else {
                $scope.courseNotSelected = false;

            }
            if ($scope.courseStudentIdArr.length === 0) {
                $scope.studentNotSelected = true;
                isvalidData = false;
            } else {
                $scope.studentNotSelected = false;

            }
            if ($scope.inputTeacher === undefined || $scope.inputTeacher === null || $scope.inputTeacher < 0 || !$scope.isInt($scope.inputTeacher)) {
                $scope.minimumMinut = true;
                isvalidData = false;
            } else {
                $scope.minimumMinut = false;

            }

            $scope.showTeacherReport(isvalidData);
        };

        $scope.backTeacher = function () {
            $location.path('/');
        }

        $scope._selectedDate_ = function () {

            // console.log($scope.selectedDate);
        };

        $scope.$watch('selectedDate', $scope._selectedDate_, true);

        $scope._multiselectModel_ = function () {

            $scope.courseIdArr = [];

            for (var i = 0; i < $scope.multiselectModel.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModel[i].id);
            }
            $scope.onChangeCourseSelect($scope.courseIdArr);
        }

        $scope.$watch('multiselectModel', $scope._multiselectModel_, true);

        $scope._multiselectModel2_ = function () {

            $scope.courseStudentIdArr = [];
            for (var i = 0; i < $scope.multiselectModel2.length; i++) {
                $scope.courseStudentIdArr.push($scope.multiselectModel2[i].id);
            }
        }



        $scope.$watch('multiselectModel2', $scope._multiselectModel2_, true);
        $scope._multiselectModelEroll_ = function () {
            $scope.enrollArr = [];
            for (var i = 0; i < $scope.multiselectModelEroll.length; i++) {
                $scope.enrollArr.push($scope.multiselectModelEroll[i].id);
            }
        }
        $scope.$watch('multiselectModelEroll', $scope._multiselectModelEroll_, true);
        $scope.searchAgain = function () {
            $scope.isShowReportView = false;
        }

        $scope.init();
        $scope.loadData();

    }]);
