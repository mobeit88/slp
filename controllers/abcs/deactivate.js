
app.controller("deactivateCtrl",function ($scope,$state,Route,ngTableParams,apiCall,$filter,$timeout,$mdDialog) {
    apiCall.getData(function(res) {
        $scope.orderData = res.data;
        initTable();
    });

    $scope.initView = function () {
        $scope.show_breadcrumb = false;
        $scope.show_enter = true;
        $scope.show_select = false;
        $scope.show_dl = false;
        $scope.show_upload = false;
        $scope.show_license = false;
    };

    $scope.initView();

    $scope.toggleView = function (e,s,d,u,l){
        $scope.show_enter = e;
        $scope.show_select = s;
        $scope.show_dl = d;
        $scope.show_upload = u;
        $scope.show_license = l;
    };

    $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('')
            .textContent('Are you sure that you want to deactivate?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $scope.deactivate_license();
        }, function() {

        });
    };


    $scope.deactivate_license = function () {
        $scope.toggleView(false,false,true,false,false)
    };

    $scope.showUpload = function () {
        $scope.toggleView(false,false,false,true,false)
    };
    $scope.hideUpload = function () {
        $scope.toggleView(false,false,true,false,false)
    };


    $scope.showTable = function(){
        $scope.toggleView(false,true,false,false,false)
    };
    $scope.hideTable = function(){
        $scope.toggleView(true,false,false,false,false)
    };
    $scope.showSelect = function (){
        $scope.toggleView(false,true,false,false,false)
    };

    $scope.onChange = function (val) {
        if(val==1){
            $scope.show_breadcrumb = true;
        }else if (val==2){
            $scope.show_breadcrumb = true;
            $scope.toggleView(false,false,false,true,false);
        }
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

