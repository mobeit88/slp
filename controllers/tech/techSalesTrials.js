
app.controller("techTrialsCtrl",function ($scope,$state,toastr,Route,ngTableParams,apiCall,$filter,$timeout,$mdDialog,$rootScope) {
    $scope.view = {nestedview:false};



    var baseUrl = "https://controls-test.apigee.net/swm/v0/database/";
    var productUrl = "salesdemos?search=collection=salestrials,key=licenses.productKey,localkey=licenses.productKey,licenses.productKey=="+$rootScope.product_key+"&field=sku,licenses,products,productId"

        apiCall.getDatas(baseUrl+productUrl,function(res) {
            if(Object.keys(res.data).length)
            {
                $scope.productData = Object.keys(res.data).map(function (val) {
                    return res.data[val]
                });
                initTable();

            }else {
                toastr.warning("Invalid Order Number:"+$rootScope.product_key, 'Warning');
                $state.go('tech.activate')
            }

        });

    $scope.chooseAction = function (val,ev,key) {
        if(val==1){
            $state.go('tech.download');
        }
        if(val==2){
            $scope.viewProductKey(ev,key);
        }
        if(val==3){
            $scope.offlineActivate(ev,key);
        }

    };

    $scope.offlineActivate = function (ev,key) {
        var confirm = $mdDialog.confirm()
            .title('Activate MS-ADS025 / Metasys ADX 25')
            .textContent('')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $state.go('tech.offline_activate');

        }, function() {

        });
    };

    $scope.viewProductKey = function(ev,key) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(key)
                .textContent('')
                .ariaLabel('Alert Dialog Demo')
                .ok('close')
                .targetEvent(ev)
        );
    };

    var initTable = function () {
        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 5
            }, {
                total: $scope.productData.length,
                counts: $scope.productData.length>5?[5, 10, 15]:0,

                getData: function ($defer, params) {
                    var filteredData = $filter('orderBy')($scope.productData, params.orderBy());

                    var productData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                    var page = productData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(page);
                }
            });
    }
});
