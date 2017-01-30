
app.controller('licenseCtrl', function ($scope,toastr,$timeout,$rootScope,ngTableParams,apiCall,$filter,$state,Route){

    $rootScope.title= "Software Order for NYC branch";

    Route.setRoute("login");


    apiCall.getData(function(res) {
        $scope.orderData = res.data;   
        initTable();
    });

    var clipboard = new Clipboard('.fa-key');
    clipboard.on('success', function(e) {
        toastr.info('Key:'+ e.text + ' copied Successfully');
        e.clearSelection();
    });


    $scope.newPage = function () {
        $state.go('skulist');
    }

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
                    $timeout(function () {
                        $('[data-toggle="tooltip"]').tooltip();
                    },10);
                    $defer.resolve(page);
                }
            });
    }
});
