'use strict';

var studProgReportModule = angular.module('studentActivityReports.studentProgressReport', []);
studProgReportModule.controller('studentProgressReportCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'getDataStudent',
    'getEnrollmentStatus', 'getStudentCourseData', 'notAuthenticated', 'noNetError', '$sce', 'iFrameLoading', '$timeout','showReport','GetDateAsString','GetEnrollIdAsString',
    function ($scope, $rootScope, $routeParams, $location, getDataStudent, getEnrollmentStatus, getStudentCourseData,
        notAuthenticated, noNetError, $sce, iFrameLoading, $timeout,showReport,GetDateAsString,GetEnrollIdAsString) {

        console.dir("**Inside studentDetailsCtrl**");
        $scope.init = function () {

            $scope.details = {};
            $rootScope.isblue = false;
            $rootScope.showoverlayOniFrameLoading = false;
            $scope.courseNotSelected = false;
            $scope.enrllNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotSelected = false;
            $scope.includeGrade =true;
            $scope.iframeReportUrl = null;
            $scope.newReportUrl = null;
            $scope.oldReportUrl = null;
            $scope.courseIdArr = [];
            $scope.enrollArr = [];

            $scope.searchagain = "displaynonecls";
            $scope.iframe_row = "displaynonecls";
            $scope.isShowReportView = false;
            $scope.urlDetails = $rootScope.winConfigObj;
            $scope.enrollmentArr = getEnrollmentStatus.get();
        }

        $scope.dateUpdate = function () {
            var currDate = new Date();
            $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 365);
            $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
            $scope.startDateEndActivity = new Date();
        }

        //getting Server url details
        $scope.getStudentData = function () {
            getDataStudent._get($rootScope.role, $rootScope.userid, $scope.urlDetails)
                .then(function onsuccess(response) {
                    console.log(response.data);
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    } else {
                        $scope.setData(response.data);
                    }

                }, function onerr(res) {
                    console.log("Form net Error");
                    notAuthenticated._showErrorMsg();
                });
        }


        $scope.setData = function (studentCourse) {
            console.log(studentCourse);
            $scope.courseArr = studentCourse.data.course;

        };

        $scope.submitStudentInfo = function () {

            var startDateActivity = new Date($scope.startDateStartActivity);
            var endDateActivity = new Date($scope.startDateEndActivity);
            if ($scope.startDateStartActivity === null) {

                $scope.srtDateNotSelected = true;
            } else {
                $scope.srtDateNotSelected = false;
            }

            if (startDateActivity > endDateActivity || $scope.startDateEndActivity === null) {
                $scope.endDateNotSelected = true;
            }
            else {
                $scope.endDateNotSelected = false;
            }

            if ($scope.courseIdArr.length === 0) {
                $scope.courseNotSelected = true;
            } else {
                $scope.courseNotSelected = false;
            }

            if ($scope.enrollArr.length === 0) {
                $scope.enrllNotSelected = true;
            } else {
                $scope.enrllNotSelected = false;
            }


            if (!$scope.endDateNotSelected && !$scope.courseNotSelected
                && !$scope.enrllNotSelected && !$scope.srtDateNotSelected) {
                
                var urlDetailObj = $rootScope.winConfigObj;

                var courseStr = $scope.courseIdArr.join(',');
                var enrollStr = $scope.enrollArr.join(',');
                var startDateStr = GetDateAsString.dateStr(new Date($scope.startDateStartActivity));
                var endDateStr = GetDateAsString.dateStr(new Date($scope.startDateEndActivity));
                var enrollIdsArray = GetEnrollIdAsString.getEnrollIdStr($scope);
                enrollStr = enrollIdsArray.join(',');
                var excuseItemStr = $scope.includeGrade ? '1' : '0';

                
                $scope.newReportUrl = urlDetailObj.reportServiceUrlStudent + '/progressreport?startdate=' + startDateStr + '&enddate=' + endDateStr
                + '&userid=' + $rootScope.userid + '&courseids=' + courseStr + '&enrollmentstatus=' + enrollStr + '&finalgrades='
                + excuseItemStr + '&userspace=' + $rootScope.userspace + '&token=' + $rootScope.token;

                 //call service to load url in Iframe
                 showReport.loadOnIFrame($scope);
               
            }
        };

        $scope.backStudent = function () {
            $location.path('/');
        }

        $scope._multiselectModelcourse_ = function () {
            $scope.courseIdArr = [];
            for (var i = 0; i < $scope.multiselectModelcourse.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModelcourse[i].id);
            }
        }

        $scope.$watch('multiselectModelcourse', $scope._multiselectModelcourse_, true);

        $scope._multiselectModelenrollment_ = function () {
            $scope.enrollArr = [];
            for (var i = 0; i < $scope.multiselectModelenrollment.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelenrollment[i].id);

            }
        }

        $scope.$watch('multiselectModelenrollment', $scope._multiselectModelenrollment_, true);

        $scope.searchAgain = function () {
            $scope.isShowReportView = false;
        }

        $scope.init();
        $scope.dateUpdate();
        $scope.getStudentData();


    }]);
