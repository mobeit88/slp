
app.controller("buildingLicenseCtrl",function ($scope,Route,ngTableParams,apiCall,$filter,$timeout,$state,$mdDialog){

    apiCall.getData(function(res) {
        $scope.orderData = res.data;
        initTable();
    });

    $scope.chooseAction = function (val,ev,key) {
        if(val==1){
            $state.go('building.download');
        }
        if(val==2){
            $scope.viewProductKey(ev,key)
        }
        if(val==3){
            $scope.offlineActivate(ev,key)
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
            $state.go('building.offline_activate');
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
                total: $scope.orderData.length,
                counts: [5, 10, 15],

                getData: function ($defer, params) {
                    var filteredData = $filter('orderBy')($scope.orderData, params.orderBy());

                    var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                    var page = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(page);
                }
            });
    }
});