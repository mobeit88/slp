
app.controller("loginCtrl",function ($scope,$state,$rootScope,$location,Auth) {
    $rootScope.currentUser = {};
    window.location.href = "#/login";
    $scope.loginUser = function (param) {

        Auth.login(function(res){
            if(res){
                //alert("Logged IN")
                $scope.redirectUrl = res;
                window.location = res;
                
            }
        });
    };

    $scope.skip = function (){
        Auth.setUser("Guest");
        $rootScope.currentUser = {name:"Guest"};
        $state.go("user");
    };

    $scope.redirect = function (val) {
        Auth.setUser("Guest");
        $rootScope.currentUser = {name:"Guest"};
        $state.go(val);
    };
});