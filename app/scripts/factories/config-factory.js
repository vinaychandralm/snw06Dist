"use strict";

var factoryModule = angular.module('studentActivityReports.factories', []);
factoryModule.factory('getReportUrl',['$rootScope', function($rootScope) {

    return {
        _get: function(role,userid,_token,urlDetails) {
//            console.log(role,userid);
//            var token = _token;
//            var entitytype = 'D|C';
//            
//            var basePath =urlDetails.servicesBaseUrl  +"/user/rights/";
//            $rootScope.showoverlay = true;
//            var __url = basePath +userid+'?roletype='+role+'&entitytype='+entitytype+'&token='+_token;
//            console.log(__url);
//            return $http.get(__url);

        }
    };
}]);