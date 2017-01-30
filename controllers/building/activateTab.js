

app.controller('buildingActivateTabCtrl', function ($scope,$rootScope,Route,$state){

    $scope.goToBack = function () {
        $state.go("building.activate")
    };

    $scope.goToOfflineSubmit = function () {
        $state.go('building.offline_submit')
    };

    $scope.complete = function () {
        $state.go('building.activate')
    };
    
    $scope.goToMain = function () {
        $state.go("building.activate")
    };
});