(function() {
    var app = angular.module('exceptionsController', []);

    app.controller('exceptionsController', function ($scope, $http, ExceptionsService) {

        $scope.raisingNode = false;
        $scope.raisingJava = false;
        $scope.raisingSql = false;

        var exceptionsNode = 0;
        var exceptionsJava = 0;
        var exceptionsSql = 0;

        $scope.getNodeExceptions = function() {
            return exceptionsNode;
        };

        $scope.getJavaExceptions = function() {
            return exceptionsJava;
        };

        $scope.getSqlExceptions = function() {
            return exceptionsSql;
        };

        $scope.raiseNodeException = function() {
            $scope.raising = true;
            return ExceptionsService.nodeException().success(function() {
                exceptionsNode++;
            }).error(function() {
                alert('Unable to raise exception.');
            }).finally(function () {
                return $scope.raisingNode = false;
            });
        };


        $scope.raiseJavaException = function() {
            $scope.raisingJava = true;
            return ExceptionsService.javaException().success(function() {
                exceptionsJava++;
            }).error(function() {
                alert('Unable to raise exception.');
            }).success(function (data) {
                return $scope.raisingJava = false;
            });
        };

        $scope.raiseSqlException = function() {
            $scope.raisingSql = true;
            return ExceptionsService.dbException().success(function() {
                exceptionsSql++;
            }).error(function() {
                alert('Unable to raise exception.');
            }).success(function (data) {
                return $scope.raisingSql = false;
            });;
        };

    })
}).call(this);

