

app.controller('abcsActivateTabCtrl', function ($scope,$rootScope,Route,$state){

    $scope.goToBack = function () {
        $state.go("abcs.activate")
    };

    $scope.goToOfflineSubmit = function () {
        $state.go('abcs.offline_submit')
    };

    $scope.goToOffline = function () {
        $state.go("abcs.offline_activate")
    };
 
    $scope.goToMain = function () {
        $state.go("abcs.activate")
    };

    $scope.complete = function () {
        $state.go('abcs.activate')
    }
});