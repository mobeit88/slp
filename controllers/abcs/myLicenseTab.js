app.controller("myLicenseTabCtrl",function ($scope,Route,$timeout,$state){

    $scope.goToBack = function () {
        $state.go("abcs.licenses")
    };

    $scope.goToOfflineSubmit = function () {
        $state.go('abcs.offline_submit')
    };

    $scope.goToMain = function () {
        $state.go("abcs.licenses")
    };

    $scope.complete = function () {
        $state.go('abcs.licenses')
    }
});