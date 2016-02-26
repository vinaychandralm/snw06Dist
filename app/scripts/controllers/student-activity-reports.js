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
            console.log("a");
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
            //document.getElementById("DATE").value = today;
            
        }
        $scope.getEnrollIdStr=function(){
            console.log("**************",$scope.enrollArr);
            var temObj = ["1","4","5","6","7","8","9","10"];
            //Active = 1,
            //    Withdrawn = 4,
            //    WithdrawnFailed = 5,
            //    Transferred = 6,
            //    Completed = 7,
            //    CompletedNoCredit = 8,
            //    Suspended = 9,
            //    Inactive = 10,
            //$scope.enrollArr            
            var idArray=[];
            for(var i =0; i<$scope.enrollArr.length;i++){
                console.log("$scope.enrollArr ",$scope.enrollArr[i]);
                console.log("temObj.enrollArr ",temObj[$scope.enrollArr[i]]);
                    
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
                console.log("$scope.startDateStartActivity ",new Date($scope.startDateStartActivity));
                console.log("$scope.startDateEndActivity ",$scope.startDateEndActivity);
                console.log("$rootScope.userid ",$rootScope.userid);
                console.log("$rootScope.userid ",$rootScope.userspace);
                console.log("$scope.excuedItem ",$scope.excuedItem);
                console.log("Token :",$rootScope.token);
                var startDateStr =$scope.getDateAsString(new Date($scope.startDateStartActivity));
                var endDateStr = $scope.getDateAsString($scope.startDateEndActivity);
                
                console.log(startDateStr ,endDateStr );
                
                var enrollIdsArray = $scope.getEnrollIdStr();
                enrollStr =enrollIdsArray.join(',');
                console.log(enrollStr);
                var excuseItemStr = $scope.excuedItem?'1':'0';
                
/*http://192.168.2.58:8080/reports/studentactivityreport?startdate=01/02/2014&enddate=01/18/2019&userid=23696742&courseids=23598050,23598525&enrollmentstatus=1,10&excuseditem=0&userspace=sdale-innovation&token=~FbT1BAAAAAgCqkx2orhMPA.ubJwpnTsLvN3eKwu5jvOVB */
            /*
http://192.168.2.58:8080/reports/studentactivityreport?startdate=19/02/2016&enddate=26/02/2016&userid=46240033&courseids=46238953,46238967&enrollmentstatus=1&excuseditem=0&userspace=s1-06&token=~hEZwCAAAAAAyOvuFXmp-MB.KR3XOf_I12XrjDYv81FxDB            
            
            */
                
                var reportUrl = urlDetailObj.reportServiceUrlStudent +'startdate='+startDateStr+'&enddate='+endDateStr
                    +'&userid='+$rootScope.userid+'&courseids='+courseStr+'&enrollmentstatus='+enrollStr+'&excuseditem='
                    +excuseItemStr+'&userspace='+$rootScope.userspace+'&token='+$rootScope.token;
                
                console.log(reportUrl);
                $scope.studentReportUrl=$sce.trustAsResourceUrl(reportUrl);
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
