'use strict';

var sarModule = angular.module('teacherActivityReports.teacherDetails', []);
sarModule.controller('teacherDetailsCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'getDataCourseTeacher',
    'getEnrollmentStatus', 'getDataStudentTeacher', 'notAuthenticated', 'noNetError', 'config',
    function ($scope, $rootScope, $location, $routeParams, getDataCourseTeacher, getEnrollmentStatus, getDataStudentTeacher, notAuthenticated, noNetError, configJson) {

        console.dir("**Inside teacherDetailsCtrl**");

        // console.log(getData._get($rootScope.role,$rootScope.userid));
        
        $scope.init = function () {
            $scope.teacherId = $routeParams.teacherId;
            $scope.details = {};
            console.log("a");
            $rootScope.isblue = false;

            $scope.statusNotSelected = false;
            $scope.courseNotSelected = false;
            $scope.studentNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotgreater = false;
            $scope.minimumMinut = false;
            $scope.inputTeacher = 0;

            $scope.multiselectModel = [];
            $scope.courseIdArr = [];

            $scope.courseStudentIdArr = [];
            $scope.multiselectModel2 = [];

            $scope.enrollArr = [];
            $scope.multiselectModelEroll = [];

            $scope.searchagain = "displaynonecls";
            $scope.iframe_row = "displaynonecls";
            $scope.isShowReportView = false;
            
            /* @courseArr: Courses received from server

        * TODO:: modify object structure as per data received.
        */

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
            $scope.startDateEndActivity = new Date();
        }
        

        
        //getting service deatil object
        var urlDetails = configJson;
        getDataCourseTeacher._get($rootScope.role, $rootScope.userid, urlDetails)
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


        $scope.setDataOFStudent = function (courseIdArr) {

            getDataStudentTeacher._get($rootScope.role, courseIdArr, urlDetails)
                .then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }
                    console.log(response.data);
                    $scope.setDataStudent(response.data.data.user);
                }, function onError(response) {
                    console.log("Error on loading Student of Teacher page");
                    noNetError._showNetErrorMsg();
                });
        }
        $scope.setDataCourseTeacher = function (teacherCourse) {
            console.log(teacherCourse.data.course);
            $scope.courseArr = teacherCourse.data.course;
            console.log($scope.courseArr);
            for (var i = 0; i < $scope.courseArr.length; i++) {
                $scope.courseIdArr.push($scope.courseArr[i].id);
                console.log($scope.courseIdArr);
            }

            $scope.setDataOFStudent($scope.courseIdArr);

            //            getDataStudentTeacher._get($rootScope.role, $scope.courseIdArr, urlDetails)
            //                .then(function onsuccess(response) {
            //                    if (response.data.messageType === "ERROR") {
            //                        notAuthenticated._showErrorMsg();
            //                        return;
            //                    }
            //                    console.log(response.data);
            //                    $scope.setDataStudent(response.data.data.user);
            //                }, function onError(response) {
            //                    console.log("Error on loading Student of Teacher page");
            //                    noNetError._showNetErrorMsg();
            //                });
        };


        $scope.setDataStudent = function (studentCourse) {
            console.log(studentCourse);
            $scope.studentArr = studentCourse;
            console.log($scope.studentArr);
        };

        $scope.onChangeCourseSelect = function (courseIdArr) {
            if (courseIdArr.length === 0) {
                var tempArr = [];
                $scope.setDataStudent(tempArr);

                return;
            }
            //            $scope.setDataStudent(courseIdArr);
            getDataStudentTeacher._get($rootScope.role, courseIdArr, urlDetails)
                .then(function onsuccess(response) {
                    console.log(response.data);
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }else{
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

        $scope.submit = function () {
            console.log(new Date($scope.startDateStartActivity));
            var startDateActivity = new Date($scope.startDateStartActivity);
            var endDateActivity = new Date($scope.startDateEndActivity);
            if ($scope.startDateStartActivity == null) {

                $scope.srtDateNotSelected = true;
            } else {
                $scope.srtDateNotSelected = false;
            }

            if (startDateActivity > endDateActivity || $scope.startDateEndActivity == null) {
                $scope.endDateNotgreater = true;
            }
            else {
                $scope.endDateNotgreater = false;
            }

            if ($scope.enrollArr.length === 0) {
                $scope.statusNotSelected = true;
            } else {
                $scope.statusNotSelected = false;
            }

            //TODO for Status select option  $scope.statusNotSelected = true;

            if ($scope.courseIdArr.length === 0) {
                $scope.courseNotSelected = true;
            } else {
                $scope.courseNotSelected = false;
            }
            if ($scope.courseStudentIdArr.length === 0) {
                $scope.studentNotSelected = true;
            } else {
                $scope.studentNotSelected = false;
            }
            console.log($scope.inputTeacher)
            if ($scope.inputTeacher === undefined || $scope.inputTeacher === null || $scope.inputTeacher < 0 || !$scope.isInt($scope.inputTeacher)) {
                $scope.minimumMinut = true;
            } else {
                $scope.minimumMinut = false;
            }


            if (!$scope.endDateNotgreater && !$scope.statusNotSelected && !$scope.courseNotSelected && !$scope.studentNotSelected && !$scope.minimumMinut && !$scope.srtDateNotSelected) {
                
                //Setting varaible for Animation
                    $scope.isShowReportView = true;

            }
        };

        $scope.backTeacher = function () {
            // debugger;
            $location.path('/');
        }


        //        // Success callback
        //        var handleSuccess = function (data, status) {
        //            $scope.details = data;
        //            console.log(status, $scope.details.courses._get);
        //        };
        //
        //        // Error callback
        //        var handleError = function (err, status) {
        //            $scope.details = {};
        //            console.log(status, err);
        //        };

        //getData._get($scope.teacherId).success(handleSuccess).error(handleError);
        
        $scope._selectedDate_ = function () {

            console.log($scope.selectedDate);
        };

        $scope.$watch('selectedDate', $scope._selectedDate_, true);

        $scope._multiselectModel_ = function () {

            console.log($scope.multiselectModel);
            $scope.courseIdArr = [];

            for (var i = 0; i < $scope.multiselectModel.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModel[i].id);
                console.log($scope.courseIdArr);
            }
            $scope.onChangeCourseSelect($scope.courseIdArr);
        }

        $scope.$watch('multiselectModel', $scope._multiselectModel_, true);

        $scope._multiselectModel2_ = function () {

            console.log($scope.multiselectModel2);

            $scope.courseStudentIdArr = [];
            for (var i = 0; i < $scope.multiselectModel2.length; i++) {
                $scope.courseStudentIdArr.push($scope.multiselectModel2[i].id);
                console.log($scope.courseStudentIdArr);
            }
        }



        $scope.$watch('multiselectModel2', $scope._multiselectModel2_, true);
        //  console.log("$scope.courseIdArr", $scope.courseIdArr);
        
        $scope._multiselectModelEroll_ = function () {

            console.log($scope.multiselectModelEroll.length);

            $scope.enrollArr = [];
            console.log($scope.multiselectModelEroll);

            for (var i = 0; i < $scope.multiselectModelEroll.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelEroll[i].id);
                console.log($scope.enrollArr);

            }
        }

        $scope.$watch('multiselectModelEroll', $scope._multiselectModelEroll_, true);


        $scope.searchAgain = function () {
            $scope.isShowReportView = false;
            console.log($scope.isShowReportView);
        }

        $scope.init();
        $scope.dateUpdate();

    }]);
