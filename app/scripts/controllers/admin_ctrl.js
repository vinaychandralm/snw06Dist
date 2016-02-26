'use strict';
var admModule = angular.module('studentActivityReports.adminDetails', []);
admModule.controller('adminctrl', ['$scope', '$rootScope', '$routeParams','$location', 'getSchoolData',
    'getSchoolStudent', 'getEnrollmentStatus', 'getSchoolStudentCourse', 'notAuthenticated', 'noNetError', 'getServerConfigData','$sce', function ($scope, $rootScope, $routeParams,$location,
        getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse, notAuthenticated, noNetError, getServerConfigData,$sce) {
        
        $scope.initValues = function(){
             

            $scope.details = {};
            $rootScope.isblue = false;
            $scope.statusNotSelected = false;
            $scope.courseNotSelected = false;
            $scope.studentNotSelected = false;
            $scope.schoolNotSelected = false;
            $scope.srtDateNotSelected = false;
            $scope.endDateNotgreater = false;
            $scope.minimumMinut = false;
            $scope.inputAdmin=0;
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

            $scope.searchagain ="displaynonecls";
            $scope.iframe_row = "displaynonecls";
            $scope.isShowReportView =false;

            $scope.adminReportUrl =$sce.trustAsResourceUrl('www.google.com'); 
            
            var currDate = new Date();
            $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
            $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
            // //console.log( $scope.maxDate);
            $scope.startDateEndActivity = new Date();
           
            $scope.urlDetails = getServerConfigData._getDetails();
            
            $scope.enrollmentArr = getEnrollmentStatus.get();
            
        };

        
        $scope.loadData = function(){
            
            getSchoolData._get($rootScope.admindetail.data.user.domainid, $rootScope.token, $scope.urlDetails)
            .then(function onsuccess(response) {
                if (response.data.messageType === "ERROR") {
                    notAuthenticated._showErrorMsg();
                    return;
                }
                $scope.setData(response.data);
                $scope.getAllSchollDomainId(response.data);
                getSchoolStudent._get($scope.allSchoolIdArrays, $scope.urlDetails)
                    .then(function onSuccess(res) {
                        if (response.data.messageType === "ERROR") {
                            notAuthenticated._showErrorMsg();
                            return;
                        }
                        $scope.setDataoFStuds(res.data.data.user);
                        $scope.getAllSchollStudentCourseId(res.data.data.user);
                        console.log($scope.allSchoolStudentIdArrays,"$scope.allSchoolStudentIdArrays 112");
                        getSchoolStudentCourse._get($scope.allSchoolStudentIdArrays, $scope.urlDetails)
                            .then(function onSuccess(res) {
                                if (response.data.messageType === "ERROR") {
                                    notAuthenticated._showErrorMsg();
                                    return;
                                }
                                $scope.setDataoFSchoolStudsCourse(res.data.data.course);
                            }, function onError(res) {
                                noNetError._showNetErrorMsg();
                            });
                    }, function onError(res) {
                        noNetError._showNetErrorMsg();
                    });
            }, function onerror(response) {
                noNetError._showNetErrorMsg();
            });
            
        }
        
        $scope.getAllSchollDomainId = function (dataresopnse) {
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

        $scope.setData = function (studentCourse) {
            $scope.schoolList = studentCourse.data.domains;
        };

        $scope.setDataoFStuds = function (schoolsStudent) {
            $scope.schoolStudentList = schoolsStudent;
        };

        $scope.setDataoFSchoolStudsCourse = function (schoolsStudent) {
            $scope.schoolStudentCourseList = schoolsStudent;
        };

        $scope.OnChangeSchools = function () {
            if ($scope.schoolListIds.length === 0) {
                var tempArr = [];
                $scope.setDataoFStuds(tempArr);
                $scope.setDataoFSchoolStudsCourse(tempArr);
                return;
            }
            getSchoolStudent._get($scope.schoolListIds, $scope.urlDetails)
                .then(function onSuccess(res) {
                    //console.log("response of _getschool Data  ",res);
                    if (res.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }

                    $scope.setDataoFStuds(res.data.data.user);
                    $scope.getAllSchollStudentCourseId(res.data.data.user);

                    getSchoolStudentCourse._get($scope.allSchoolStudentIdArrays, $scope.urlDetails)
                        .then(function onSuccess(res) {
                            if (res.data.messageType === "ERROR") {
                                notAuthenticated._showErrorMsg();
                                return;
                            }
                            $scope.setDataoFSchoolStudsCourse(res.data.data.course);
                        }, function onError(res) {
                            noNetError._showNetErrorMsg();
                        });
                }, function onError(res) {
                    noNetError._showNetErrorMsg();
                });
        };
        $scope.OnChangeStudent = function () {
            if($scope.studentListIds.length ==0){
                $scope.setDataoFSchoolStudsCourse([]);
                return;
            }
            getSchoolStudentCourse._get($scope.studentListIds, $scope.urlDetails)
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

         $scope.isInt=function(n) {
            return n % 1 === 0;
        }

        $scope.submit = function () {
            var startDateActivity = new Date($scope.startDateStartActivity);
            var endDateActivity = new Date($scope.startDateEndActivity);
            
            if($scope.startDateStartActivity == null){
                
                $scope.srtDateNotSelected = true;
            }else{
                $scope.srtDateNotSelected = false;
            }
            
            if (startDateActivity > endDateActivity || $scope.startDateEndActivity ==null) {
                $scope.endDateNotgreater = true;
            }
            else {
                $scope.endDateNotgreater = false;
            }

            //TODO for Status select option  $scope.statusNotSelected = true;

            if ($scope.schoolListIds.length === 0) {
                $scope.schoolNotSelected = true;
            } else {
                $scope.schoolNotSelected = false;
            }

            if ($scope.studentListIds.length === 0) {
                $scope.studentNotSelected = true;
            } else {
                $scope.studentNotSelected = false;
            }

            if ($scope.studentCourseListIds.length === 0) {
                $scope.courseNotSelected = true;
            } else {
                $scope.courseNotSelected = false;
            }

            if ($scope.studentCourseListIds.length === 0) {
                $scope.courseNotSelected = true;
            } else {
                $scope.courseNotSelected = false;
            }

            if ($scope.enrollArr.length === 0) {
                $scope.statusNotSelected = true;
            } else {
                $scope.statusNotSelected = false;
            }
            console.log($scope.inputAdmin);
            if ($scope.inputAdmin === undefined || $scope.inputAdmin === null || $scope.inputAdmin < 0 ||!$scope.isInt($scope.inputAdmin)) {
                $scope.minimumMinut = true;
            } else {
                $scope.minimumMinut = false;
            }
            
            if(!$scope.endDateNotgreater && !$scope.schoolNotSelected && !$scope.studentNotSelected && !$scope.courseNotSelected && !$scope.courseNotSelected && !$scope.statusNotSelected && !$scope.minimumMinut && !$scope.srtDateNotSelected){
                //Setting varaible for Animation
               
               //  $scope.adminReportUrl=$sce.trustAsResourceUrl('https://www.angularjs.org');
                 $scope.isShowReportView = true;
                
            }
        };
        
        $scope.searchAgain = function(){
            $scope.isShowReportView = false;
            console.log($scope.isShowReportView);
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
            //            //console.log($scope.selectedDate);
        }, true);

        $scope.$watch('multiselectModelAdminCourse', function () {
            $scope.schoolListIds = [];
            
            //To handle error at the time of initialization 
            if(!$scope.multiselectModelAdminCourse)
                return;
            for (var i = 0; i < $scope.multiselectModelAdminCourse.length; i++) {
                $scope.schoolListIds.push($scope.multiselectModelAdminCourse[i].id);
            }
            $scope.OnChangeSchools();
        }, true);


        $scope.$watch('multiselectModelAdminStudent', function () {
            $scope.studentListIds = [];

            for (var i = 0; i < $scope.multiselectModelAdminStudent.length; i++) {
                $scope.studentListIds.push($scope.multiselectModelAdminStudent[i].id);
            }
            $scope.OnChangeStudent();
        }, true);


        $scope.$watch('multiselectModelAdminStudentCourse', function () {
            $scope.studentCourseListIds = [];
            for (var i = 0; i < $scope.multiselectModelAdminStudentCourse.length; i++) {
                $scope.studentCourseListIds.push($scope.multiselectModelAdminStudentCourse[i].id);
            }
        }, true);

        $scope.$watch('multiselectModelEnrollment', function () {
            $scope.enrollArr = [];
            for (var i = 0; i < $scope.multiselectModelEnrollment.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelEnrollment[i].id);
            }


        }, true);
        
        
        //Initalizing variables
         $scope.initValues();
        
        //Laoding data 
        $scope.loadData();

    }]);
