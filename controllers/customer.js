
app.controller('customerCtrl', function ($scope,$rootScope,apiCall,toastr,$state,$stateParams,Route){
    $scope.editable = false;
    $scope.searchProduct = "";
    $rootScope.title= "Customer Information";
    var data = {};
    var uid = $stateParams.uid;
    var id = $rootScope.id;

    $scope.$on("$stateChangeSuccess",function (event, toState, toParams, fromState, fromParams) {
        var from = fromState.name;
        if(id){
            Route.setRoute(from,{id:id});
        } else{
            Route.setRoute(from);
        }
    });
    $scope.$on("$stateChangeStart",function (event, toState, toParams, fromState, fromParams) {
        $rootScope.id = null;
    });

    apiCall.getData(function(res) {
        $scope.data = {};
        angular.forEach(res.data,function (data,index) {
            angular.forEach(data.lineNumbers,function (val,i) {
                angular.forEach(val.products,function (products,ind) {
                    if(products.sid==uid){
                        $scope.data.contact = products.contact;
                        $scope.data.address = products.customer;
                    }
                })
            })
        });
        data = angular.copy($scope.data);
    });

    $scope.edit= function () {
        $scope.editable=true;
    };

    $scope.save = function () {
        toastr.success('Customer Updated Successfully', 'Update');
        $scope.editable=false;
        data = angular.copy($scope.data);
    };


    // $scope.go = function () {
    //     $state.go('product',{id:id});
    // };

    $scope.close = function () {
        $scope.editable = false;
        $scope.data = {};
        $scope.data.contact = angular.copy(data.contact);
        $scope.data.address = angular.copy(data.address);
    }
});