'use strict';

var teacherCourseCompletionModule = angular.module('teacherActivityReports.teacherCourseComp', []);
teacherCourseCompletionModule.controller('teacherCourseCompletionCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'getDataCourseTeacher',
    'getEnrollmentStatus', 'getDataStudentTeacher', 'notAuthenticated', 'noNetError', 'iFrameLoading', '$sce', '$timeout','showReport','GetDateAsString','GetEnrollIdAsString',
    function ($scope, $rootScope, $location, $routeParams, getDataCourseTeacher, getEnrollmentStatus,
        getDataStudentTeacher, notAuthenticated, noNetError, iFrameLoading, $sce, $timeout,showReport,GetDateAsString,GetEnrollIdAsString) {

        console.dir("**Inside teacherDetailsCtrl**");

        // console.log(getData._get($rootScope.role,$rootScope.userid));
        
        $scope.init = function () {
            $scope.teacherId = $routeParams.teacherId;
            $scope.details = {};
            // console.log("a");
            $rootScope.isblue = false;

            $scope.statusNotSelected = false;
            $scope.courseNotSelected = false;
            $scope.studentNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotgreater = false;
           // $scope.minimumMinut = false;
           // $scope.inputTeacher = 0;
            $scope.iframeReportUrl = null;
            $scope.oldReportUrl = null;
            $scope.newReportUrl = null;
            $scope.finalGarade =true;


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
            //var Date = new Date();
            $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 365);
            $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
            $scope.startDateEndActivity = new Date();
            
            //getting service deatil object
            $scope.urlDetails = $rootScope.winConfigObj;

            $scope.enrollmentArr = getEnrollmentStatus.get();
        }

        /*
        * @startDate: holds the start date.
        * Acceptable date formats: mm-dd-yyyy, mm-dd-yy, ISO formatated string, miliseconds
        */

        // $scope.dateUpdate = function () {
        //     var currDate = new Date();
        //     //var Date = new Date();
        //     $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 365);
        //     $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
        //     $scope.startDateEndActivity = new Date();
        // }
        
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
                    console.log(response.data);
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
            //            $scope.setDataStudent(courseIdArr);
            getDataStudentTeacher._get($rootScope.role, courseIdArr, $scope.urlDetails)
                .then(function onsuccess(response) {
                    console.log(response.data);
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

            console.log('isvalidData : ', isDataValidate);
            if (isDataValidate) {
                //Setting varaible for Animation
                var urlDetailObj = $rootScope.winConfigObj;
                var courseStr = $scope.courseIdArr.join(',');
                var courseStudentIds = $scope.courseStudentIdArr.join(',');
                var startDateStr = GetDateAsString.dateStr(new Date($scope.startDateStartActivity));
                 console.log('startDateStr ',startDateStr);
                var endDateStr = GetDateAsString.dateStr($scope.startDateEndActivity);
                 console.log('endDateStr ',endDateStr);
                var enrollIdsArray = GetEnrollIdAsString.getEnrollIdStr($scope);
                console.log('enrollIdsArray ',enrollIdsArray);
                var enrollStr = enrollIdsArray.join(',');
                var finalGrade = $scope.finalGarade ? '1' : '0';

                // $scope.newReportUrl = urlDetailObj.reportServiceUrlStudent + '/studentactivityreportforteacher?startdate=' + startDateStr + '&enddate=' + endDateStr
                // + '&userid=' + $rootScope.userid + '&courseids=' + courseStr + '&studentids=' + courseStudentIds +'&finalgrades='
                // + finalGrade + '&enrollmentstatus=' + enrollStr +  '&userspace=' + $rootScope.userspace + '&token=' + $rootScope.token;
                // console.log("reportUrl : ", $scope.newReportUrl);
                
                $scope.newReportUrl = urlDetailObj.reportServiceUrlStudent + '/coursecompletion?startdate=' + startDateStr + '&enddate=' + endDateStr
                + '&userid=' + $rootScope.userid + '&courseids=' + courseStr + '&studentids=' + courseStudentIds +'&finalgrades='
                + finalGrade + '&enrollmentstatus=' + enrollStr +  '&userspace=' + $rootScope.userspace + '&token=' + $rootScope.token;
                console.log("reportUrl : ", $scope.newReportUrl);
                
                //call service to load url in Iframe
                showReport.loadOnIFrame($scope);
            }
        }
        $scope.submit = function () {
            // console.log(new Date($scope.startDateStartActivity));
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
            // console.log($scope.inputTeacher)
            // if ($scope.inputTeacher === undefined || $scope.inputTeacher === null || $scope.inputTeacher < 0 || !$scope.isInt($scope.inputTeacher)) {
            //     $scope.minimumMinut = true;
            //     isvalidData = false;
            // } else {
            //     $scope.minimumMinut = false;

            // }

            $scope.showTeacherReport(isvalidData);
        };

        $scope.backTeacher = function () {
            // debugger;
            $location.path('/');
        }

        $scope._selectedDate_ = function () {

            // console.log($scope.selectedDate);
        };

        $scope.$watch('selectedDate', $scope._selectedDate_, true);

        $scope._multiselectModel_ = function () {

            // console.log($scope.multiselectModel);
            $scope.courseIdArr = [];

            for (var i = 0; i < $scope.multiselectModel.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModel[i].id);
                // console.log($scope.courseIdArr);
            }
            $scope.onChangeCourseSelect($scope.courseIdArr);
        }

        $scope.$watch('multiselectModel', $scope._multiselectModel_, true);

        $scope._multiselectModel2_ = function () {

            // console.log($scope.multiselectModel2);

            $scope.courseStudentIdArr = [];
            for (var i = 0; i < $scope.multiselectModel2.length; i++) {
                $scope.courseStudentIdArr.push($scope.multiselectModel2[i].id);
                // console.log($scope.courseStudentIdArr);
            }
        }



        $scope.$watch('multiselectModel2', $scope._multiselectModel2_, true);
        //  console.log("$scope.courseIdArr", $scope.courseIdArr);
        
        $scope._multiselectModelEroll_ = function () {

            // console.log($scope.multiselectModelEroll.length);

            $scope.enrollArr = [];
            // console.log($scope.multiselectModelEroll);

            for (var i = 0; i < $scope.multiselectModelEroll.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelEroll[i].id);
                // console.log($scope.enrollArr);

            }
        }

        $scope.$watch('multiselectModelEroll', $scope._multiselectModelEroll_, true);


        $scope.searchAgain = function () {
            $scope.isShowReportView = false;
            // console.log($scope.isShowReportView);
        }

        $scope.init();
        $scope.loadData();
        // $scope.dateUpdate();

    }]);
