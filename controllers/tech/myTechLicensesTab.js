
app.controller("myTechLicenseTabCtrl",function ($scope,$state,Route,apiCall,$filter,$timeout) {

    $scope.goToBack = function () {
        $state.go("tech.license")
    };

    $scope.goToOffline = function () {
        $state.go("tech.offline_activate")
    };

    $scope.goToMain = function () {
        $state.go("tech.license")
    };

    $scope.goToOfflineSubmit = function () {
        $state.go('tech.offline_submit')
    }
});
