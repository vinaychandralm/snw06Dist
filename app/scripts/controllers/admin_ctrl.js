'use strict';
var admModule = angular.module('studentActivityReports.adminDetails', []);
admModule.controller('adminctrl', ['$scope', '$rootScope', '$routeParams', 'getSchoolData',
    'getSchoolStudent', 'getEnrollmentStatus', 'getSchoolStudentCourse','notAuthenticated','noNetError','getServerConfigData', function ($scope, $rootScope, $routeParams,
        getSchoolData, getSchoolStudent, getEnrollmentStatus, getSchoolStudentCourse,notAuthenticated,noNetError,getServerConfigData) {

        //console.dir("**Inside Admin Ctrl**");

        // //console.log(getData._get($rootScope.role,$rootScope.userid));

        $scope.userId = $routeParams.userid;
        $scope.details = {};
        $rootScope.isblue = false;
        $scope.statusNotSelected = false;
        $scope.courseNotSelected = false;
        $scope.studentNotSelected = false;
        $scope.schoolNotSelected = false;
        $scope.endDateNotgreater = false;
        $scope.minimumMinut = false;
        $scope.schoolListIds = [];
        $scope.multiselectModelAdminSchool = [];
        //    $scope.allSchoolId =[];
        $scope.allSchoolIdArrays = [];

        $scope.enrollArr = [];
        $scope.multiselectModelEroll = [];


        $scope.studentListIds = [];
        $scope.multiselectModelAdminStudent = [];
        $scope.allSchoolStudentIdArrays = [];

        $scope.studentCourseListIds = [];
        $scope.multiselectModelAdminStudentCourse = [];
        //console.log("$scope.userId  ", $scope.userId);
        //console.log("$routeParams.userId  ", $rootScope.admindetail);
        /////console.log("$scope.userId  ",$scope.userId );


        /*
        * @startDate: holds the start date.
        * Acceptable date formats: mm-dd-yyyy, mm-dd-yy, ISO formatated string, miliseconds
        */
        var currDate = new Date();
        //var Date = new Date();
        $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
        $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
        // //console.log( $scope.maxDate);
        $scope.startDateEndActivity = new Date();


        /*
        * @endDate: holds the start date.
        * Acceptable date formats: mm-dd-yyyy, mm-dd-yy, ISO formatated string, miliseconds
        */
        $scope.endDate = "14-02-2016";
        //getting service base url object
        var urlDetails = getServerConfigData._getDetails();
        //console.log(urlDetails);
        $scope.getAllSchollDomainId = function (dataresopnse) {
            $scope.allSchoolIdArrays = [];
            //console.log(dataresopnse);
            for (var i = 0; i < dataresopnse.data.domains.length; i++) {
                $scope.allSchoolIdArrays.push(dataresopnse.data.domains[i].id);
            }
            //console.log("All Id Array ", $scope.allSchoolIdArrays);
        };

        $scope.getAllSchollStudentCourseId = function (dataresopnse) {
            $scope.allSchoolStudentIdArrays = [];
            //console.log(dataresopnse);
            for (var i = 0; i < dataresopnse.length; i++) {
                $scope.allSchoolStudentIdArrays.push(dataresopnse[i].id);
            }
            //console.log("All Id Array ", $scope.allSchoolStudentIdArrays);
        };
        /*
        * @courseArr: Courses received from server
        * TODO:: modify object structure as per data received.
        */

        $scope.enrollmentArr = getEnrollmentStatus.get();
        //console.log($rootScope.admindetail.data.user.domainid,$rootScope.admindetail.data.user,$rootScope.token)
        
        
        getSchoolData._get($rootScope.admindetail.data.user.domainid,$rootScope.token,urlDetails)
         .then(function onsuccess(response){

                   if(response.data.messageType ==="ERROR"){

                        notAuthenticated._showErrorMsg();
                       return;

                    }
                     //console.log(response.data);
                     $scope.setData(response.data);
                     $scope.getAllSchollDomainId(response.data);
                     getSchoolStudent._get($scope.allSchoolIdArrays,urlDetails)
                     .then(function onSuccess(res){
                         //console.log("response of _getschool Data  ",res);
                         if(response.data.messageType ==="ERROR"){
                                notAuthenticated._showErrorMsg();
                                return;
                        }

                        $scope.setDataoFStuds(res.data.data.user);
                        $scope.getAllSchollStudentCourseId(res.data.data.user);
                        getSchoolStudentCourse._get($scope.allSchoolStudentIdArrays,urlDetails)
                         .then(function onSuccess(res){
                             //console.log("response of allSchoolStudentIdArrays Data  ",res);
                             if(response.data.messageType ==="ERROR"){
                                notAuthenticated._showErrorMsg();
                                return;
                            }
                            $scope.setDataoFSchoolStudsCourse(res.data.data.course);
                         },function onError(res){
                             //console.log("response of allSchoolStudentIdArrays Data Error  ",res);
                            noNetError._showNetErrorMsg();
                         });
                     },function onError(res){
                         //console.log("response of _getschool Data Error  ",res);
                         noNetError._showNetErrorMsg();
                     });
                 },function onerror(response){
                     noNetError._showNetErrorMsg();
                     //console.log("Error has been occured");
                     //console.log(response.data);
             });

        $scope.setData = function (studentCourse) {
//            //console.log(studentCourse);
            $scope.schoolList = studentCourse.data.domains;
//            //console.log($scope.schoolList);
        };

        $scope.setDataoFStuds = function (schoolsStudent) {
//            //console.log(schoolsStudent);
            $scope.schoolStudentList = schoolsStudent;
//            //console.log($scope.schoolStudentList);
        };

        $scope.setDataoFSchoolStudsCourse = function (schoolsStudent) {
//            //console.log(schoolsStudent);
            $scope.schoolStudentCourseList = schoolsStudent;
//            //console.log($scope.schoolStudentCourseList);
        };


       $scope.OnChangeSchools=function(){
        if($scope.schoolListIds.length ===0){
            var tempArr =[];
             $scope.setDataoFStuds(tempArr);
             $scope.setDataoFSchoolStudsCourse(tempArr);
            return;
        }
         getSchoolStudent._get($scope.schoolListIds,urlDetails)
                .then(function onSuccess(res){
                    //console.log("response of _getschool Data  ",res);
                    if(res.data.messageType ==="ERROR"){
                        notAuthenticated._showErrorMsg();
                        return;
                    }

                   $scope.setDataoFStuds(res.data.data.user);
                    $scope.getAllSchollStudentCourseId(res.data.data.user);

                    getSchoolStudentCourse._get($scope.allSchoolStudentIdArrays,urlDetails)
                    .then(function onSuccess(res){
                        //console.log("response of allSchoolStudentIdArrays Data  ",res);
                        if(res.data.messageType ==="ERROR"){
                            notAuthenticated._showErrorMsg();
                            return;
                        }
                        $scope.setDataoFSchoolStudsCourse(res.data.data.course);
                    },function onError(res){
                        //console.log("response of allSchoolStudentIdArrays Data Error  ",res);
                        noNetError._showNetErrorMsg();
                    });
                },function onError(res){
                    //console.log("response of _getschool Data Error  ",res);
                    noNetError._showNetErrorMsg();
                });
        };
       $scope.OnChangeStudent=function(){


                    getSchoolStudentCourse._get($scope.studentListIds,urlDetails)
                    .then(function onSuccess(res){
                        //console.log("response of allSchoolStudentIdArrays Data  ",res);
                        if(res.data.messageType ==="ERROR"){
                            notAuthenticated._showErrorMsg();
                            return;
                        }
                        $scope.setDataoFSchoolStudsCourse(res.data.data.course);
                    },function onError(res){
                        //console.log("response of allSchoolStudentIdArrays Data Error  ",res);
                        noNetError._showNetErrorMsg();
                    });

        };

        $scope.submit = function () {

//            //console.log(new Date($scope.startDateStartActivity));
            var startDateActivity = new Date($scope.startDateStartActivity);
            var endDateActivity = new Date($scope.startDateEndActivity);
            if (startDateActivity > endDateActivity) {
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

            if ($scope.input === undefined || $scope.input === null) {
                $scope.minimumMinut = true;
            } else {
                $scope.minimumMinut = false;
            }
        };

        // Success callback
        var handleSuccess = function (data, status) {
            $scope.details = data;
//            //console.log(status, $scope.details.courses._get);
        };

        // Error callback
        var handleError = function (err, status) {
            $scope.details = {};
//            //console.log(status, err);
        };

        //getData._get($scope.teacherId).success(handleSuccess).error(handleError);

        $scope.$watch('selectedDate', function () {
            //console.log($scope.selectedDate);
        }, true);



        $scope.$watch('selectedDate', function () {
//            //console.log($scope.selectedDate);
        }, true);

        $scope.$watch('multiselectModelAdminCourse', function () {
            $scope.schoolListIds = [];

            for (var i = 0; i < $scope.multiselectModelAdminCourse.length; i++) {
                $scope.schoolListIds.push($scope.multiselectModelAdminCourse[i].id);
                ////console.log($scope.schoolListIds);
            }
            //console.log('schoolListIds  ',$scope.schoolListIds);
            $scope.OnChangeSchools();
        }, true);


        $scope.$watch('multiselectModelAdminStudent', function () {
            $scope.studentListIds = [];

            for (var i = 0; i < $scope.multiselectModelAdminStudent.length; i++) {
                $scope.studentListIds.push($scope.multiselectModelAdminStudent[i].id);
//                //console.log($scope.studentListIds);
            }
//            //console.log('studentListIds  ',$scope.studentListIds);
         $scope.OnChangeStudent();
        }, true);


        $scope.$watch('multiselectModelAdminStudentCourse', function () {
            $scope.studentCourseListIds = [];

            for (var i = 0; i < $scope.multiselectModelAdminStudentCourse.length; i++) {
                $scope.studentCourseListIds.push($scope.multiselectModelAdminStudentCourse[i].id);
//                //console.log($scope.studentCourseListIds);
            }
        }, true);

        $scope.$watch('multiselectModelEnrollment', function () {

//            console.log($scope.multiselectModelEnrollment.length);

            $scope.enrollArr = [];
//            console.log($scope.multiselectModelEnrollment);

            for (var i = 0; i < $scope.multiselectModelEnrollment.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelEnrollment[i].id);
//                console.log($scope.enrollArr);

            }


        }, true);
        $scope.submit = function(){
            
        }

    }]);
