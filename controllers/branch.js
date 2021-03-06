

app.controller("branchCtrl",function ($scope,$state,Route,ngTableParams,apiCall,$filter,$timeout) {
    Route.setRoute("login");

    apiCall.getData(function(res) {
        $scope.orderData = res.data;
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
