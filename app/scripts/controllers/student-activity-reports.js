'use strict';

var sarModule = angular.module('studentActivityReports.studentDetails', []);
sarModule.controller('studentDetailsCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'getDataStudent',
    'getEnrollmentStatus', 'getStudentCourseData', 'notAuthenticated', 'noNetError', 'config', '$sce', 'iFrameLoading', '$timeout',
    function ($scope, $rootScope, $routeParams, $location, getDataStudent, getEnrollmentStatus, getStudentCourseData, notAuthenticated, noNetError, configJson, $sce, iFrameLoading, $timeout) {

        console.dir("**Inside studentDetailsCtrl**");

        // console.log(getData._get($rootScope.role,$rootScope.userid));
        
        $scope.init = function () {

            // $scope.teacherId = $routeParams.userId;
            $scope.details = {};
            console.log("a");
            $rootScope.isblue = false;
            $rootScope.showoverlayOniFrameLoading = false;
            $scope.courseNotSelected = false;
            $scope.enrllNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotSelected = false;
            $scope.excuedItem = false;
            $scope.studentReportUrl = null;
            $scope.newReportUrl = null;
            $scope.oldReportUrl = null;
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

        //getting Server url details
        var urlDetails = configJson
        console.log(urlDetails);

        $scope.getStudentData = function () {
            getDataStudent._get($rootScope.role, $rootScope.userid, urlDetails)
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
                
                var urlDetailObj = configJson;

                var courseStr = $scope.courseIdArr.join(',');
                var enrollStr = $scope.enrollArr.join(',');
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
                enrollStr = enrollIdsArray.join(',');
                console.log(enrollStr);
                var excuseItemStr = $scope.excuedItem ? '1' : '0';
                
                $scope.newReportUrl = urlDetailObj.reportServiceUrlStudent +'/studentactivityreport?startdate='+startDateStr+'&enddate='+endDateStr
                    +'&userid='+$rootScope.userid+'&courseids='+courseStr+'&enrollmentstatus='+enrollStr+'&excuseditem='
                    +excuseItemStr+'&userspace='+$rootScope.userspace+'&token='+$rootScope.token;

                // $scope.newReportUrl = 'http://192.168.2.58:8080/reports/studentactivityreport?startdate=01/02/2014&enddate=01/18/2019&userid=23696742&courseids=23598050,23598525&enrollmentstatus=1,10&excuseditem=0&userspace=sdale-innovation&token=~FbT1BAAAAAgCqkx2orhMPA.ubJwpnTsLvN3eKwu5jvOVB';
           //    console.log(reportUrl);

                // $scope.studentReportUrl = $sce.trustAsResourceUrl(reportUrl);
                // $scope.isShowReportView = true;
                // $rootScope.showoverlayOniFrameLoading = true;
                
                
                // iFrameLoading.subscribeiFrameLoading();
                // $rootScope.$on('iframeloading.done', function (a, b) {
                //     $timeout(function () {
                //         $rootScope.showoverlayOniFrameLoading = false;
                //     }, 3000);
                //     $scope.$apply();
                // });
                 if( $scope.oldReportUrl != $scope.newReportUrl){
                    
                    //assigning new url to old url valiable 
                    $scope.oldReportUrl = $scope.newReportUrl;
                    console.log($scope.newReportUrl);
                    $scope.studentReportUrl = $sce.trustAsResourceUrl($scope.newReportUrl);
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
                console.log($scope.isShowReportView);
            }


        };

        $scope.backStudent = function () {
            // debugger;
            $location.path('/');
        }

        
        $scope._multiselectModelcourse_ = function () {


            console.log($scope.multiselectModelcourse);
            $scope.courseIdArr = [];

            for (var i = 0; i < $scope.multiselectModelcourse.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModelcourse[i].id);
                console.log($scope.courseIdArr);
            }
        }

        $scope.$watch('multiselectModelcourse', $scope._multiselectModelcourse_, true);

        $scope._multiselectModelenrollment_ = function () {

            // console.log($scope.multiselectModelenrollment.length);

            $scope.enrollArr = [];
            console.log($scope.multiselectModelenrollment);

            for (var i = 0; i < $scope.multiselectModelenrollment.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelenrollment[i].id);
                console.log($scope.enrollArr);

            }
        }

        $scope.$watch('multiselectModelenrollment', $scope._multiselectModelenrollment_, true);

        $scope.searchAgain = function () {
            $scope.isShowReportView = false;
            console.log($scope.isShowReportView);
        }

        $scope.init();
        $scope.dateUpdate();
        $scope.getStudentData();


    }]);
