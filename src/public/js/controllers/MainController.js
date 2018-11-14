/**
 * Created by stephanie.chou on 8/12/16.
 */

(function() {
    var app = angular.module('mainController', []);

    app.controller('mainController', function(
            $scope,
            $http,
            $location,
            CONTROLLER_URL,
            CONTROLLER_PORT,
            CONTROLLER_SSL,
            CONTROLLER_ACCOUNT_NAME,
            APP_ID) {

            $scope.ready = false;

            $scope.init = function () {
                $scope.ready = true;
            };

            $scope.navigateTo = function (path) {
                $location.path("/" + path);
            };

            $scope.openController = function (key) {
                var location = '';

                switch (key) {
                    case "Business Transaction List":
                        location = "APP_BT_LIST";
                        break;
                    case "Tiers":
                        location = "APP_INFRASTRUCTURE";
                        break;
                    case "Flow Map":
                        location = "APP_DASHBOARD";
                        break;
                    case "Slow Response Times":
                        location = "APP_SLOW_RESPONSE_TIMES";
                        break;
                    case "Exceptions":
                        location = "APP_ERRORS";
                        break;
                    case "Getting Started":
                        location = "AD_GETTING_STARTED";
                        break;
                    default:
                        location = "AD_HOME_OVERVIEW";
                        break;
                }

                var s = CONTROLLER_SSL == "true" ? "s" : "" ;
                
                // Congratulations link to "Get Started with Your Own App"
                if (location == "AD_GETTING_STARTED"){
                    var url = "http" + s + "://" + CONTROLLER_URL + ":" + CONTROLLER_PORT + "/?accountName="+ CONTROLLER_ACCOUNT_NAME +"#/location=" + location;
                } else {
                    // If App ID is missing, APP_ID is 0, then open controller to home page
                    if (APP_ID == 0) {
                        location = "AD_HOME_OVERVIEW";
                        var url = "http" + s + "://" + CONTROLLER_URL + ":" + CONTROLLER_PORT + "/?accountName="+ CONTROLLER_ACCOUNT_NAME +"#/location=" + location;
                    } else {
                        var url = "http" + s + "://" + CONTROLLER_URL + ":" + CONTROLLER_PORT + "/?accountName="+ CONTROLLER_ACCOUNT_NAME +"#/location=" + location + "&application=" + APP_ID;
                    }
                }

                window.open(url, "AppDynamicsController");
            };
        
            $scope.init();
        }
    );
}).call(this);
