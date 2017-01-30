
app.controller('abcsOfflineActivateCtrl', function ($scope,$rootScope,Route,$state){

    $scope.showCompleteBtn = false;

    $scope.showComplete = function () {
        $scope.showCompleteBtn = true;
    };
    
});