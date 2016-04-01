'use strict';


var courseModule = angular.module('AdminActivityReports.courseMgmt', []);        
courseModule.controller('courseMgmtCtrl', ['$scope', '$rootScope', '$location', '$theme', '$routeParams', 'validateUrlData',
    'notAuthenticated', 'noNetError', 'getSchoolData',
    function ($scope, $rootScope, $location, theme, $routeParams, validateUrlData, notAuthenticated, noNetError,getSchoolData) {

        $scope.initValues = function () {

            $rootScope.winConfigObj = window.configObj;
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
            $scope.urlDetails = $rootScope.winConfigObj;
            // console.log($scope.urlDetails);


        };

         $scope.filterDataTODisplay = function(domainData){
            var domainDataArray = domainData.data.domains;
             $scope.domainDataScholl=null;
             var len =  domainDataArray.length;
             
             if($rootScope.role ==='admin'){
                 $scope.isTeacherRole = false;
                 
             }else{
                $scope.isTeacherRole = true;
                // In Case of teacher there only only school data.
                $scope.domainDataScholl = domainDataArray;
                // console.log( $scope.domainDataScholl);
                return
             }
             
             //Note:- there will be only one Object element for district in domain list array
             // hence  loop will break as soon as it find matched domainID Object 
             for(var i=0;i<len;i++){
                 if(domainDataArray[i].id === $rootScope.userDetails.data.data.user.domainid){
                    $scope.disrtictObj = domainDataArray.splice(i,1);  
                    // console.log($scope.disrtictObj); 
                    break;
                 }
             }
             // In Case of teacher there only only school data.
             $scope.domainDataScholl = domainDataArray;
         }

        $scope.get_district_School_Data =  function(){
             getSchoolData._get($rootScope.userDetails.data.data.user.domainid, $rootScope.token, $scope.urlDetails)
                .then(function onsuccess(response) {
                    if (response.data.messageType === "ERROR") {
                        notAuthenticated._showErrorMsg();
                        return;
                    }
                    // console.log(response.data)
                    /*call here data parsing methood   
                      and fufther data instialization
                                          
                     */
                    
                    $scope.filterDataTODisplay(response.data);

                }, function onerror(response) {
                    noNetError._showNetErrorMsg();
                });
            
        }

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
                       
                       //Storing userdetail response into rootscope.
                        $rootScope.userDetails = response;
                        $scope.showLogErrorPg = false;
                        $rootScope.bodybg = 'bodyBgwhite';
                        $rootScope.showoverlay = false;
                        //Fetching data after successfull authentication
                        $scope.get_district_School_Data();
                    }
                }, function onError(errResponse) {
                    console.log("err Response ", errResponse);
                    noNetError._showNetErrorMsg();
                });
        };

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