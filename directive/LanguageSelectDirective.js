
app.directive('ngTranslateLanguageSelect', function (LocaleService) {
    'use strict';

    return {
      restrict: 'A',
      replace: true,
      templateUrl:'views/language.html',
      controller: function ($scope) {

        var currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
        $scope.currentLocaleDisplayName = [];
        $scope.localesDisplayNames = [];

        var getFlag = function (val,ref) {

          switch(val){
            case"Spanish":
              ref.push({language:val,icon:'flag-icon-es'});
              break;
            case "English":
              ref.push({language:val,icon:'flag-icon-us'});
              break;
            case "Chinese (Simplified)":
              ref.push({language:val,icon:'flag-icon-cn'});
              break;
            case "Chinese - Taiwan":
              ref.push({language:val,icon:'flag-icon-tw'});
              break;
            case "Czech":
              ref.push({language:val,icon:'flag-icon-cz'});
              break;
            case "Dutch - Netherlands":
              ref.push({language:val,icon:'flag-icon-bq'});
              break;
            case "French":
              $scope.localesDisplayNames.push({language:val,icon:'flag-icon-fr'});
              break;
            case "German":
              ref.push({language:val,icon:'flag-icon-de'});
              break;
            case "Hungarian":
              ref.push({language:val,icon:'flag-icon-hu'});
              break;
            case "Italian":
              ref.push({language:val,icon:'flag-icon-ie'});
              break;
            case "Japanese":
              ref.push({language:val,icon:'flag-icon-jp'});
              break;
            case "Korean":
              ref.push({language:val,icon:'flag-icon-kr'});
              break;
            case "Norwegian":
              ref.push({language:val,icon:'flag-icon-no'});
              break;
            case "Polish":
              ref.push({language:val,icon:'flag-icon-pl'});
              break;
            case "Russian":
              ref.push({language:val,icon:'flag-icon-ru'});
              break;
            case "Portuguese - Brazil":
              ref.push({language:val,icon:'flag-icon-br'});
              break;
            case "Swedish":
              ref.push({language:val,icon:'flag-icon-se'});
              break;
            case "Turkish":
              ref.push({language:val,icon:'flag-icon-tr'});
              break;
          }
        };


       getFlag(currentLocaleDisplayName,$scope.currentLocaleDisplayName);
        $scope.currentLocaleDisplayName = $scope.currentLocaleDisplayName[0];

        var localesDisplayNames = LocaleService.getLocalesDisplayNames();
        localesDisplayNames.forEach(function (val) {
          getFlag(val,$scope.localesDisplayNames);
        });

        $scope.visible = $scope.localesDisplayNames &&
        $scope.localesDisplayNames.length > 1;
       
        $scope.changeLanguage = function (locale) {
          LocaleService.setLocaleByDisplayName(locale.language);
        };
      }
    };
  });

