'use strict';

var sarModule = angular.module('teacherActivityReports.teacherDetails', []);
sarModule.controller('teacherDetailsCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'getDataCourseTeacher',
    'getEnrollmentStatus', 'getDataStudentTeacher', 'notAuthenticated', 'noNetError', 'config', 'iFrameLoading', '$sce', '$timeout',
    function ($scope, $rootScope, $location, $routeParams, getDataCourseTeacher, getEnrollmentStatus, getDataStudentTeacher, notAuthenticated, noNetError, configJson, iFrameLoading, $sce, $timeout) {

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
            $scope.teacherReportUrl = null;
            $scope.oldReportUrl = null;
            $scope.newReportUrl = null;
            

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
        $scope.getDateAsString = function (dateObj) {
            
            // var today = new Date();
            var dd = dateObj.getDate();
            var mm = dateObj.getMonth() + 1; //January is 0!

            var yyyy = dateObj.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            return (dd + '/' + mm + '/' + yyyy);
            //document.getElementById("DATE").value = today;
            
        }
        $scope.getEnrollIdStr = function () {
            console.log("**************", $scope.enrollArr);
            var temObj = ["1", "4", "5", "6", "7", "8", "9", "10"];
            //Active = 1,
            //    Withdrawn = 4,
            //    WithdrawnFailed = 5,
            //    Transferred = 6,
            //    Completed = 7,
            //    CompletedNoCredit = 8,
            //    Suspended = 9,
            //    Inactive = 10,
            //$scope.enrollArr            
            var idArray = [];
            for (var i = 0; i < $scope.enrollArr.length; i++) {
                console.log("$scope.enrollArr ", $scope.enrollArr[i]);
                console.log("temObj.enrollArr ", temObj[$scope.enrollArr[i]]);

                idArray.push(temObj[$scope.enrollArr[i]]);
            }
            return idArray;
        }

        $scope.showTeacherReport = function (isDataValidate) {

            console.log('isvalidData : ', isDataValidate);
            if (isDataValidate) {
                //Setting varaible for Animation
                
                var urlDetailObj = configJson;
                //$scope.courseIdArr.length

                var courseStr = $scope.courseIdArr.join(',');
                //$scope.courseStudentIdArr

                var courseStudentIds = $scope.courseStudentIdArr.join(',');
                console.log("courseStudentIds : ", courseStudentIds);
                //var enrollStr = $scope.enrollArr.join(',');
                console.log("$scope.startDateStartActivity ", new Date($scope.startDateStartActivity));
                console.log("$scope.startDateEndActivity ", $scope.startDateEndActivity);
                console.log("$rootScope.userid ", $rootScope.userid);
                console.log("$rootScope.userid ", $rootScope.userspace);
                console.log("$scope.excuedItem ", $scope.excuedItem);
                console.log("Token :", $rootScope.token);
                var startDateStr = $scope.getDateAsString(new Date($scope.startDateStartActivity));
                var endDateStr = $scope.getDateAsString($scope.startDateEndActivity);

                console.log(startDateStr, endDateStr);

                var enrollIdsArray = $scope.getEnrollIdStr();
                var enrollStr = enrollIdsArray.join(',');
                console.log(enrollStr);
                var excuseItemStr = $scope.excuedItem ? '1' : '0';

                // var reportUrl = urlDetailObj.reportServiceUrlStudent + '/studentactivityreportforteacher?startdate=' + startDateStr + '&enddate=' + endDateStr
                //     + '&userid=' + $rootScope.userid + '&courseids=' + courseStr + '&studentids=' + courseStudentIds + '&minimumminutes=' + $scope.minimumMinut + '&enrollmentstatus=' + enrollStr + '&excuseditem='
                //     + excuseItemStr + '&userspace=' + $rootScope.userspace + '&token=' + $rootScope.token;
                // console.log("reportUrl : ", $scope.minimumMinut);
               $scope.newReportUrl = "http://192.168.2.58:8080/reports/studentactivityreportforteacher?startdate=01/02/2014&enddate=01/18/2019&userid=24910841&courseids=23520819,23522897,23596492&studentids=21298560,21298527,21298500,24998188&minimumminutes=2&enrollmentstatus=1,10&excuseditem=0&serspace=gsd-06&token=~gzYwCAAAAAwV29myGEzN-A.wPoIwcxlw1FBzxFvLW2W9C";
                
                
     //            $scope.newReportUrl = 'http://192.168.2.58:8080/reports/studentactivityreport?startdate=01/02/2014&enddate=01/18/2019&userid=23696742&courseids=23598050,23598525&enrollmentstatus=1,10&excuseditem=0&userspace=sdale-innovation&token=~FbT1BAAAAAgCqkx2orhMPA.ubJwpnTsLvN3eKwu5jvOVB';
                
                if( $scope.oldReportUrl != $scope.newReportUrl){
                    
                    //assigning new url to old url valiable 
                    $scope.oldReportUrl = $scope.newReportUrl;
                    $scope.teacherReportUrl = $sce.trustAsResourceUrl($scope.newReportUrl);
                    //Setting varaible for Animation
                    $scope.isShowReportView = true;
                    $rootScope.showoverlayOniFrameLoading = true;
                    
                    iFrameLoading.subscribeiFrameLoading();
                    $rootScope.$on('iframeloading.done', function (a, b) {
                        $timeout(function () {
                            $rootScope.showoverlayOniFrameLoading = false;
                        }, 3000);
                        $scope.$apply();
                       });
                    
                }else{
                    $scope.isShowReportView = true;
                }
                console.log($scope.isShowReportView);
            }
        }
        $scope.submit = function () {
            console.log(new Date($scope.startDateStartActivity));
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
            console.log($scope.inputTeacher)
            if ($scope.inputTeacher === undefined || $scope.inputTeacher === null || $scope.inputTeacher < 0 || !$scope.isInt($scope.inputTeacher)) {
                $scope.minimumMinut = true;
                isvalidData = false;
            } else {
                $scope.minimumMinut = false;

            }

            $scope.showTeacherReport(isvalidData);


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
