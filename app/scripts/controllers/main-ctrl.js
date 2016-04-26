'use strict';
var constantModule = angular.module('constant', []);

constantModule.constant('$theme', {
    "theme": "black"
});

var homeModule = angular.module('studentActivityReports.home', ['constant']);


homeModule.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$theme', '$routeParams', 'validateUrlData',
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
    
            //putting 'userspace' value to root scope so that it is avilable to all ctrls
            $rootScope.userspace = $routeParams.userspace
    
            $scope.urlDetails = $rootScope.winConfigObj;

        };

        $scope.showTiles = function (authResponse) {

            if ($scope.role === 'student') {
                $scope.progressReport = true;
                $scope.studentActivityReport = true;
            }
            else if ($scope.role === 'teacher') {
                $scope.courseCompletionReport = true;
                $scope.studentActivityReport = true;

            }
            else if ($scope.role === 'admin') {
                $scope.progressReport = true;
                $scope.courseCompletionReport = true;
                $scope.studentActivityReport = true;

                $rootScope.admindetail = authResponse;
            }
        };

        $scope.loadData = function () {
            validateUrlData._get($routeParams.role, $routeParams.userid, $routeParams.token, $scope.urlDetails)
                .then(function onsuccess(response) {

                    $rootScope.firstName = response.data.firstname;
                    $rootScope.lastName = response.data.lastname;
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                    } else {
                        $scope.showTiles(response.data);
                        $rootScope.showoverlay = false;
                    }
                }, function onError(errResponse) {
                    noNetError._showNetErrorMsg();
                });
        };
        $scope.openForm = function () {
            //changing body background color
        
            if ($rootScope.role === 'admin') {
                $location.path("/admin-form");
            } else if ($rootScope.role === 'teacher') {
                $location.path("/teacher-form");
            }
            else if ($rootScope.role === 'student') {
                $location.path("/student-activity-reports");
            }

        };

        $scope.openCourseCompletionForm = function () {
            //changing body background color
        
            if ($rootScope.role === 'admin') {
                $location.path("/course-completion-admin");
            } else if ($rootScope.role === 'teacher') {
                $location.path("/coursecompletion-report-teacher");
            }

        };

        $scope.openProgressForm = function () {
            //changing body background color
        
            if ($rootScope.role === 'admin') {
                $location.path("/progress-report-admin");
            }
            else if ($rootScope.role === 'student') {
                $location.path("/progress-report-student");
            }

        };


        $scope.go = function (path) {
            $location.path(path);
        };

        $rootScope.$watch(function () { // fixed function declaration
            return $location.path();
        },
            function (newValue, oldValue) {
                if (newValue === '/') { 
                    $rootScope.bodybg = 'bodyBgViolat';
                }
                else {
                    $rootScope.bodybg = 'bodyBgwhite';
                }
            },
            true);

    
        //Initilizing variables.
        $scope.initValues();
    
        //Laoding data 
        $scope.loadData();


    }]);
