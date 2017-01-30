app.controller("buildingMyLicenseTabCtrl",function ($scope,Route,$timeout,$state){

    $scope.goToBack = function () {
        $state.go("building.licenses")
    };

    $scope.goToOfflineSubmit = function () {
        $state.go('building.offline_submit')
    };

    $scope.complete = function () {
        $state.go('building.licenses')
    };

    $scope.goToMain = function () {
        $state.go("building.licenses")
    };
});

