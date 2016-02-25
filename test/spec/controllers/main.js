'use strict';

describe('main controller', function() {
  beforeEach(module('studentActivityReports.home'));
    
    var $scope;
    var $rootScope;
    var $location;
    var theme;
    var $routeParams;
    var validateUrlData;
    var notAuthenticated;
    var noNetError;
    var getServerConfigData;
    
  beforeEach(inject(function(_$scope_, _$rootScope_, _$location_, _theme_, _$routeParams_, _validateUrlData_, _notAuthenticated_, _noNetError_, _getServerConfigData_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $scope = _$scope_ ;
    $rootScope = _$rootScope_;
    $location = _$location_;
    theme = _theme_;
    $routeParams = _$routeParams_;
    validateUrlData = _validateUrlData_;
    notAuthenticated = _notAuthenticated_;
    noNetError = _noNetError_;
    getServerConfigData = _getServerConfigData_;
  }));



