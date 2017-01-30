

app.controller("consumerCtrl",function ($scope,$state,Route) {
    Route.setRoute("login");

    $scope.redirect = function (){
        $state.go("license")
    }

});