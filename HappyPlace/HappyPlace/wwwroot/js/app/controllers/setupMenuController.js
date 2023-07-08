'use strict';



myApp.controller('setupMenuController', function ($scope, $http) {


    //$scope.Init = function () {
    //    console.log('Hi');
    //};

    $scope.OpenRoom = function () {
        window.location.href = '/Room/Index'
    }

    $scope.OpenCheckIn = function () {
        window.location.href = '/CheckIn/Index'
    }

    $scope.OpenCheckOut = function () {
        window.location.href = '/CheckOut/Index'
    }

    $scope.OpenBook = function () {
        window.location.href = '/Book/Index'
    }

    $scope.OpenBill = function () {
        window.location.href = '/Bill/Index'
    }

    $scope.OpenPayment = function () {
        window.location.href = '/Payment/Index'
    }

    $scope.OpenAccounting = function () {
        window.location.href = '/Accounting/Index'
    }




});