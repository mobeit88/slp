
app.controller("workHistoryController",function ($scope,Route,ngTableParams,apiCall,$filter,$timeout){
   
    var baseUrl = "https://controls-test.apigee.net/swm/v0/database/";

    var workHistoryUrl = baseUrl+"orders?search=collection=products,applyto1=50records,addto=product,localkey=product.code,key=code&field=50records,serviceCd,sku,name,content";
    apiCall.getDatas(workHistoryUrl, function(res) {
        $scope.workHistoryData = Object.keys(res.data).map(function (val) {
            return res.data[val]
        });
        //$scope.workHistoryData = res.data;
        initTable();
    });


    $scope.clearReleaseDate = function() {
        angular.element("#startDate").on("dp.change", function (e) {
            $(this).data("DateTimePicker").hide();
            angular.element('#endDate').data("DateTimePicker").setMinDate(e.date);
        });
    };

    $scope.setMindate = function () {
        angular.element("#endDate").on("dp.change", function (e) {
            $(this).data("DateTimePicker").hide();
            angular.element('#startDate').data("DateTimePicker").setMaxDate(e.date);
        });
    };

    var initTable = function () {
        $scope.tableParams = new ngTableParams(
            {
                page: 1,
                count: 5
            }, {
                total: $scope.workHistoryData.length,
                counts: [5, 10, 15],

                getData: function ($defer, params) {
                    var filteredData = $filter('orderBy')($scope.workHistoryData, params.orderBy());

                    var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                    var page = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(page);
                }
            });
    }


})