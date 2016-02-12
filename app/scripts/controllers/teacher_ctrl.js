'use strict'
var xyz = null;
var sarModule = angular.module('teacherActivityReports.teacherDetails', []);
sarModule.controller('teacherDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'getDataCourseTeacher',
    'getEnrollmentStatus', 'getDataStudentTeacher','notAuthenticated','noNetError',
    function ($scope, $rootScope, $routeParams, getDataCourseTeacher, getEnrollmentStatus, getDataStudentTeacher,notAuthenticated,noNetError) {

        console.dir("**Inside teacherDetailsCtrl**");
    
        // console.log(getData._get($rootScope.role,$rootScope.userid));

        $scope.teacherId = $routeParams.teacherId;
        $scope.details = {};
        console.log("a");
        $rootScope.isblue = false;
        //    $scope.courseNotSelected = false;
        //    $scope.enrllNotSelected = false;
        //    $scope.srtDateNotSelected = false;
        //    $scope.endDateNotSelected = false;
    
        $scope.statusNotSelected = false;
        $scope.courseNotSelected = false;
        $scope.studentNotSelected = false;
        $scope.endDateNotgreater = false;
        $scope.minimumMinut = false;

        $scope.multiselectModel = [];
        $scope.courseIdArr = [];

        $scope.courseStudentIdArr = [];
        $scope.multiselectModel2 = [];
        
        $scope.enrollArr = [];
        $scope.multiselectModelEroll = [];

        /*
        * @startDate: holds the start date.
        * Acceptable date formats: mm-dd-yyyy, mm-dd-yy, ISO formatated string, miliseconds
        */
        var currDate = new Date();
        //var Date = new Date();
        $scope.startDateStartActivity = currDate.setDate(currDate.getDate() - 7);
        $scope.maxDateStartActivity = new Date().setDate(new Date().getDate() - 1);
        $scope.startDateEndActivity = new Date();
        
        /* @courseArr: Courses received from server
        * TODO:: modify object structure as per data received.
        */

        $scope.enrollmentArr = getEnrollmentStatus.get();
       

        getDataCourseTeacher._get($rootScope.role, $rootScope.userid, $rootScope.token)
            .then(function onsuccess(response) {
                console.log(response.data);  
                if(response.data.messageType ==="ERROR"){
                    notAuthenticated._showErrorMsg();
                    return;
                }
                $scope.setDataCourseTeacher(response.data);
            },function onError(response){
            console.log("Error Ajax in get Course OF teacher page");
            noNetError._showNetErrorMsg();
        });

        $scope.setDataCourseTeacher = function (teacherCourse) {
            console.log(teacherCourse.data.course);
            $scope.courseArr = teacherCourse.data.course;
            console.log($scope.courseArr);
            for (var i = 0; i < $scope.courseArr.length; i++) {
                $scope.courseIdArr.push($scope.courseArr[i].id);
                console.log($scope.courseIdArr);
            }

             getDataStudentTeacher._get($rootScope.role, $scope.courseIdArr)
                .then(function onsuccess(response) {
                    if(response.data.messageType ==="ERROR"){
                        notAuthenticated._showErrorMsg();
                        return;
                    }
                    console.log(response.data);  
                    $scope.setDataStudent(response.data.data.user);
                },function onError(response){
                 console.log("Error on loading Student of Teacher page");
                 noNetError._showNetErrorMsg();
             });
        };
       

        $scope.setDataStudent = function (studentCourse) {
                 console.log(studentCourse);
                 $scope.studentArr = studentCourse;
                 console.log($scope.studentArr);
        };
        
        $scope.onChangeCourseSelect = function(courseIdArr){
            if(courseIdArr.length ===0){
                var tempArr =[];
                $scope.setDataStudent(tempArr);
                
                return;
            }
            
             getDataStudentTeacher._get($rootScope.role, courseIdArr)
                .then(function onsuccess(response) {
                    console.log(response.data);  
                    if(response.data.messageType ==="ERROR"){
                        notAuthenticated._showErrorMsg();
                        return;
                    }
                    $scope.setDataStudent(response.data.data.user);
                },function onError(response){
                 console.log("Error on loading Student of Teacher page");
                 noNetError._showNetErrorMsg();
             });
        
        };

       

        $scope.submit = function () {
            console.log(new Date($scope.startDateStartActivity));
            var startDateActivity = new Date($scope.startDateStartActivity);
            var endDateActivity = new Date($scope.startDateEndActivity);
            if (startDateActivity > endDateActivity) {
                $scope.endDateNotgreater = true
            }
            else {
                $scope.endDateNotgreater = false;
            }

            if ($scope.enrollArr.length === 0) {
                $scope.statusNotSelected = true;
            } else {
                $scope.statusNotSelected = false;
            };
      
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
            if ($scope.input == undefined || $scope.input == null) {
                $scope.minimumMinut = true;
            } else {
                $scope.minimumMinut = false;
            };
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

        $scope.$watch('multiselectModel', function () {

            console.log($scope.multiselectModel);
            $scope.courseIdArr = [];

            for (var i = 0; i < $scope.multiselectModel.length; i++) {
                $scope.courseIdArr.push($scope.multiselectModel[i].id);
                console.log($scope.courseIdArr);
            }
            $scope.onChangeCourseSelect($scope.courseIdArr);


        }, true);


        $scope.$watch('multiselectModel2', function () {

            console.log($scope.multiselectModel2);

            $scope.courseStudentIdArr = [];
            for (var i = 0; i < $scope.multiselectModel2.length; i++) {
                $scope.courseStudentIdArr.push($scope.multiselectModel2[i].id);
                console.log($scope.courseStudentIdArr);
            }

             

        }, true);
        //  console.log("$scope.courseIdArr", $scope.courseIdArr);
    
        $scope.$watch('multiselectModelEroll', function () {

            console.log($scope.multiselectModelEroll.length);

            $scope.enrollArr = [];
            console.log($scope.multiselectModelEroll);

            for (var i = 0; i < $scope.multiselectModelEroll.length; i++) {

                $scope.enrollArr.push($scope.multiselectModelEroll[i].id);
                console.log($scope.enrollArr);

            }


        }, true);

    }]);
