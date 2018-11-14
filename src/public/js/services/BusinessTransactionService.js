/**
 * Created by stephanie.chou on 8/2/16.
 */

(function() {
    var app = angular.module('businessTransactionService', []);

    app.service("BusinessTransactionService", function($http) {
        var service = {};

        service.save = function (id, name, useStock) {
            return $http.get('/update', {
                method: 'GET',
                params: {
                    id: id,
                    title: name,
                    content: useStock < 0 ? "0" : useStock.toString()
                }
            })
        };

        service.delete = function (id) {
            return $http.get('/delete', {
                method: 'GET',
                params: {
                    id: id
                }
            });
        };

        service.add = function (name, stock) {
            return $http.post('/add', {
                params: {
                    title: name,
                    content: stock
                }
            });
        };

        service.getProducts = function () {
            return $http.get('/products');
        };

        return service;
    });
}).call(this);