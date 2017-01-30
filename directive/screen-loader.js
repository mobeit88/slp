
app.directive("screenLoader",function ($http,$timeout) {
    return {
        restrict: 'AC',
        templateUrl:"views/loader.html",
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    element.show();
                } else {
                    element.hide();
                }
            });
        }
    }
});