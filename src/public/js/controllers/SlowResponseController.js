/**
 * Created by stephanie.chou on 8/22/16.
 */
(function () {
    var app = angular.module('slowResponseController', []);

    app.controller('slowResponseController', function ($scope, $http) {
        $scope.slowRequest = false;

        $scope.makeSlowRequest = function(delay) {
            return $http.get('/exceptions/slow/' + delay, {})
        };

        $scope.slowRequestGet = function(delay) {
            this.makeSlowRequest(delay).success(function () {
                return $scope.slowRequest = false;
            });
        };
    });
}).call(this);