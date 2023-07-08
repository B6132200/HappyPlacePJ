'use strict';

myApp.controller('setupRecordController', function ($scope, $http) {

    $scope.random = Math.random();

    $scope.init = function () {
        $scope.GetRecordList();
    }

    /*--------------------  Get Record ----------------------------*/

    $scope.GetRecordList = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'CheckOut/GetRecordList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {
            $scope.RecordList = res.data;
            

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*-------------------------------- open modal detail ----------------------------- */
    $scope.OpenModalDetail = function (tid, index) {
        $scope.GetDetailCO(tid, index);
        $('#ModalDetail').modal('show')
    }

    /*------------------------------ Get Detail Out ---------------------- */
    $scope.GetDetailCO = function (tid, index) {
        $http({
            method: 'GET',
            url: baseUrl + 'CheckOut/GetDetailCO',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                tid: tid
            }

        }).then(function successCallback(res) {
            $scope.listDetail = res.data;
            if ($scope.listDetail != '') {
                document.getElementById('total').innerHTML = $scope.RecordList[index].fine
                $scope.deposit = $scope.RecordList[index].rooms.deposit
            }


        }, function errorCallback(err) {
            console.log(err.data);
        });
    }

    /*-------------------------------- closed modal ----------------------------- */
    $scope.back = function () {
        $('#ModalDetail').modal('hide')
    }

    /*-------------------------------- back page index -------------------------- */
    $scope.backtoIndex = function () {
        window.location.href = '/CheckOut/Index'
    }
})