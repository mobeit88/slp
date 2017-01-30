app.controller("abcsDownloadCtrl",function ($scope,ngTableParams,apiCall,$filter,$timeout,$state) {
    apiCall.getData(function(res) {
        $scope.orderData = res.data;
        initTable();
    });


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
