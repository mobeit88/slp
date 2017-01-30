
var app = angular.module('admin',['ui.router','ngMaterial','tmh.dynamicLocale','ngTable','toastr','ngTableToCsv','ngCookies','ngSanitize','ui.select','pascalprecht.translate']);

app.run(function ($state,$rootScope) {
    $state.go('login');
    $rootScope.title= "JCI Software Licensing Portal"
});

app.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeSuccess', function () {
        if (!Auth.isLoggedIn()) {
            $state.go('login');
        }
        else {

        }
    });
}]);

app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-top-right',
        preventDuplicates: true
    });
});

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Accept'] = 'application/json';

})


app.constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/);
app.constant('VERSION_TAG', /*VERSION_TAG_START*/new Date().getTime()/*VERSION_TAG_END*/);
app.constant('LOCALES', {
        'locales': {
            'en_US': 'English',
            'es_ES': 'Spanish',
            'zh_CN': 'Chinese (Simplified)',
            'zh_TW': 'Chinese - Taiwan',
            'cs_CZ': 'Czech',
            'nl_NL': 'Dutch - Netherlands',
            'fr_FR': 'French',
            'de_DE': 'German',
            'hu_HU': 'Hungarian',
            'it_IT': 'Italian',
            'ja_JP': 'Japanese',
            'ko_KR': 'Korean',
            'nb_NO': 'Norwegian',
            'pl_PL': 'Polish',
            'pt_BR': 'Portuguese - Brazil',
            'ru_RU': 'Russian',
            'sv_SE': 'Swedish',
            'tr_TR': 'Turkish'
        },
        'preferredLocale': 'en_US'
    });

// Angular debug info
app.config(function ($compileProvider, DEBUG_MODE) {
    if (!DEBUG_MODE) {
        $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
    }
});

app.config(function ($translateProvider, DEBUG_MODE, LOCALES) {
    if (DEBUG_MODE) {
        $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
    }

    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage(LOCALES.preferredLocale);
    $translateProvider.useLocalStorage();
});

