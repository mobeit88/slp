app.controller("techSoftwareController",function ($scope,Route,ngTableParams,apiCall,$filter,$timeout,$state){

    $scope.orderData = [];

    var url = "https://controls-test.apigee.net/swm/v0/database/products?field=sku,name,version,publishDate";

    apiCall.getDatas(url,function(res) {
        $scope.orderData = Object.keys(res.data).map(function (val) {
            return res.data[val];
        });
        initTable();
    });

    $scope.published_software = true;

    var initTable = function () {
        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 5
            }, {
                total: $scope.orderData.length,
                counts: $scope.orderData.length>5?[5, 10, 15]:0,
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
            }
        );
    }
});