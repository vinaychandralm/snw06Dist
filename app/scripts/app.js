'use strict';
(function () {
    /**
     * @ngdoc overview
     * @name snw06App
     * @description
     * # snw06App
     *
     * Main module of the application.
     */
    var studentActivityApp = angular
        .module('studentActivityReports', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.multiselect',
        // 'angularjs-dropdown-multiselect',
            'mgcrea.ngStrap',
        // 'studentActivityReports.routing',
            'studentActivityReports.factories',
            'studentActivityReportsTeacher.factories',
            'studentActivityReports.services',
            'studentActivityReports.home',
            'studentActivityReports.studentDetails',
            'teacherActivityReports.teacherDetails',
            'studentActivityReports.adminDetails',
            'studentActivityReports.studentProgressReport',
            'teacherActivityReports.teacherCourseComp',
            'AdminActivityReports.courseMgmt',
            'progressReport.adminDetails',
            'courseCompletionAdmin.adminDetails',
            'studentActivityReportsAdmin.factories',
            'studentActivityReportscommomns.factories'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'MainCtrl'
                })
                .when('/student-activity-reports', {
                    templateUrl: 'views/student-activity-reports.html',
                    controller: 'studentDetailsCtrl'
                })
                .when('/teacher-form', {
                    templateUrl: 'views/teacher-form.html',
                    controller: 'teacherDetailsCtrl'
                })
                .when('/admin-form', {
                    templateUrl: 'views/admin-form.html',
                    controller: 'adminctrl'
                })
                .when('/progress-report-student', {
                    templateUrl: 'views/progress-report-student.html',
                    controller: 'studentProgressReportCtrl'
                })
                .when('/coursecompletion-report-teacher', {
                    templateUrl: 'views/coursecompletion-report-teacher.html',
                    controller: 'teacherCourseCompletionCtrl'
                  })
                .when('/progress-report-admin', {
                    templateUrl: 'views/progress-report-admin.html',
                    controller: 'progressAdmin'
                })
                .when('/course-completion-admin', {
                    templateUrl: 'views/course_completion_admin.html',
                    controller: 'courseCompletionAdmin'
                })
                .when('/course-mgmt-tool', {
                    templateUrl: 'views/course-mgmt-tool.html',
                    controller: 'courseMgmtCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                })

        });


    fetchData();
    
    function fetchData() {
        $.get("scripts/commons/jsonconfig.json").success(function (data) {
            console.log("..................................................................................",data);
            // alert( "Load was performed." );
            window.configObj = data;
            angular.bootstrap(document, ["studentActivityReports"]);
           
        }).error(function(dataerr){ 
            console.log("Error while getting");
            console.log(dataerr )});

    }
    
    studentActivityApp.constant('_', window._);

} ());