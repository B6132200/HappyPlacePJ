'use strict';

myApp.controller('setupCheckInController', function ($scope, $http) {

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

    /*---------------- set detail --------------------*/
    $scope.dataRoom = {}
    $scope.tenant = {};
    $scope.tenant.room = ''
    $scope.tenant.tn = ''

    $(function () {
        $('#room').change(function () {
            var f = document.getElementById("room").value
            f = parseInt(f)
            

            for (var i = 0; i < $scope.listRoom.length; i++) {
                if ($scope.listRoom[i].id == f) {
                    $scope.water = $scope.listRoom[i].waterRate;
                    $scope.tenant.room = $scope.listRoom[i].id;

                    const randomId = function (length = 3) {
                        return Math.random().toString(36).substring(2, length + 2);
                    };

                   
                    $scope.tenant.tn = 'T' + $scope.listRoom[i].name + '-' + $scope.tnY + randomId()

                    document.getElementById("tn").value = $scope.tenant.tn

                    document.getElementById("status").value = $scope.listRoom[i].statuses.name
                    
                    document.getElementById("facilities").value = $scope.listRoom[i].facilities
                    document.getElementById("roomRate").value = $scope.listRoom[i].roomRate
                    document.getElementById("waterRate").value = $scope.listRoom[i].waterRate
                    document.getElementById("electricRate").value = $scope.listRoom[i].electricRate
                    document.getElementById("deposit").value = $scope.listRoom[i].deposit
                    document.getElementById("rentInAdvance").value = $scope.listRoom[i].rentInAdvance
                    document.getElementById("lease").value = $scope.listRoom[i].lease

                    break;
                }
            }
            console.log($scope.dataRoom)
          
        })
    })

   
    /*------------------------------- set date now ------------------------------*/
    $(function () {
        var dateNow = document.getElementById('dateCI').valueAsDate = new Date();
        $scope.dateCI1 = dateNow
        $scope.tnY = dateNow.getFullYear()
        $scope.tnY = $scope.tnY % 100
       // console.log($scope.tnY % 100)
    })

    /*------------------------------- save Tenant ------------------------------*/
    
    $scope.tenant.gender = ''
    $scope.tenant.name = ''
    $scope.tenant.phone = ''
    $scope.tenant.address = ''
    $scope.tenant.total = ''
    $scope.tenant.emeterStart = ''
    

    $scope.checkGender = function (val) {
        console.log(val)
        $scope.tenant.gender = val
       
    }

    $scope.SaveTenant = function () {
        
        $scope.tenant.waterBill = $scope.water * $scope.tenant.total
       
      //  console.log($scope.dateCI1)
        var currentDate = $scope.dateCI1
        var month = currentDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var dateOfMonth = currentDate.getDate();
        if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
        var year = currentDate.getFullYear();
        var formattedDate = dateOfMonth + "/" + month + "/" + year;
        $scope.tenant.dateCI = formattedDate

        
        var check = validateTenant($scope.tenant);
        if (check == 1) {
            $http({
                method: 'POST',
                url: baseUrl + 'CheckIn/SaveTenant',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.tenant,
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
    function validateTenant(tenant) {
        var check = 0;

        if (tenant.room == '') {
            $("#errmsgRoom").html("* เลือกห้อง").show()
            check = 1
        }
        else {
            $("#errmsgRoom").html("* เลือกห้อง").hide()
        }
        if (tenant.gender == '') {

            $("#errmsgGender").html("* เลือกเพศ").show()
            check = 1
        }
        else {
            $("#errmsgGender").html("* เลือกเพศ").hide()

        }
        if (tenant.name == '') {
            $("#errmsgName").html("* ใส่ข้อมูลชื่อ").show()
            check = 1
        }
        else {
            $("#errmsgName").html("* ใส่ข้อมูลชื่อ").hide()

        }
       
        if (tenant.phone == '' || tenant.phone.length < 10 || tenant.phone.length > 10) {
            
            $("#errmsgPhone").html("* ใส่หมายเลขโทรศัพท์สิบหลัก").show()
            check = 1
        }
        else {
            $("#errmsgPhone").html("* ใส่หมายเลขโทรศัพท์สิบหลัก").hide()

        }
      
        if (tenant.age == '' || tenant.age == undefined) {

            $("#errmsgAge").html("* อายุต้อง 20 ปีขึ้นไป").show()
            check = 1
        }
        else {
            $("#errmsgAge").html("* อายุต้อง 20 ปีขึ้นไป").hide()

        }
        if (tenant.address == '') {
            $("#errmsgAddress").html("* ใส่ข้อมูลที่อยู่").show()
            check = 1
        }
        else {
            $("#errmsgAddress").html("* ใส่ข้อมูลที่อยู่").hide()

        }
        if (tenant.total == '' || tenant.total == undefined) {
           
            $("#errmsgTotal").html("* ต้องมากกว่า 0").show()
            check = 1
        }
        else {
            $("#errmsgTotal").html("* ต้องมากกว่า 0").hide()

        }
        if (tenant.emeterStart == '' || tenant.emeterStart == undefined) {
            $("#errmsgEmeter").html("* ต้องมากกว่า 0").show()
            check = 1
        }
        else {
            $("#errmsgEmeter").html("* ต้องมากกว่า 0").hide()

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

    $(function () {
        $("#age").keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                $("#errmsgAge").html(" * ต้องเป็นตัวเลข").stop().show().delay(500).fadeOut();

            }

        });
    });

    $scope.reset = function () {
        window.location.reload();
    }


    
   
})