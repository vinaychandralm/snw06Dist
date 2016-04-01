'use strict';


var courseModule = angular.module('AdminActivityReports.courseMgmt', []);        
courseModule.controller('courseMgmtCtrl', ['$scope', '$rootScope', '$location', '$theme', '$routeParams', 'validateUrlData',
    'notAuthenticated', 'noNetError',
    function ($scope, $rootScope, $location, theme, $routeParams, validateUrlData, notAuthenticated, noNetError) {

        $scope.initValues = function () {

            $rootScope.winConfigObj = window.configObj;
            $scope.progressReport = false;
            $scope.courseCompletionReport = false;
            $scope.studentActivityReport = false;
            $rootScope.loadingText = true;
            $rootScope.netErr = false;
            $rootScope.authenticationErr = false;

            $rootScope.token = $routeParams.token;
            $rootScope.userid = $routeParams.userid;
            $rootScope.token = $routeParams.token;
            $rootScope.role = $routeParams.role;
            $scope.showLogErrorPg = true;
    
            //putting 'userspace' value to root scope so that it is avilable to all ctrls
            $rootScope.userspace = $routeParams.userspace
    
            //   TODO : Remove blow 6 line comments if not using GRUNT-SERVE.

            // $routeParams.role = $rootScope.winConfigObj.userSettingObjects.role;
            // $routeParams.userid = $rootScope.winConfigObj.userSettingObjects.userid;
            // $routeParams.token = $rootScope.winConfigObj.userSettingObjects.token;
            // $routeParams.userspace = $rootScope.winConfigObj.userSettingObjects.userspace;

            // $rootScope.token = $routeParams.token;
            // $rootScope.userid = $routeParams.userid;
            // $rootScope.role = $routeParams.role;
            // $rootScope.userspace = $rootScope.winConfigObj.userSettingObjects.userspace;



            $scope.urlDetails = $rootScope.winConfigObj;
            console.log($scope.urlDetails);


        };


        $scope.loadData = function () {
             $scope.showLogErrorPg = true;
            $rootScope.bodybg = 'bodyBgViolat';
            validateUrlData._get($routeParams.role, $routeParams.userid, $routeParams.token, $scope.urlDetails)
                .then(function onsuccess(response) {

                    $rootScope.firstName = response.data.firstname;
                    $rootScope.lastName = response.data.lastname;
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                    } else {
                       
                       /*call here data parsing methood   
                       and fufther data instialization
                                          
                       */
                       // $scope.showTiles(response.data);
                       
                        $scope.showLogErrorPg = false;
                        $rootScope.bodybg = 'bodyBgwhite';
                       
                        $rootScope.showoverlay = false;
                    }
                }, function onError(errResponse) {
                 //  $rootScope.bodybg = 'bodyBgViolat'
                    console.log("err Response ", errResponse);
                    noNetError._showNetErrorMsg();
                    
                  //  $location.path("/course-home");
                    // $scope.blockUser(errResponse);
                });
        };
        // $scope.openForm = function () {
        //     //changing body background color
        
        //     if ($rootScope.role === 'admin') {
        //         $location.path("/admin-form");
        //     } else if ($rootScope.role === 'teacher') {
        //         $location.path("/teacher-form");
        //     }
        //     else if ($rootScope.role === 'student') {
        //         $location.path("/student-activity-reports");
        //     }

        // };

        // $scope.openCourseCompletionForm = function () {
        //     //changing body background color
        
        //     if ($rootScope.role === 'admin') {
        //         $location.path("/course-completion-admin");
        //     } else if ($rootScope.role === 'teacher') {
        //         $location.path("/coursecompletion-report-teacher");
        //     }

        // };

        // $scope.openProgressForm = function () {
        //     //changing body background color
        
        //     if ($rootScope.role === 'admin') {
        //         $location.path("/progress-report-admin");
        //     }
        //     else if ($rootScope.role === 'student') {
        //         $location.path("/progress-report-student");
        //     }

        // };


        $scope.go = function (path) {
            $location.path(path);
        };

        // $rootScope.$watch(function () { // fixed function declaration
        //     return $location.path();
        // },
        //     function (newValue, oldValue) {
        //         //            console.log(newValue, oldValue);
        //         if (newValue === '/') { // Update: variable name case should be the same
        //             // here you can do your tasks
        //             $rootScope.bodybg = 'bodyBgViolat';
        //         }
        //         else {
        //             $rootScope.bodybg = 'bodyBgwhite';
        //         }
        //     },
        //     true);

    
        //Initilizing variables.
        $scope.initValues();
    
        //Laoding data 
        $scope.loadData();


    }]);