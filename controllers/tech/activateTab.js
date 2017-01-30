
app.run(function($rootScope) {
    
});

app.controller("activateTabCtrl",function ($scope,$state,Route,apiCall,$filter,$timeout,$rootScope) {
    Route.setRoute("tech");
    
    $scope.goToBack = function () {
        $state.go("tech.submit")
    };

      $scope.goToOffline = function () {
        $state.go("tech.offline_activate")
    };


    $scope.goToMain = function () {
        $state.go("tech.submit")
    };

    $scope.goToOfflineSubmit = function (sysid) {
        $rootScope.system_id = sysid;
        $state.go('tech.offline_submit')
    }
});
