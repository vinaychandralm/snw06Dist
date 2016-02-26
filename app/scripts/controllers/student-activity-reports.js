'use strict';

var sarModule = angular.module('studentActivityReports.studentDetails', []);
sarModule.controller('studentDetailsCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'getDataStudent',
    'getEnrollmentStatus', 'getStudentCourseData', 'notAuthenticated', 'noNetError', 'getServerConfigData','$sce',
    function ($scope, $rootScope, $routeParams, $location, getDataStudent, getEnrollmentStatus, getStudentCourseData, notAuthenticated, noNetError, getServerConfigData,$sce) {

        console.dir("**Inside studentDetailsCtrl**");

        // console.log(getData._get($rootScope.role,$rootScope.userid));
        
        $scope.init = function () {

            // $scope.teacherId = $routeParams.userId;
            $scope.details = {};
            $rootScope.isblue = false;
            $scope.courseNotSelected = false;
            $scope.enrllNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotSelected = false;
            $scope.excuedItem =false;
            $scope.studentReportUrl=null;
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

        //getting Server url details
        var urlDetails = getServerConfigData._getDetails();
      //  console.log(urlDetails);

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
          //  console.log(studentCourse);
            $scope.courseArr = studentCourse.data.course;

        };

        $scope.getDateAsString=function(dateObj){
            
           // var today = new Date();
            var dd = dateObj.getDate();
            var mm = dateObj.getMonth()+1; //January is 0!

            var yyyy = dateObj.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            return( dd+'/'+mm+'/'+yyyy );
            
        }
        $scope.getEnrollIdStr=function(){
           // console.log("**************",$scope.enrollArr);
            var temObj = ["1","4","5","6","7","8","9","10"];
            //Active = 1, Withdrawn = 4, WithdrawnFailed = 5,Transferred = 6,Completed = 7,CompletedNoCredit = 8,Suspended = 9,Inactive = 10,     
            
            var idArray=[];
            for(var i =0; i<$scope.enrollArr.length;i++){
               // console.log("$scope.enrollArr ",$scope.enrollArr[i]);
               // console.log("temObj.enrollArr ",temObj[$scope.enrollArr[i]]);
                    
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
                
                var urlDetailObj =  getServerConfigData._getDetails()
                
                var courseStr = $scope.courseIdArr.join(',');
                var enrollStr = $scope.enrollArr.join(',');
                var startDateStr =$scope.getDateAsString(new Date($scope.startDateStartActivity));
                var endDateStr = $scope.getDateAsString($scope.startDateEndActivity);
                var enrollIdsArray = $scope.getEnrollIdStr();
                enrollStr =enrollIdsArray.join(',');

                var excuseItemStr = $scope.excuedItem?'1':'0';
                
//              var reportUrl = urlDetailObj.reportServiceUrlStudent +'startdate='+startDateStr+'&enddate='+endDateStr
//                    +'&userid='+$rootScope.userid+'&courseids='+courseStr+'&enrollmentstatus='+enrollStr+'&excuseditem='
//                    +excuseItemStr+'&userspace='+$rootScope.userspace+'&token='+$rootScope.token;
                
                var reportUrl = 'http://192.168.2.58:8080/reports/studentactivityreport?startdate=01/02/2014&enddate=01/18/2019&userid=23696742&courseids=23598050,23598525&enrollmentstatus=1,10&excuseditem=0&userspace=sdale-innovation&token=~FbT1BAAAAAgCqkx2orhMPA.ubJwpnTsLvN3eKwu5jvOVB';
                console.log(reportUrl);
                
                $scope.studentReportUrl=$sce.trustAsResourceUrl(reportUrl);
                $scope.isShowReportView = true;
                
            }

        };

        $scope.backStudent = function () {
            // debugger;
            $location.path('/');
        }

        $scope.$watch('multiselectModelcourse', function () {

            $scope.courseIdArr = [];
            //To handle error at the time of initialization 
            if(!$scope.multiselectModelcourse)
                return;

            for (var i = 0; i < $scope.multiselectModelcourse.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModelcourse[i].id);
            }


        }, true);

        $scope.$watch('multiselectModelenrollment', function () {

            $scope.enrollArr = [];

            for (var i = 0; i < $scope.multiselectModelenrollment.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelenrollment[i].id);

            }


        }, true);
        $scope.searchAgain = function () {
            $scope.isShowReportView = false;
        }

        $scope.init();
        $scope.dateUpdate();
        $scope.getStudentData();


    }]);
