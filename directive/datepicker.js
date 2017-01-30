
app.directive('datePicker',function (dateFilter) {
    return {
        restrict: 'EA',
        require:'ngModel',
        scope:{
            "objectToInject": '=',
            "data" : "="
        },
        link: function(scope, element, attrs,ctrl){
            $(element).datetimepicker({ useCurrent: false});

            var dateFormat = attrs['data-date-format'] || 'yyyy-MM-dd';
            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
            scope.$watch( 'objectToInject', function(value) {
                if(value){
                    scope.Obj = value;
                    /*Injecting the Method*/
                    scope.Obj.invoke = function(){
                        //Do something
                    }
                }
            } );
        }
    }
});