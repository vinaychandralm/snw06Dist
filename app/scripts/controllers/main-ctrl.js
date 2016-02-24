'use strict';
var constantModule = angular.module('constant', []);

constantModule.constant('$theme', {
    "theme": "black"
});

var homeModule = angular.module('studentActivityReports.home', ['constant']);




homeModule.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$theme', '$routeParams', 'validateUrlData', 'notAuthenticated', 'noNetError', 'getServerConfigData', function ($scope, $rootScope, $location, theme, $routeParams, validateUrlData, notAuthenticated, noNetError, getServerConfigData) {


    $scope.progressReport = false;
    $scope.courseCompletionReport = false;
    $scope.studentActivityReport = false;
    $rootScope.loadingText = true;
    $rootScope.netErr = false;
    $rootScope.authenticationErr = false;

    $rootScope.token = $routeParams.token;
    console.log($routeParams.token);
    $rootScope.userid = $routeParams.userid;
    $rootScope.token = $routeParams.token;
    $rootScope.role = $routeParams.role;
    
    //putting 'userspace' value to root scope so that it is avilable to all ctrls
    $rootScope.userspace = $routeParams.userspace
    
    console.log($rootScope.role, $rootScope.userid, $routeParams.token);
    console.log($routeParams.role, $routeParams.userid, $routeParams.token);


//    TODO : Remove blow 6 line comments if not using GRUNT-SERVE.
        $routeParams.role = CONFIGJSONOBJ.userSettingObjects.role;
        $routeParams.userid = CONFIGJSONOBJ.userSettingObjects.userid;
        $routeParams.token = CONFIGJSONOBJ.userSettingObjects.token;
        $rootScope.token = $routeParams.token;
        $rootScope.userid = $routeParams.userid;
        $rootScope.role = $routeParams.role;

    var urlDetails = getServerConfigData._getDetails();
    
    console.log("urlDetails   ",urlDetails);
    validateUrlData._get($routeParams.role, $routeParams.userid, $routeParams.token, urlDetails)
        .then(function onsuccess(response) {
            console.log($routeParams.token + " $routeParams.token");
            console.log(response.data);

            if (response.data.messageType === "ERROR") {

                notAuthenticated._showErrorMsg();

            } else {
                $scope.showTiles(response.data);
                $rootScope.showoverlay = false;
            }

        }, function onError(errResponse) {
            console.log("err Response ", errResponse);
            noNetError._showNetErrorMsg();
            $scope.blockUser(errResponse);
        });


    $scope.showTiles = function (authResponse) {
        console.log(authResponse);
        // $scope.courseArr=studentCourse.data.course;
        console.log(authResponse);

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
    $scope.blockUser = function (authResponse) {
        console.log(authResponse);
        // $scope.courseArr=studentCourse.data.course;
        console.log(authResponse);
    };


    //    $scope.role = 'admin';
    //    $rootScope.role = 'admin';
    //    $scope.showTiles('sjkdfhjks');


    console.log('$routeParams', $routeParams);
    console.log('role= ', $routeParams.role);
    console.dir("Inside MainCtrl");
    console.log(theme.theme);
    $rootScope.isblue = true;

    $scope.teacherId = "12345";
    $scope.extDataArr = ["checkAll", "uncheckAll"];
    $scope.extData = $scope.extDataArr.join(",");

    $scope.roles = {
        "student": [{ "text": "Progress Report" }, { "text": "Student Activity Report" }],
        "teacher": [{ "text": "Course Completion Report" }, { "text": "Student Activity Report" }],
        "admin": [{ "text": "Progress Report" }, { "text": "Course Completion Report" }, { "text": "Student Activity Report" }]
    };

    console.log($scope.roles);

    $scope.openForm2 = function () {
        $location.path("/student-activity-reports");
    };
    $scope.openForm1 = function () {
        $location.path("/teacher-form");
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

    $scope.go = function (path) {
        $location.path(path);
    };

    $rootScope.$watch(function () { // fixed function declaration
        return $location.path();
    },
        function (newValue, oldValue) {
            console.log(newValue, oldValue);
            if (newValue === '/') { // Update: variable name case should be the same
                // here you can do your tasks
                $rootScope.bodybg = 'bodyBgViolat';
            }
            else {
                $rootScope.bodybg = 'bodyBgwhite';
            }
        },
        true);
}]);
