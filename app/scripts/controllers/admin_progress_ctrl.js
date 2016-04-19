'use strict';
var admModule = angular.module('progressReport.adminDetails', []);
admModule.controller('progressAdmin', ['$scope', '$rootScope', '$location', 'getSchoolData',
    'getSchoolStudent', 'getEnrollmentStatus', 'getSchoolStudentCourse', 'notAuthenticated', 'noNetError',  'iFrameLoading', '$sce', '$timeout','showReport','GetDateAsString','GetEnrollIdAsString', function($scope, $rootScope, $location,
        getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse, notAuthenticated, noNetError,  iFrameLoading, $sce, $timeout,showReport,GetDateAsString,GetEnrollIdAsString) {

        $scope.initValues = function () {

            $scope.details = {};
            $rootScope.isblue = false;
            $scope.statusNotSelected = false;
            $scope.courseNotSelected = false;
            $scope.studentNotSelected = false;
            $scope.schoolNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotgreater = false;
            $scope.finalGrade = true;
            $scope.pageBreak = true;
            $scope.inputAdmin = 0;
            $scope.schoolListIds = [];
            $scope.multiselectModelAdminSchool = [];
            $scope.allSchoolIdArrays = [];
            $scope.enrollArr = [];
            $scope.multiselectModelEroll = [];
            $scope.studentListIds = [];
            $scope.multiselectModelAdminStudent = [];
            $scope.allSchoolStudentIdArrays = [];
            $scope.studentCourseListIds = [];
            $scope.multiselectModelAdminStudentCourse = [];
            $scope.iframeReportUrl = null;
            $scope.oldReportUrl = null;
            $scope.newReportUrl = null;

            $scope.searchagain = "displaynonecls";
            $scope.iframe_row = "displaynonecls";
            $scope.isShowReportView = false;

            var currDate = new Date();
            $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 365);
            $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
            $scope.startDateEndActivity = new Date();

            $scope.enrollmentArr = getEnrollmentStatus.get();
            $scope.urlDetails = $rootScope.winConfigObj;

        };
        
        
         $scope.setData = function (studentCourse) {
            $scope.schoolList = studentCourse.data.domains;
        };

        $scope.setDataoFStuds = function (schoolsStudent) {
            $scope.schoolStudentList = schoolsStudent;
        };

        $scope.setDataoFSchoolStudsCourse = function (schoolsStudent) {
            $scope.schoolStudentCourseList = schoolsStudent;
        };
        
        //Fetch and Set data for course dropdown list .
        $scope.getnSetSchoolStudentCourse=function(scopeAllSchoolStudentIdArrays, scopeUrlDetails){
            
            getSchoolStudentCourse._get(scopeAllSchoolStudentIdArrays, scopeUrlDetails)
                .then(function onSuccess(res) {
                    if (res.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }
                   
                    $scope.setDataoFSchoolStudsCourse(res.data.data.course);
                }, function onError(res) {
                    noNetError._showNetErrorMsg();
                });
            
        };
        
        //Fetch and Set data for student dropdown list.
        $scope.getnSetSchoolStudent = function(scopeAllSchoolIdArrays,scopeUrlDetails){
            
            getSchoolStudent._get(scopeAllSchoolIdArrays, scopeUrlDetails)
                    .then(function onSuccess(res) {
                        if (res.data.messageType === "ERROR") {
                            notAuthenticated._showErrorMsg();
                            var tempArr = [];
                            $scope.setDataoFStuds(tempArr);
                            $scope.setDataoFSchoolStudsCourse(tempArr);
                            return;
                        }
                        $scope.setDataoFStuds(res.data.data.user);
                        $scope.getAllSchollStudentCourseId(res.data.data.user);
                        $scope.getnSetSchoolStudentCourse($scope.allSchoolStudentIdArrays, $scope.urlDetails);
                        
                    }, function onError(res) {
                        noNetError._showNetErrorMsg();
                    });
            
        };       

        //Fetch and Set all data for dropdown list starting with school dropwon.
        $scope.loadData = function () {
            getSchoolData._get($rootScope.admindetail.data.user.domainid, $rootScope.token, $scope.urlDetails)
                .then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        var tempArr = [];
                        $scope.setDataoFStuds(tempArr);
                        $scope.setDataoFSchoolStudsCourse(tempArr);
                        return;
                    }
                    console.log(response.data)
                    $scope.setData(response.data);
                    $scope.getAllSchollDomainId(response.data);
                    $scope.getnSetSchoolStudent($scope.allSchoolIdArrays,$scope.urlDetails)
                   
                }, function onerror(response) {
                    noNetError._showNetErrorMsg();
                });

        };

        $scope.getAllSchollDomainId = function (dataresopnse) {
            console.log(dataresopnse.data.domains);
            $scope.allSchoolIdArrays = [];
            for (var i = 0; i < dataresopnse.data.domains.length; i++) {
                $scope.allSchoolIdArrays.push(dataresopnse.data.domains[i].id);
            }
        };

        $scope.getAllSchollStudentCourseId = function (dataresopnse) {
            $scope.allSchoolStudentIdArrays = [];
            for (var i = 0; i < dataresopnse.length; i++) {
                $scope.allSchoolStudentIdArrays.push(dataresopnse[i].id);
            }
        };

       

        $scope.OnChangeSchools = function () {
            if ($scope.schoolListIds.length === 0) {
                var tempArr = [];
                $scope.setDataoFSchoolStudsCourse(tempArr);
                $scope.setDataoFStuds(tempArr);
                $timeout.cancel($scope.promise);              
                return;
            }
            
            $scope.getnSetSchoolStudent($scope.schoolListIds, $scope.urlDetails);
        };
        $scope.OnChangeStudent = function () {
            if ($scope.studentListIds.length == 0) {
                $scope.setDataoFSchoolStudsCourse([]);
                return;
            }
            $scope.getnSetSchoolStudentCourse($scope.studentListIds, $scope.urlDetails)
        };

        $scope.isInt = function (n) {
            return n % 1 === 0;
        }
        
        $scope.showAdminReport = function (isDataValidate) {

          //  console.log('isvalidData : ', isDataValidate);
            if (isDataValidate) {
                //Setting varaible for Animation
                var urlDetailObj = $rootScope.winConfigObj;
                var schoolIdStr =  $scope.schoolListIds.join(',');
                var studentIDStr = $scope.studentListIds.join(',');
                var courseIDStr = $scope.studentCourseListIds.join(',');
                var startDateStr = GetDateAsString.dateStr(new Date($scope.startDateStartActivity));
              //  console.log('startDateStr ',startDateStr);
                var endDateStr = GetDateAsString.dateStr($scope.startDateEndActivity);
               // console.log('startDateStr ',startDateStr);
                var enrollIdsArray = GetEnrollIdAsString.getEnrollIdStr($scope);
               // console.log('enrollIdsArray  ',enrollIdsArray);
                var enrollStr = enrollIdsArray.join(',');
                var finalGrade = $scope.finalGrade ? '1' : '0';
                var pageBreak = $scope.pageBreak ? '1' : '0';

                // $scope.newReportUrl = urlDetailObj.reportServiceUrlStudent + '/studentactivityreportforteacher?startdate=' + startDateStr + '&enddate=' + endDateStr
                // + '&userid=' + $rootScope.userid + '&courseids=' + courseStr + '&studentids=' + courseStudentIds + '&minimumminutes=' + $scope.minimumMinut + '&enrollmentstatus=' + enrollStr + '&excuseditem='
                // + excuseItemStr + '&userspace=' + $rootScope.userspace + '&token=' + $rootScope.token;
                // console.log("reportUrl : ", $scope.newReportUrl);
                // $scope.newReportUrl=urlDetailObj.reportServiceUrlStudent+ '/studentactivityreportforadmin?startdate='+startDateStr+'&enddate='+endDateStr+'&userid='+$rootScope.userid+'&username='+$rootScope.admindetail.data.user.firstname+' '+$rootScope.admindetail.data.user.lastname+'&domainids='+schoolIdStr+'&studentids='+studentIDStr+'&courseids='+courseIDStr+'&minimumminutes='+$scope.inputAdmin+'&enrollmentstatus='+enrollStr+'&excuseditem='+excuseItemStr+'&userspace='+$rootScope.userspace+'&token='+$rootScope.token;
                
                $scope.newReportUrl=urlDetailObj.reportServiceUrlStudent+ '/progressreportadmin?startdate='+startDateStr+'&enddate='+endDateStr+'&userid='+$rootScope.userid+'&domainids='+schoolIdStr+'&studentids='+studentIDStr+'&courseids='+courseIDStr+'&enrollmentstatus='+enrollStr+'&finalgrades='+finalGrade+'&pagebreak='+pageBreak+'&userspace='+$rootScope.userspace
                + '&username=' + $rootScope.admindetail.data.user.firstname + ' ' + $rootScope.admindetail.data.user.lastname 
                +'&token='+$rootScope.token;
                
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
                isvalidData=false;
            } else {
                $scope.srtDateNotSelected = false;
                
            }

            if (startDateActivity > endDateActivity || $scope.startDateEndActivity == null) {
                $scope.endDateNotgreater = true;
                isvalidData=false;
            }
            else {
                $scope.endDateNotgreater = false;
            }

            //TODO for Status select option  $scope.statusNotSelected = true;

            if ($scope.schoolListIds.length === 0) {
                $scope.schoolNotSelected = true;
                isvalidData=false;
            } else {
                $scope.schoolNotSelected = false;
            }

            if ($scope.studentListIds.length === 0) {
                $scope.studentNotSelected = true;
                isvalidData=false;
            } else {
                $scope.studentNotSelected = false;
            }

            if ($scope.studentCourseListIds.length === 0) {
                $scope.courseNotSelected = true;
                isvalidData=false;
            } else {
                $scope.courseNotSelected = false;
            }

            if ($scope.studentCourseListIds.length === 0) {
                $scope.courseNotSelected = true;
                isvalidData=false;
            } else {
                $scope.courseNotSelected = false;
            }

            if ($scope.enrollArr.length === 0) {
                $scope.statusNotSelected = true;
                isvalidData=false;
            } else {
                $scope.statusNotSelected = false;
            }
            //console.log($scope.inputAdmin);
            if ($scope.inputAdmin === undefined || $scope.inputAdmin === null || $scope.inputAdmin < 0 || !$scope.isInt($scope.inputAdmin)) {
                $scope.minimumMinut = true;
                isvalidData=false;
            } else {
                $scope.minimumMinut = false;
            }

            //Calling method to launch the course.
            $scope.showAdminReport(isvalidData);
        };

        $scope.searchAgain = function () {
            $scope.isShowReportView = false;
            //console.log($scope.isShowReportView);
        }

        $scope.backAdmin = function () {
            // debugger;
            $location.path('/');
        }

        // Success callback
        // var handleSuccess = function (data, status) {
        //     $scope.details = data;
        // };

        // // Error callback
        // var handleError = function (err, status) {
        //     $scope.details = {};
        // };

        // $scope.$watch('selectedDate', function () {
        //     //console.log($scope.selectedDate);
        // }, true);

        // $scope.$watch('selectedDate', function () {
        //      //console.log($scope.selectedDate);
        // }, true);

        $scope._multiselectModelAdminCourse_ = function(){
            $scope.schoolListIds = [];
            
            //To handle error at the time of initialization 
            if (!$scope.multiselectModelAdminCourse)
                return;
            for (var i = 0; i < $scope.multiselectModelAdminCourse.length; i++) {
                $scope.schoolListIds.push($scope.multiselectModelAdminCourse[i].id);
            }
            // $scope.OnChangeSchools();
            // $timeout(function(){
            //      $scope.OnChangeSchools();
            // },1000)
            $scope.promise= $timeout(function(){
                 $scope.OnChangeSchools();
            },1000);
            
        };
        
        $scope.$watch('multiselectModelAdminCourse', $scope._multiselectModelAdminCourse_,true);
            $scope._multiselectModelAdminStudent_ = function(){
                $scope.studentListIds = [];
                for (var i = 0; i < $scope.multiselectModelAdminStudent.length; i++) {
                    $scope.studentListIds.push($scope.multiselectModelAdminStudent[i].id);
                }
                $scope.OnChangeStudent();
            };
        
        $scope.$watch('multiselectModelAdminStudent',  $scope._multiselectModelAdminStudent_,true);
        
        $scope._multiselectModelAdminStudentCourse_ = function(){
            $scope.studentCourseListIds = [];
            for (var i = 0; i < $scope.multiselectModelAdminStudentCourse.length; i++) {
                $scope.studentCourseListIds.push($scope.multiselectModelAdminStudentCourse[i].id);
            }
             
         };
        
        $scope.$watch('multiselectModelAdminStudentCourse',  $scope._multiselectModelAdminStudentCourse_,true);
        
        $scope._multiselectModelEnrollment_ = function(){
            $scope.enrollArr = [];
            for (var i = 0; i < $scope.multiselectModelEnrollment.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelEnrollment[i].id);
            }
        }
        
        $scope.$watch('multiselectModelEnrollment',  $scope._multiselectModelEnrollment_,true);

        //Initalizing variables
        $scope.initValues();

        // $scope.dateUpdate();
        
        //Laoding data 
        $scope.loadData();

    }]);
