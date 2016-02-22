'use strict';

var sarModule = angular.module('studentActivityReports.studentDetails', []);
sarModule.controller('studentDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'getDataStudent',
    'getEnrollmentStatus', 'getStudentCourseData','notAuthenticated','noNetError','getServerConfigData',
    function ($scope, $rootScope, $routeParams, getDataStudent, getEnrollmentStatus, getStudentCourseData,notAuthenticated,noNetError,getServerConfigData) {

        console.dir("**Inside studentDetailsCtrl**");

        // console.log(getData._get($rootScope.role,$rootScope.userid));

        $scope.teacherId = $routeParams.userId;
        $scope.details = {};
        console.log("a");
        $rootScope.isblue = false;
        $scope.courseNotSelected = false;
        $scope.enrllNotSelected = false;
        $scope.srtDateNotSelected = false;
        $scope.endDateNotSelected = false;
        $scope.courseIdArr = [];
        $scope.enrollArr = [];



        /*
        * @startDate: holds the start date.
        * Acceptable date formats: mm-dd-yyyy, mm-dd-yy, ISO formatated string, miliseconds
        */
        var currDate = new Date();
        //var Date = new Date();
        $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
        $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
        // console.log( $scope.maxDate);
        $scope.startDateEndActivity = new Date();

        /*
        * @endDate: holds the start date.
        * Acceptable date formats: mm-dd-yyyy, mm-dd-yy, ISO formatated string, miliseconds
        */
        // $scope.endDate = "04-02-2016";

        /*
        * @courseArr: Courses received from server
        * TODO:: modify object structure as per data received.
        */

        $scope.enrollmentArr = getEnrollmentStatus.get();
        console.log("2378459023478927842748923749273423894792384798237498347923784");
        //getting Server url details
        var urlDetails =getServerConfigData._getDetails();
        console.log(urlDetails)
        getDataStudent._get($rootScope.role, $rootScope.userid,urlDetails)
            .then(function onsuccess(response) {
                console.log(response.data);
                $scope.setData(response.data);
                if(response.data.messageType ==="ERROR"){
                    notAuthenticated._showErrorMsg();
                    return;
                }

            }, function onerr(res) {
                console.log("Form net Error");
                notAuthenticated._showErrorMsg();
            });

        $scope.setData = function (studentCourse) {
            console.log(studentCourse);
            $scope.courseArr = studentCourse.data.course;

        };


        $scope.submitStudentInfo = function () {
           
            console.log(new Date($scope.startDateStartActivity));
            var startDateActivity = new Date($scope.startDateStartActivity);
            var endDateActivity = new Date($scope.startDateEndActivity);
            if (startDateActivity > endDateActivity) {
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

            if($scope.enrollArr.length===0){
                $scope.enrllNotSelected = true;
            }else{
                $scope.enrllNotSelected = false;
            }

        };

        // Success callback
        var handleSuccess = function (data, status) {
            $scope.details = data;
            console.log(status, $scope.details.courses._get);
        };

        // Error callback
        var handleError = function (err, status) {
            $scope.details = {};
            console.log(status, err);
        };

        //getData._get($scope.teacherId).success(handleSuccess).error(handleError);

        $scope.$watch('selectedDate', function () {
            console.log($scope.selectedDate);
        }, true);

        $scope.$watch('multiselectModelcourse', function () {

            console.log($scope.multiselectModelcourse);
            $scope.courseIdArr = [];

            for (var i = 0; i < $scope.multiselectModelcourse.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModelcourse[i].id);
                console.log($scope.courseIdArr);
            }


        }, true);

        $scope.$watch('multiselectModelenrollment', function () {

            console.log($scope.multiselectModelenrollment.length);

            $scope.enrollArr = [];
            console.log($scope.multiselectModelenrollment);

            for (var i = 0; i < $scope.multiselectModelenrollment.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelenrollment[i].id);
                console.log($scope.enrollArr);

            }


        }, true);

    }]);