app.config(function ($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('login',{
            url : '/login',
            templateUrl : 'views/login.html',
            controller : 'loginCtrl'
        })
        .state('tech',{
            url : '/tech',
            templateUrl : 'views/tech.html',
            controller : 'techCtrl'
        })

        .state('tech.activate',{
            url: '',
            views: {
                'activate': {
                    templateUrl: 'partials/activate.html',
                    controller:'techActivateCtrl'
                }
            }
        })        
        .state('tech.submit',{
            url: '',
            views: {
                'submit_activate': {
                    templateUrl: 'partials/tech-submit.html',
                    controller:'activateSubmitCtrl'
                }
            }
        })
        .state('tech.trials',{
            url: '',
            views: {
                'tech_trials': {
                    templateUrl: 'partials/tech-trials.html',
                    controller:'techTrialsCtrl'
                }
            }
        })
        .state('tech.offline_activate',{
            url: '',
            views: {
                'offline_activate': {
                    templateUrl: 'views/offline-activate.html'
                }
            }
        })
        .state('tech.offline_submit',{
            url: '',
            views: {
                'offline_submit': {
                    templateUrl: 'views/offline-submit.html',
                    controller:'activateOfflineCtrl'
                }
            }
        })
        .state('tech.download',{
            url: '',
            views: {
                'download': {
                    templateUrl: 'views/download.html',
                    controller: 'activateDownloadCtrl'
                }
            }
        })

        .state('tech.deactivate',{
            url: '',
            views: {
                'deactivate': {
                    templateUrl: 'partials/deactivate.html',
                    controller: 'deactivateTableCtrl'
                }
            }
        })
        .state('tech.myWork',{
            url: '',
            views: {
                'myWork': {
                    templateUrl: 'partials/my-work-history.html',
                    controller:'workHistoryController'
                }
            }
        })

        .state('tech.license',{
            url: '',
            views: {
                'license': {
                    templateUrl: 'partials/tech-license.html',
                    controller : 'techLicenseController'
                }
            }
        })
        
        .state('tech.software',{
            url: '',
            views: {
                'published_software': {
                    templateUrl: 'views/skulist.html',
                    controller: 'techSoftwareController'
                }
            }
        })
        .state('tech.skulist',{
            url: '',
            views: {
                'skulist': {
                    templateUrl: 'views/skulist.html',
                    controller: 'skuListCtrl'
                }
            }
        })
        .state('tech.customer',{
            url: '',
            views: {
                'tech_customer': {
                    templateUrl: 'partials/tech-customer.html'
                }
            }
        })
        .state('tech.skudetails',{
            url: '',
            views: {
                'skudetails': {
                    templateUrl: 'partials/sku-details.html'
                }
            }
        })

        .state('branch',{
            url : '/branch',
            templateUrl : 'views/branch.html',
            controller : 'branchCtrl'
        })

        .state('branch.view',{
            url: '',
            views: {
                'view_sku': {
                    templateUrl: 'partials/view-licenses.html',
                    controler: 'viewSkuCtrl'
                }
            }
        })
        .state('branch.customer',{
            url: '',
            views: {
                'customer_license': {
                    templateUrl: 'partials/branch-customer.html',
                    controller : 'branchCustomerCtrl'

                }
            }
        })
        .state('branch.activities',{
            url: '',
            views: {
                'tech_activities': {
                    templateUrl: 'partials/branch-activities.html',
                    controller : 'branchActivitiesCtrl'
                }
            }
        })
        .state('branch.tech',{
            url: '',
            views: {
                'tech_license': {
                    templateUrl: 'partials/branch-license.html',
                    controller : 'branchLicenseCtrl'
                }
            }
        })
        .state('branch.order',{
            url: '',
            views: {
                'branch_order': {
                    templateUrl: 'partials/branch-order.html',
                    controller : 'branchOrderCtrl'
                }
            }
        })

        .state('branch.more',{
            url: '',
            views: {
                'order_details': {
                    templateUrl: 'partials/branch-order-details.html',
                    controller : 'orderDetailsCtrl'
                }
            }
        })
        .state('branch.customerinfo',{
            url: '',
            views: {
                'customer_info': {
                    templateUrl: 'partials/customer-info.html',
                    controller : 'customerInfoCtrl'
                }
            }

        })

        .state('abcs',{
            url : '/abcs',
            templateUrl : 'views/abcs.html',
            controller : 'abcsCtrl'
        })
        .state('abcs.licenses',{
            url : '',
            views: {
                'my_licenses': {
                    templateUrl: 'partials/abcs-mylicenses.html',
                    controller : 'abcsLicenseCtrl'
                }
            }
        })
        .state('abcs.orders',{
            url : '',
            views: {
                'my_orders': {
                    templateUrl: 'partials/abcs-myorders.html',
                    controller : 'abcsOrderCtrl'
                }
            }
        })
        .state('abcs.orders_details',{
            url : '',
            views: {
                'abcs_orders_details': {
                    templateUrl: 'partials/abcs-order-details.html',
                    controller : 'orderDetailsCtrl'
                }
            }
        })
        .state('abcs.softwares',{
            url : '',
            views: {
                'my_softwares': {
                    templateUrl: 'partials/abcs-mysoftwares.html',
                    controller : 'abcsSoftwaresCtrl'
                }
            }
        })
        .state('abcs.activate',{
            url : '',
            views: {
                'abcs_activate': {
                    templateUrl: 'partials/abcs-activate.html',
                    controller : 'abcsActivateCtrl'
                }
            }
        })
        .state('abcs.download',{
            url : '',
            views: {
                'abcs_download': {
                    templateUrl: 'views/download.html',
                    controller : 'abcsActivateCtrl'
                }
            }
        })
        .state('abcs.offline_activate',{
            url : '',
            views: {
                'abcs_offline_activate': {
                    templateUrl: 'views/offline-activate.html',
                    controller : 'abcsOfflineActivateCtrl'
                }
            }
        })
        .state('abcs.offline_submit',{
            url : '',
            views: {
                'abcs_offline_submit': {
                    templateUrl: 'partials/abcs-offline-submit.html',
                    controller : 'abcsOfflineActivateCtrl'
                }
            }
        })
        .state('abcs.deactivate',{
            url : '',
            views: {
                'abcs_deactivate': {
                    templateUrl: 'partials/abcs-deactivate.html',
                    controller : 'deactivateCtrl'
                }
            }
        })
        
        .state('building',{
            url : '/building',
            templateUrl : 'views/building.html',
            controller : 'buildingCtrl'
        })
        .state('building.licenses',{
            url : '',
            views: {
                'building_my_licenses': {
                    templateUrl: 'partials/abcs-mylicenses.html',
                    controller : 'buildingLicenseCtrl'
                }
            }
        })
        .state('building.orders',{
            url : '',
            views: {
                'building_my_orders': {
                    templateUrl: 'partials/abcs-myorders.html',
                    controller : 'buildingOrderCtrl'
                }
            }
        })
        .state('building.orders_details',{
            url : '',
            views: {
                'building_orders_details': {
                    templateUrl: 'partials/abcs-order-details.html',
                    controller : 'buildingOrderDetailsCtrl'
                }
            }
        })
        .state('building.softwares',{
            url : '',
            views: {
                'building_my_softwares': {
                    templateUrl: 'partials/building-mysoftwares.html',
                    controller : 'abcsSoftwaresCtrl'
                }
            }
        })
        .state('building.activate',{
            url : '',
            views: {
                'building_activate': {
                    templateUrl: 'partials/abcs-activate.html',
                    controller : 'buildingActivateCtrl'
                }
            }
        })
        .state('building.download',{
            url : '',
            views: {
                'building_download': {
                    templateUrl: 'views/download.html',
                    controller : 'buildingActivateCtrl'
                }
            }
        })
        .state('building.offline_activate',{
            url : '',
            views: {
                'building_offline_activate': {
                    templateUrl: 'views/offline-activate.html',
                    controller : 'abcsOfflineActivateCtrl'
                }
            }
        })
        .state('building.offline_submit',{
            url : '',
            views: {
                'building_offline_submit': {
                    templateUrl: 'partials/abcs-offline-submit.html',
                    controller : 'abcsOfflineActivateCtrl'
                }
            }
        })
        .state('building.deactivate',{
            url : '',
            views: {
                'building_deactivate': {
                    templateUrl: 'partials/building-deactivate.html',
                    controller : 'buildingDeactivateCtrl'
                }
            }
        })

    $urlRouterProvider.otherwise('/login');
});

// Angular Dynamic Locale
app.config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('js/angular-i18n/angular-locale_{{locale}}.js');
});


app.config(function($httpProvider) {
        $httpProvider.interceptors.push('redirectInterceptor');
});
