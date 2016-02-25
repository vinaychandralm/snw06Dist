'use strict';

var sarModule = angular.module('studentActivityReports.studentDetails', []);
sarModule.controller('studentDetailsCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'getDataStudent',
    'getEnrollmentStatus', 'getStudentCourseData', 'notAuthenticated', 'noNetError', 'getServerConfigData',
    function ($scope, $rootScope, $routeParams, $location, getDataStudent, getEnrollmentStatus, getStudentCourseData, notAuthenticated, noNetError, getServerConfigData) {

        console.dir("**Inside studentDetailsCtrl**");

        // console.log(getData._get($rootScope.role,$rootScope.userid));
        
        $scope.init = function () {

            // $scope.teacherId = $routeParams.userId;
            $scope.details = {};
            console.log("a");
            $rootScope.isblue = false;
            $scope.courseNotSelected = false;
            $scope.enrllNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotSelected = false;
            $scope.courseIdArr = [];
            $scope.enrollArr = [];

            $scope.searchagain = "displaynonecls";
            $scope.iframe_row = "displaynonecls";   
            $scope.isShowReportView = false;

            $scope.enrollmentArr = getEnrollmentStatus.get();
        }




        /*
        * @startDate: holds the start date.
        * Acceptable date formats: mm-dd-yyyy, mm-dd-yy, ISO formatated string, miliseconds
        */

        $scope.dateUpdate = function () {
            var currDate = new Date();
            //var Date = new Date();
            $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
            $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
            // console.log( $scope.maxDate);
            $scope.startDateEndActivity = new Date();
        }
        

        /*
        * @endDate: holds the start date.
        * Acceptable date formats: mm-dd-yyyy, mm-dd-yy, ISO formatated string, miliseconds
        */
        // $scope.endDate = "04-02-2016";

        /*
        * @courseArr: Courses received from server
        * TODO:: modify object structure as per data received.
        */

       
        // console.log("2378459023478927842748923749273423894792384798237498347923784");
        //getting Server url details
        var urlDetails = getServerConfigData._getDetails();
        console.log(urlDetails);

        $scope.getStudentData = function () {
            getDataStudent._get($rootScope.role, $rootScope.userid, urlDetails)
                .then(function onsuccess(response) {
                    console.log(response.data);                    
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }else{
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


            if (!$scope.endDateNotSelected && !$scope.courseNotSelected && !$scope.enrllNotSelected && !$scope.srtDateNotSelected) {
                //Setting varaible for Animation
                $scope.isShowReportView = true;
                console.log($scope.isShowReportView);
            }


        };

        $scope.backStudent = function () {
            // debugger;
            $location.path('/');
        }

        // Success callback
        // var handleSuccess = function (data, status) {
        //     $scope.details = data;
        //     console.log(status, $scope.details.courses._get);
        // };

        // // Error callback
        // var handleError = function (err, status) {
        //     $scope.details = {};
        //     console.log(status, err);
        // };

        //getData._get($scope.teacherId).success(handleSuccess).error(handleError);

        // $scope.$watch('selectedDate', function (v) {
        //     console.log($scope.selectedDate);
        //     var d = new Date(v);
        //     var curr_date = d.getDate();
        //     var curr_month = d.getMonth() + 1; //Months are zero based
        //     var curr_year = d.getFullYear();
        //     $scope.modDate = curr_date + "/" + curr_month + "/" + curr_year;
        //     console.log($scope.modDate)
        // }, true);

        $scope.$watch('multiselectModelcourse', function () {

            console.log($scope.multiselectModelcourse);
            $scope.courseIdArr = [];

            for (var i = 0; i < $scope.multiselectModelcourse.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModelcourse[i].id);
                console.log($scope.courseIdArr);
            }


        }, true);

        $scope.$watch('multiselectModelenrollment', function () {

            // console.log($scope.multiselectModelenrollment.length);

            $scope.enrollArr = [];
            console.log($scope.multiselectModelenrollment);

            for (var i = 0; i < $scope.multiselectModelenrollment.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelenrollment[i].id);
                console.log($scope.enrollArr);

            }


        }, true);
        $scope.searchAgain = function () {
            $scope.isShowReportView = false;
            console.log($scope.isShowReportView);
        }

        $scope.init();
        $scope.dateUpdate();
        $scope.getStudentData();


    }]);
