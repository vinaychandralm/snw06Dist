'use strict';
var admModule = angular.module('studentActivityReports.adminDetails', []);
admModule.controller('adminctrl', ['$scope', '$rootScope', '$location', 'getSchoolData',
    'getSchoolStudent', 'getEnrollmentStatus', 'getSchoolStudentCourse', 'notAuthenticated', 'noNetError',  'iFrameLoading', '$sce', '$timeout', function ($scope, $rootScope, $location,
        getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse, notAuthenticated, noNetError,  iFrameLoading, $sce, $timeout) {

        $scope.initValues = function () {

            $scope.details = {};
            $rootScope.isblue = false;
            $scope.statusNotSelected = false;
            $scope.courseNotSelected = false;
            $scope.studentNotSelected = false;
            $scope.schoolNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotgreater = false;
            $scope.minimumMinut = false;
            $scope.excuedItem = false;
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
            
            $scope.oldReportUrl = null;
            $scope.newReportUrl = null;

            $scope.searchagain = "displaynonecls";
            $scope.iframe_row = "displaynonecls";
            $scope.isShowReportView = false;

            var currDate = new Date();
            $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
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
                            $scope.setDataoFSchoolStudsCourse(tempArr);
                            return;
                        }
                        $scope.setDataoFStuds(res.data.data.user);
                        $scope.getAllSchollStudentCourseId(res.data.data.user);
                        $scope.getnSetSchoolStudentCourse($scope.allSchoolStudentIdArrays, $scope.urlDetails);
                        
                    }, function onError(res) {
                        noNetError._showNetErrorMsg();
                    });
            
        ;}        

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

        }

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
                $scope.setDataoFStuds(tempArr);
                $scope.setDataoFSchoolStudsCourse(tempArr);
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
            var temObj = ["1", "4", "5", "6", "7", "8", "9", "10"];
            //Active = 1, Withdrawn = 4, WithdrawnFailed = 5,Transferred = 6,Completed = 7,CompletedNoCredit = 8,Suspended = 9,Inactive = 10,
            var idArray = [];
            for (var i = 0; i < $scope.enrollArr.length; i++) {
                idArray.push(temObj[$scope.enrollArr[i]]);
            }
            return idArray;
        }

        
        $scope.showAdminReport = function (isDataValidate) {

            console.log('isvalidData : ', isDataValidate);
            if (isDataValidate) {
                //Setting varaible for Animation
                
                var urlDetailObj = $rootScope.winConfigObj;
                //$scope.courseIdArr.length

                var schoolIdStr =  $scope.schoolListIds.join(',');
                console.log(schoolIdStr) ;
                
                 var studentIDStr = $scope.studentListIds.join(',');
                 
                var courseIDStr = $scope.studentCourseListIds.join(',');

               
                // console.log("courseStudentIds : ", courseStudentIds);
                //var enrollStr = $scope.enrollArr.join(',');
                // console.log("$scope.startDateStartActivity ", new Date($scope.startDateStartActivity));
                // console.log("$scope.startDateEndActivity ", $scope.startDateEndActivity);
                // console.log("$rootScope.userid ", $rootScope.userid);
                // console.log("$rootScope.userid ", $rootScope.userspace);
                // console.log("$scope.excuedItem ", $scope.excuedItem);
                // console.log("Token :", $rootScope.token);
                var startDateStr = $scope.getDateAsString(new Date($scope.startDateStartActivity));
                var endDateStr = $scope.getDateAsString($scope.startDateEndActivity);

                // console.log(startDateStr, endDateStr);

                var enrollIdsArray = $scope.getEnrollIdStr();
                var enrollStr = enrollIdsArray.join(',');
                // console.log(enrollStr);
                var excuseItemStr = $scope.excuedItem ? '1' : '0';

                // $scope.newReportUrl = urlDetailObj.reportServiceUrlStudent + '/studentactivityreportforteacher?startdate=' + startDateStr + '&enddate=' + endDateStr
                // + '&userid=' + $rootScope.userid + '&courseids=' + courseStr + '&studentids=' + courseStudentIds + '&minimumminutes=' + $scope.minimumMinut + '&enrollmentstatus=' + enrollStr + '&excuseditem='
                // + excuseItemStr + '&userspace=' + $rootScope.userspace + '&token=' + $rootScope.token;
                // console.log("reportUrl : ", $scope.newReportUrl);
               
               console.log($rootScope.admindetail.data.user.firstname);
               
              $scope.newReportUrl=urlDetailObj.reportServiceUrlStudent+ '/studentactivityreportforadmin?startdate='+startDateStr+'&enddate='+endDateStr+'&userid='+$rootScope.userid+'&username='+$rootScope.admindetail.data.user.firstname+' '+$rootScope.admindetail.data.user.lastname+'&domainids='+schoolIdStr+'&studentids='+studentIDStr+'&courseids='+courseIDStr+'&minimumminutes='+$scope.inputAdmin+'&enrollmentstatus='+enrollStr+'&excuseditem='+excuseItemStr+'&userspace='+$rootScope.userspace+'&token='+$rootScope.token;
               
                //  $scope.newReportUrl = "http://192.168.2.58:8080/reports/studentactivityreportforteacher?startdate=01/02/2014&enddate=01/18/2019&userid=24910841&courseids=23520819,23522897,23596492&studentids=21298560,21298527,21298500,24998188&minimumminutes=2&enrollmentstatus=1,10&excuseditem=0&serspace=gsd-06&token=~gzYwCAAAAAwV29myGEzN-A.wPoIwcxlw1FBzxFvLW2W9C";
                
                
                //            $scope.newReportUrl = 'http://192.168.2.58:8080/reports/studentactivityreport?startdate=01/02/2014&enddate=01/18/2019&userid=23696742&courseids=23598050,23598525&enrollmentstatus=1,10&excuseditem=0&userspace=sdale-innovation&token=~FbT1BAAAAAgCqkx2orhMPA.ubJwpnTsLvN3eKwu5jvOVB';
                
                if ($scope.oldReportUrl != $scope.newReportUrl) {
                    
                    //assigning new url to old url valiable 
                    $scope.oldReportUrl = $scope.newReportUrl;
                    $scope.adminReportUrl = $sce.trustAsResourceUrl($scope.newReportUrl);
                    //Setting varaible for Animation
                    $scope.isShowReportView = true;
                    $rootScope.showoverlayOniFrameLoading = true;

                    iFrameLoading.subscribeiFrameLoading();
                    
                    //setting delay due to heavy processing and parsing taking time
                    $rootScope.$on('iframeloading.done', function (a, b) {
                        $timeout(function () {
                            $rootScope.showoverlayOniFrameLoading = false;
                        }, 4000);
                        $scope.$apply();
                    });

                } else {
                    $scope.isShowReportView = true;
                }
                // console.log($scope.isShowReportView);
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
        var handleSuccess = function (data, status) {
            $scope.details = data;
        };

        // Error callback
        var handleError = function (err, status) {
            $scope.details = {};
        };

        $scope.$watch('selectedDate', function () {
            //console.log($scope.selectedDate);
        }, true);

        $scope.$watch('selectedDate', function () {
             //console.log($scope.selectedDate);
        }, true);

        $scope._multiselectModelAdminCourse_ = function(){
            $scope.schoolListIds = [];
            
            //To handle error at the time of initialization 
            if (!$scope.multiselectModelAdminCourse)
                return;
            for (var i = 0; i < $scope.multiselectModelAdminCourse.length; i++) {
                $scope.schoolListIds.push($scope.multiselectModelAdminCourse[i].id);
            }
            $scope.OnChangeSchools();
            
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
