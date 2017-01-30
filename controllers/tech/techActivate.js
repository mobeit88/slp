
app.controller("techActivateCtrl",function ($scope,$state,Route,$rootScope) {
    Route.setRoute("tech");


    $scope.goTo = function (order) {
        console.log("ordernumber",order);
        $rootScope.order_key = order;
        $state.go("tech.submit",{order:order})
    };

    $scope.goToTechTrials = function(key){
        console.log("key",key);
        $rootScope.product_key = key;

        $state.go("tech.trials",{key:key})
    }

    
});
