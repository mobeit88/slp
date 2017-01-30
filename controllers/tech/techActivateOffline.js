
app.controller("activateOfflineCtrl",function ($scope,Auth,$state,Route,apiCall,$filter,$timeout,toastr,$rootScope) {
    $scope.showCompleteBtn = false;

    // var activation = ""

    $scope.showComplete = function ($rootScope) {

        var params = {'grant_type':'client_credentials'};
        var postParam = {"activation": {
            "productCode": "1234",
                "productKey": $rootScope.product_key,
                "systemID": $rootScope.system_id
            }
        };
        apiCall.tokenRequest(params,function (val){
            console.log("token",res.data);
            var token = res.data?res.data.access_token:null;
            if(res.status==200){
                apiCall.postData(postParam,token,function (val) {
                    $scope.showCompleteBtn = true;
                    console.log(val,'Activation JSOn HERE');
                })
            }
        })
    };

});
