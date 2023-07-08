'use strict';

myApp.controller('setupBookController', function ($scope, $http) {

    $scope.random = Math.random();

    $scope.init = function () {
        $scope.GetFloorList();
    }

    /*-------------------- function Get ----------------------------*/

    $scope.GetFloorList = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'Room/GetFloorList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {
            $scope.FloorList = res.data;
            //console.log($scope.FloorList)

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*-------------------------- Get Room ----------------------------*/
    document.getElementById("room").disabled = true;
    $(function () {
        $('#floor').change(function () {
            var f = document.getElementById("floor").value
            f = parseInt(f)
            // console.log(f)
            $scope.GetRoomIF(f)
            document.getElementById("room").disabled = false;

            document.getElementById("facilities").value = ''
            document.getElementById("roomRate").value = ''
            document.getElementById("waterRate").value = ''
            document.getElementById("electricRate").value = ''
            document.getElementById("deposit").value = ''
            document.getElementById("rentInAdvance").value = ''
            document.getElementById("lease").value = ''

        })
    })

    $scope.GetRoomIF = function (f) {
        // console.log(f)
        $http({
            method: 'GET',
            url: baseUrl + 'Room/GetRoom',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                idFloor: f
            }

        }).then(function successCallback(res) {
            $scope.Room = res.data;
            var c = -1;
            var listroom = []
            for (var i = 0; i < $scope.Room.length; i++) {
                if ($scope.Room[i].statuses.name == 'ว่าง') {
                    c++;
                    listroom[c] = $scope.Room[i]

                }
            }
            $scope.listRoom = listroom
            // console.log(listroom)


        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*---------------- Get Status --------------------*/
    $scope.dataRoom = {}
    $scope.book = {};
    $scope.book.room = ''
    var roomRate = 0;
    var deposit = 0;

    $(function () {
        $('#room').change(function () {
            var f = document.getElementById("room").value
            f = parseInt(f)


            for (var i = 0; i < $scope.listRoom.length; i++) {
                if ($scope.listRoom[i].id == f) {
                  
                    $scope.book.room = $scope.listRoom[i].id;

                    document.getElementById("status").value = $scope.listRoom[i].statuses.name

                    document.getElementById("facilities").value = $scope.listRoom[i].facilities
                    document.getElementById("roomRate").value = $scope.listRoom[i].roomRate
                    roomRate = $scope.listRoom[i].roomRate
                    document.getElementById("waterRate").value = $scope.listRoom[i].waterRate
                    document.getElementById("electricRate").value = $scope.listRoom[i].electricRate
                    document.getElementById("deposit").value = $scope.listRoom[i].deposit
                    deposit = $scope.listRoom[i].deposit
                    document.getElementById("rentInAdvance").value = $scope.listRoom[i].rentInAdvance
                    document.getElementById("lease").value = $scope.listRoom[i].lease

                    break;
                }
            }
          //  console.log($scope.dataRoom)

        })
    })

    /*------------------------------- set date now ------------------------------*/
    $(function () {
        var dateNow = document.getElementById('dateB').valueAsDate = new Date();
        $scope.dateB1 = dateNow
    })

    /*------------------------------- set entrance fee ------------------------------*/

    $(function () {
        $("#deposit1").blur(function () {
           // console.log(document.getElementById("deposit1").value)
            var depoB = parseInt(document.getElementById("deposit1").value)
            document.getElementById("entranceFee").value = (roomRate + deposit) - depoB

            $scope.book.entranceFee = (roomRate + deposit) - depoB
        });
    });

    /*------------------------------- save Tenant ------------------------------*/

    $scope.book.gender = ''
    $scope.book.name = ''
    $scope.book.phone = ''
    $scope.book.deposit = ''
    $scope.book.entranceFee = ''
    $scope.book.dateCI = ''


    $scope.checkGender = function (val) {
      //  console.log(val)
        $scope.book.gender = val

    }

    $scope.SaveBook = function () {
      //  console.log($scope.book.deposit)
       

        //  console.log($scope.dateCI1)
        if ($scope.dateCI1 != null) {
            

            var currentDate = $scope.dateCI1
            var month = currentDate.getMonth() + 1;
            if (month < 10) month = "0" + month;
            var dateOfMonth = currentDate.getDate();
            if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
            var year = currentDate.getFullYear();
            var formattedDate = dateOfMonth + "/" + month + "/" + year;
            $scope.book.dateCI = formattedDate
        }

        var currentDate = $scope.dateB1
        var month = currentDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var dateOfMonth = currentDate.getDate();
        if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
        var year = currentDate.getFullYear();
        var formattedDate = dateOfMonth + "/" + month + "/" + year;
        $scope.book.dateB = formattedDate
       


        var check = validateTenant($scope.book);
        if (check == 1) {
            $http({
                method: 'POST',
                url: baseUrl + 'Book/SaveBook',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.book,
            }).then(function (res) {
                if (res.data) {

                    Swal.fire({
                        icon: 'success',
                        title: 'บันทึกสำเร็จ'
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

    }

    /*------------------------- validate Tenant -------------------------*/
    function validateTenant(book) {
        var check = 0;

        if (book.room == '') {
            $("#errmsgRoom").html("* เลือกห้อง").show()
            check = 1
        }
        else {
            $("#errmsgRoom").html("* เลือกห้อง").hide()
        }
        if (book.gender == '') {

            $("#errmsgGender").html("* เลือกเพศ").show()
            check = 1
        }
        else {
            $("#errmsgGender").html("* เลือกเพศ").hide()

        }
        if (book.name == '') {
            $("#errmsgName").html("* ใส่ข้อมูลชื่อ").show()
            check = 1
        }
        else {
            $("#errmsgName").html("* ใส่ข้อมูลชื่อ").hide()

        }

        if (book.phone == '' || book.phone.length < 10 || book.phone.length > 10) {

            $("#errmsgPhone").html("* ใส่หมายเลขโทรศัพท์สิบหลัก").show()
            check = 1
        }
        else {
            $("#errmsgPhone").html("* ใส่หมายเลขโทรศัพท์สิบหลัก").hide()

        }
        if (book.deposit == '' || book.deposit == null) {
            $("#errmsgDeposit1").html("* ต้องมากกว่า 0").show()
            check = 1
        }
        else {
            $("#errmsgDeposit1").html("* ต้องมากกว่า 0").hide()

        }
        if (book.entranceFee == '') {
            $("#errmsgEntranceFee").html("* ต้องมากกว่า 0").show()
            check = 1
        }
        else {
            $("#errmsgEntranceFee").html("* ต้องมากกว่า 0").hide()

        }
        //if (book.dateCI == '') {
        //    $("#errmsgDateCI").html("* ใส่วันที่แจ้งเข้า").show()
        //    check = 1
        //}
        //else {
        //    $("#errmsgDateCI").html("* ใส่วันที่แจ้งเข้า").hide()

        //}
        var dateNow = new Date();
        if (dateNow >= $scope.dateCI1 || book.dateCI == '') {
            if (book.dateCI == '') {
                $("#errmsgDateCI").html("* ใส่วันที่แจ้งเข้า").show()
            }
            else {
                $("#errmsgDateCI").html("* วันที่แจ้งเข้าต้องเป็นอนาคต").show()
            }
           
            check = 1
        }
        else {
            $("#errmsgDateCI").html("* วันที่แจ้งเข้าต้องเป็นอนาคต").hide()
        }
            

        return check == 0 ? 1 : 0

    }

    /*---------------------------------- Validate Phone , Emeter ---------------------------------------*/
    $(function () {
        $("#phone").keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                $("#errmsgPhone").html(" * ต้องเป็นตัวเลข").stop().show().delay(500).fadeOut();

            }

        });
    });


    /*------------------------------- reset ------------------------------*/

    $scope.reset = function () {
        window.location.reload();
    }

    /*--------------------------- back to index -------------------------*/
    $scope.backtoIndex = function () {
       
        window.location.href = '/Book/Index'
    }
});