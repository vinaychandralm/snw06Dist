'use strict';

/**
 * @ngdoc overview
 * @name snw06App
 * @description
 * # snw06App
 *
 * Main module of the application.
 */
angular
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
    'mgcrea.ngStrap.datepicker',
    // 'studentActivityReports.routing',
    'studentActivityReports.factories',
    'studentActivityReportsTeacher.factories',
    'studentActivityReports.home',
    'studentActivityReports.studentDetails',
    'teacherActivityReports.teacherDetails',
    'studentActivityReports.adminDetails',
    'studentActivityReportsAdmin.factories'
  ])
  .config(function ($routeProvider) {
    //  var routingInfo = routeInfoProvider._getRoutingInfo();

    //     for (var i = 0; i < routingInfo.length; i++) {
    //         $routeProvider.when(routingInfo[i].route, {
    //             controller: routingInfo[i].controller,
    //             templateUrl: routingInfo[i].templateUrl,
    //             index: i
    //         });
    //     }
    
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
          .otherwise({
                redirectTo: '/'
          }); 

    });


