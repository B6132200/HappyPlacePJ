'use strict';

myApp.controller('setupIndexBookController', function ($scope, $http) {

    $scope.random = Math.random();
    $scope.init = function () {
        document.getElementById('nodata').hidden = true
        $scope.GetBookList();
       
    }

    $scope.OpenBook = function () {
        window.location.href = '/Book/Book'
    }
    
    $scope.GetBookList = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'Book/GetBookList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {

            $scope.listBook1 = res.data;
            if ($scope.listBook1 == '') {
                document.getElementById('nodata').hidden = false
            }
            //  console.log($scope.listBook)

            for (var x = 0; x < $scope.listBook1.length; x++) {
                const date = $scope.listBook1[x].dateCI.split('/')
                var d = date[0]
                var m = date[1]
                var y = date[2]
                var dateS = y + '-' + m + '-' + d

                $scope.listBook1[x].dateCI = new Date(dateS)
            }
            $scope.listBook = $scope.listBook1
            // console.log(newD)


            // console.log($scope.listBook)

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*------------------------------- edit Date Check in ------------------------*/

    $scope.editDateCI = function (id, date, index, dateB) {
        document.getElementById('date' + index).disabled = false;
        $scope.dataN = $scope.listBook[index - 1];
        const dateB1 = dateB.split('/')
        var d = dateB1[0]
        var m = dateB1[1]
        var y = dateB1[2]
        var dateS = y + '-' + m + '-' + d

        var dateB2 = new Date(dateS)

        $('#date' + index).blur(function () {
            if ($scope.listBook[index - 1].dateCI > date || $scope.listBook[index - 1].dateCI < date) {
                if ($scope.listBook[index - 1].dateCI < dateB2) {
                    $("#errmsgDateCI" + index).html("* ต้องก่อนวันที่แจ้งจอง").show()
                    console.log('hi')
                }
                else {
                    $("#errmsgDateCI" + index).html("* ต้องก่อนวันที่แจ้งจอง").hide()

                    var currentDate = $scope.listBook[index - 1].dateCI
                    var month = currentDate.getMonth() + 1;
                    if (month < 10) month = "0" + month;
                    var dateOfMonth = currentDate.getDate();
                    if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
                    var year = currentDate.getFullYear();
                    var formattedDate = dateOfMonth + "/" + month + "/" + year;
                    $scope.dataN.dateCI = formattedDate

                    $http({
                        method: 'POST',
                        url: baseUrl + 'Book/SaveEditBook',
                        random: $scope.random,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: $scope.dataN,
                    }).then(function (res) {
                        if (res.data) {
                            window.location.reload();

                        };
                    });
                }
            }
            else {
                document.getElementById('date' + index).disabled = true;
                $("#errmsgDateCI" + index).html("* ต้องก่อนวันที่แจ้งจอง").hide()
            }
                
        })
    }

    /*---------------------------------- delete book ----------------------------*/

    $scope.DelBook = function (index) {

        var id = $scope.listBook[index].id

        Swal.fire({
            title: 'ต้องการลบการจองใช่หรือไม่ ?',
            text: "",
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่',

        }).then(function (result) {

            if (result.value) {
                $http({
                    method: 'POST',
                    url: baseUrl + 'Book/DeleteBook',
                    random: $scope.random,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        id: id
                    },
                }).then(function (res) {
                    if (res.data) {

                        Swal.fire({
                            icon: 'success',
                            title: 'ลบสำเร็จ'
                        }).then((result) => {
                            window.location.reload();


                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: res.data
                        })

                    }

                });
            }
        })
    }

    /*-------------------------------- go to check in -------------------------*/

    $scope.gotoCI = function (data) {
       // console.log(data)

        var data1 = JSON.stringify(data)
        var go_to_url = '/Book/CheckIn';
        var new_url = go_to_url + '?data=' + data1;
        window.location.href = new_url
    }

});
