'use strict';

myApp.controller('setupRoomController', function ($scope, $http) {

    $scope.random = Math.random();
    $scope.init = function () {

        $scope.GetFloorList();
        $scope.GetStatusList();
        $scope.GetRoomList();
        $scope.GetTenantList();
    }


    $scope.floor = {}
    $scope.room = {}

    /*-------------------- function Post ----------------------------*/

    $scope.SaveFloor = function (f) {
        var check = validateName();
        //console.log(check)
        // var check = 1
        if (check == 1) {

            $http({
                method: 'POST',
                url: baseUrl + 'Room/SaveFloor',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.floor,
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
        else {
            $("#errmsgFloor").html("* ชื่อต้องไม่ซ้ำ").show()
        }


    };

    //  $scope.default = {}

    $scope.SaveRoom = function (r) {

        $scope.dataRoom = r
        console.log(r)
        var check = validateRoom(r)
        if (check == 1) {

            $http({
                method: 'POST',
                url: baseUrl + 'Room/SaveDefault',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.dataRoom
            }).then(function (res) {
                $http({
                    method: 'POST',
                    url: baseUrl + 'Room/SaveRoom',
                    random: $scope.random,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: $scope.dataRoom,
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
            })

        }
    }

    $scope.SaveRoomAuto = function (amount, dataD) {
        /* var amount1 = amount.toString();*/
        //  console.log(amount)
        //  console.log(dataD)
        $http({
            method: 'POST',
            url: baseUrl + 'Room/SaveRoomAuto',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                amount: amount
            },

            data: dataD,


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

    $scope.GetDefault = function (f, a) {
        console.log(f)
        $http({
            method: 'GET',
            url: baseUrl + 'Room/GetDefault',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                idFloor: f
            }

        }).then(function successCallback(res) {
            $scope.Default = res.data;
            // console.log($scope.Default)
            $scope.SaveRoomAuto(a, $scope.Default)


        }, function errorCallback(err) {
            console.log(err.data);
        });
    };



    $scope.GetStatusList = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'Status/GetStatusList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {
            $scope.StatusList = res.data;
            //console.log($scope.FloorList)

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    $scope.GetRoomList = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'Room/GetRoomList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {
            $scope.listRoom = res.data;

            // console.log($scope.listRoom)

            $scope.roomSort();

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    $scope.GetTenantList = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'CheckIn/GetTenantList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {
            $scope.listTenant = res.data;
            // console.log($scope.listTenant)

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*-------------------- function sort data list ------------------------*/
    $scope.listRoomS = {}
    let list = [];
    let listCount = [];

    $scope.roomSort = function () {


        var r = -1;
        // console.log($scope.FloorList.length)
        for (var i = 0; i < $scope.FloorList.length; i++) {
            // f++;
            list[i] = [];

            for (var j = 0; j < $scope.listRoom.length; j++) {

                if ($scope.FloorList[i].id == $scope.listRoom[j].floor) {
                    // console.log($scope.listRoom[j].id)
                    r++;

                    list[i][r] = $scope.listRoom[j]

                }
                else {

                }


            }
            r = -1;
            listCount[i] = list[i].length


        }
        //  console.log(listCount)
        //console.log(f)
    }

    /*----------------------- set BG button --------------------*/
    $scope.setBG = function (s, idb) {
        //  console.log(s, idb)
        if (s == 'ว่าง') {
            $("#RR" + idb).addClass('btn-bg-success')

        }
        if (s == 'ไม่ว่าง') {
            $("#RR" + idb).addClass('btn-bg-primary')

        }
        if (s == 'จอง') {
            $("#RR" + idb).addClass('btn-bg-warning')
        }

        return true
    }

    /*------------------ Get Data in Sort -----------------------*/

    $scope.GetroomSort = function (id) {
        $scope.listRoomS = list[id]

        return true;
    }

    $scope.GetroomSort1 = function (id) {
        $scope.listRoomSE = list[id]

    }

    function GetCountList(fid) {
        var count = listCount[fid - 1]
        // console.log(count)
        return count;
    }


    /*-------------------- Validate ----------------------------*/

    function validateName() {
        var f = document.getElementById("floor").value;
        var ef = document.getElementById("efloor").value;
        //console.log(f)
        //console.log(ef)

        var check = 1
        if (f != '') {
            for (var i = 1; i < $scope.FloorList.length; i++) {
                if (f == $scope.FloorList[i].name) {
                    check = 0;
                    break;
                }
            }
        }
        else if (ef != '') {
            for (var i = 1; i < $scope.FloorList.length; i++) {
                if (ef == $scope.FloorList[i].name) {
                    check = 0;
                    break;
                }
            }

        }

        return check == 1 ? 1 : 0;
        /* return 1;*/

    }

    function validateRoom(r) {
        // console.log(r)
        var check = 0
        if (r.RoomRate == null) {
            $("#errmsgRoomRate").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1

        }
        if (r.WaterRate == null) {
            $("#errmsgWaterRate").html("* ต้องไม่ต่ำกว่า 50").show()
            check = 1

        }
        if (r.ElectricRate == null) {
            $("#errmsgElectricRate").html("* ต้องไม่ต่ำกว่า 1").show()
            check = 1

        }
        if (r.Deposit == null) {
            $("#errmsgDeposit").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1

        }
        if (r.RentInAdvance == null) {
            $("#errmsgRentInAdvance").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1

        }
        if (r.Lease == null) {
            $("#errmsgLease").html("* ต้องมากกว่าหรือเท่ากับ 0").show()
            check = 1

        }

        for (var i = 0; i < $scope.listRoom.length; i++) {
            // console.log($scope.listRoom[i].name)
            if (r.Name == $scope.listRoom[i].name) {
                $("#errmsgRName").html("* ชื่อต้องไม่ซ้ำ").show()
                check = 1

                break;
            }

        }

        return check == 0 ? 1 : 0
    }

    function validateRoom1(r) {
        console.log(r)
        var check = 0
        if (r.roomRate == null) {
            $("#errmsgRoomRate").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1
            console.log(check)
        }
        if (r.waterRate == null) {
            $("#errmsgWaterRate").html("* ต้องไม่ต่ำกว่า 50").show()
            check = 1
            console.log(check)

        }
        if (r.electricRate == null) {
            $("#errmsgElectricRate").html("* ต้องไม่ต่ำกว่า 1").show()
            check = 1
            console.log(check)
        }
        if (r.deposit == null) {
            $("#errmsgDeposit").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1
            console.log(check)
        }
        if (r.rentInAdvance == null) {
            $("#errmsgRentInAdvance").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1
            console.log(check)
        }
        if (r.lease == null) {
            $("#errmsgLease").html("* ต้องมากกว่าหรือเท่ากับ 0").show()
            check = 1
            console.log(check)
        }

        //for (var i = 0; i < $scope.listRoom.length; i++) {
        //    // console.log($scope.listRoom[i].name)
        //    if (r.name == $scope.listRoom[i].name) {
        //        $("#errmsgRName").html("* ชื่อต้องไม่ซ้ำ").show()
        //        check = 1
        //        console.log(check)
        //        break;
        //    }

        //}

        return check == 0 ? 1 : 0
    }

    function validateEditRoom(r, t) {
        var check = 0
        if (t.phone == null || t.phone.length < 10 || t.phone.length > 10) {

            $("#errmsgEPhone").html("* ใส่หมายเลขโทรศัพท์สิบหลัก").show()
            check = 1
        }
        if (t.total == null) {
            $("#errmsgETotal").html("* ต้องมากกว่า 0").show()
            check = 1
        }
        if (r.roomRate == null) {
            $("#errmsgERoomRate").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1
        }
        if (r.roomRate == null) {
            $("#errmsgERoomRate").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1
        }
        if (r.waterRate == null) {
            $("#errmsgEWaterRate").html("* ต้องไม่ต่ำกว่า 50").show()
            check = 1
        }
        if (r.electricRate == null) {
            $("#errmsgEElectricRate").html("* ต้องไม่ต่ำกว่า 1").show()
            check = 1
        }
        if (r.deposit == null) {
            $("#errmsgEDeposit").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1
        }
        if (r.rentInAdvance == null) {
            $("#errmsgERentInAdvance").html("* ต้องไม่ต่ำกว่า 1000").show()
            check = 1
        }
        if (r.lease == null) {
            $("#errmsgELease").html("* ต้องมากกว่าหรือเท่ากับ 0").show()
            check = 1
        }

        for (var i = 0; i < $scope.listRoom.length; i++) {
            if (r.id != $scope.listRoom[i].id) {
                if (r.name == $scope.listRoom[i].name) {
                    $("#errmsgERName").html("* ชื่อต้องไม่ซ้ำ").show()
                    check = 1
                    break;
                }
            }


        }

        return check == 0 ? 1 : 0
    }

    function validateEditRoom1(r) {
        var check = 0

        if (r.waterRate == null) {
            $("#errmsgEAWaterRate").html("* ต้องไม่ต่ำกว่า 50").show()
            check = 1
        }
        if (r.electricRate == null) {
            $("#errmsgEAElectricRate").html("* ต้องไม่ต่ำกว่า 1").show()
            check = 1
        }

        if (r.lease == null) {
            $("#errmsgEALease").html("* ต้องมากกว่าหรือเท่ากับ 0").show()
            check = 1
        }

        return check == 0 ? 1 : 0
    }

    function validateEditRIF(r) {
        var check = 0
        if ($('#rr').is(':checked')) {
            if (r.roomRate == null) {
                $("#errmsgRIFRoomRate").html("* ต้องไม่ต่ำกว่า 1000").show()
                check = 1
            }
        }
        if ($('#deposit').is(':checked')) {
            if (r.deposit == null) {
                $("#errmsgRIFDeposit").html("* ต้องไม่ต่ำกว่า 1000").show()
                check = 1
            }
        }


        return check == 0 ? 1 : 0
    }

    /*---------------------------- save Edit  -----------------------*/

    $scope.SaveEditFloor = function (f) {
        var check = validateName();
        //console.log(check)
        // var check = 1
        if (check == 1) {
            $http({
                method: 'POST',
                url: baseUrl + 'Room/SaveEditFloor',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.editfloor,
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
        else {
            $("#errmsgEFloor").html("* ชื่อต้องไม่ซ้ำ").show()
        }


    };

    $scope.SaveEditRoom = function (er, et) {
        // console.log(er + ' ' + et)
        $scope.etenant = et
        if (et == undefined) {

            var check = validateRoom1(er)
            console.log(check)
            var check = 1
            if (check == 1) {
                $http({
                    method: 'POST',
                    url: baseUrl + 'Room/SaveEditRoom',
                    random: $scope.random,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: $scope.Eroom,



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
        else {
            var check = validateEditRoom(er, et);
            //console.log('hi')
            var check = 1
            if (check == 1) {
                $http({
                    method: 'POST',
                    url: baseUrl + 'Room/SaveEditRandT',
                    random: $scope.random,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: $scope.Eroom,
                    params: {
                        phone: $scope.etenant.phone,
                        total: $scope.etenant.total,
                    },

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

        
    }

    $scope.SaveEditRoomAll = function (er) {
        var check = validateEditRoom1(er);
        // console.log($scope.EAroom)
        if (check == 1) {
            $http({
                method: 'POST',
                url: baseUrl + 'Room/SaveEditRoomAll',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.EAroom,
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
    $scope.eRIF = {}
    var Gname = []

    $scope.SaveEditRIF = function (eRIF) {

        var G = -1;

        // console.log($('#All').is(':checked'))
        if ($('#All').is(':checked')) {
            for (var i = 0; i < $scope.listRoomSE.length; i++) {

                Gname[i] = $scope.listRoomSE[i].name
            }
        }
        else {
            for (var i = 0; i < $scope.listRoomSE.length; i++) {
                var ch = $('#R' + i).is(':checked')
                // console.log(ch)
                if (ch == true) {

                    G++
                    Gname[G] = $scope.listRoomSE[i].name
                }
            }
            if (Gname == '') {
                $("#errmsgCheckRoom").html("* กรุณาเลือกห้องพัก").show()

            }
            else {
                $("#errmsgCheckRoom").html("* กรุณาเลือกห้องพัก").hide()

            }

        }

        if ($('#facilities').is(':checked')) {
            if ($scope.listRoomSE[0].facilities == '') {
                $scope.listRoomSE[0].facilities = eRIF.facilities
            }
            else {
                $scope.listRoomSE[0].facilities = $scope.listRoomSE[0].facilities + ' , ' + eRIF.facilities

            }
        }
        if ($('#rr').is(':checked')) {
            $scope.listRoomSE[0].roomRate = eRIF.roomRate
            $scope.listRoomSE[0].rentInAdvance = eRIF.roomRate
        }
        if ($('#deposit').is(':checked')) {
            $scope.listRoomSE[0].deposit = eRIF.deposit

        }
        $scope.data = $scope.listRoomSE[0]

        var check = validateEditRIF($scope.data)

        if (check == 1 && Gname != '') {
            $http({
                method: 'POST',
                url: baseUrl + 'Room/SaveEditRIF',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    gname: Gname
                },

                data: $scope.data,


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


    /*----------------------------- Open Modal --------------------*/
    $scope.OpenModalFloor = function () {
        $('#ModalFloor').modal('show')
    }


    $scope.editFloor = function (id) {
        // console.log(id)
        for (var i = 0; i <= $scope.FloorList.length; i++) {
            if (id == $scope.FloorList[i].id) {
                $scope.editfloor = $scope.FloorList[i];
                $('#ModalFloorEdit').modal('show')
                break;
            }
        }

    }

    $scope.OpenModalRoom = function (id) {
        // console.log(id)
        $scope.idfloor = id
        var count = 0;
        console.log()
        if ($scope.listRoom.length == null) {
            var c = 1;

            var rNext = c;
            rNext = rNext.toString()
            var idf = $scope.idfloor.toString()
            rNext = rNext.padStart(2, "0");
            $scope.room.Name = idf + rNext;

            $scope.room.Floor = id;

            $('#ModalRoom').modal('show')

            var s = document.getElementById("status").value
            $scope.room.Status = parseInt(s)
        }
        else {
            for (var i = 0; i < $scope.listRoom.length; i++) {
                if (id == $scope.listRoom[i].floor) {
                    $('#ModalRunRoom').modal('show')
                    count = 1;
                    break;
                }

            }
            if (count == 0) {
                var c = 0;
                for (var i = 0; i < $scope.listRoom.length; i++) {
                    if ($scope.idfloor == $scope.listRoom[i].floor) {
                        c = c + 1
                    }
                }
                c = c + 1
                var rNext = c;
                rNext = rNext.toString()
                var idf = $scope.idfloor.toString()
                rNext = rNext.padStart(2, "0");
                $scope.room.Name = idf + rNext;

                $scope.room.Floor = id;

                $('#ModalRoom').modal('show')

                var s = document.getElementById("status").value
                $scope.room.Status = parseInt(s)
            }
        }


    }




    $scope.ShowAndEdit = function (id, index, fid) {
        $('#delRoom').hide()
        $('#dataTenant').hide();
        // console.log(id)
        for (var i = 0; i < $scope.listRoom.length; i++) {
            if (id == $scope.listRoom[i].id) {
                $scope.Eroom = $scope.listRoom[i];
                console.log($scope.Eroom)
                $('#ModalEditRoom').modal('show')
                break;
            }
        }
        for (var j = 0; j < $scope.listTenant.length; j++) {
            if (id == $scope.listTenant[j].room) {
                $scope.tenant = $scope.listTenant[j]

                $('#dataTenant').show();
            }
        }
        var last = GetCountList(fid);
        if (last == index) {
            $('#delRoom').show()
        }
        // console.log(last)

    }

    $scope.editRoomAll = function () {
        $scope.EAroom = $scope.listRoom[0];

        $('#ModalEditRoomAll').modal('show')
    }

    $scope.OpenModalEditRinF = function (fid) {
        $scope.GetroomSort1(fid - 1)
        $('#ModalEditRinF').modal('show')
    }

    /*------------------------ function delete ------------------------*/
    $scope.DelRoom = function (data) {

        Swal.fire({
            title: 'ต้องการลบห้องพักใช่หรือไม่ ?',
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
                    url: baseUrl + 'Room/DeleteRoom',
                    random: $scope.random,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data,
                }).then(function (res) {
                    if (res.data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'ลบสำเร็จ',
                            allowOutsideClick: false,
                        }).then((result) => {
                            window.location.reload();
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: res.data,
                            allowOutsideClick: false,
                        })

                    }
                });
            } else {
                $scope.GetPeriod();
            }
        })

    }

    /*----------------------------- function extra ---------------------------*/
    $(function () {
        $("#roomRate").blur(function () {
            document.getElementById("rentInAdvance").value = document.getElementById("roomRate").value

            $scope.room.RentInAdvance = parseInt(document.getElementById("rentInAdvance").value)
        });
    });

    $scope.resect = function () {
        window.location.reload();
    }


    $('#formnumroom').hide();

    $scope.checkRunRoom = function (cr) {
        console.log(cr)
        if (cr == 'yes') {
            $('#formnumroom').show();
        }
        else {
            $('#formnumroom').hide();
        }

    }


    $scope.checkAll = function () {

        if ($('#All').is(':checked')) {
            for (var i = 0; i < $scope.listRoomSE.length; i++) {
                document.getElementById("R" + i).checked = true;
            }


        }
        else {
            for (var i = 0; i < $scope.listRoomSE.length; i++) {
                document.getElementById("R" + i).checked = false;
            }


        }

    }

    $('#IPfacilities').hide();
    $('#IPrr').hide();
    $('#IPdeposit').hide();

    $(function () {
        $("#facilities").click(function () {
            if ($('#facilities').is(':checked')) {
                $('#IPfacilities').show();
            }
            else {
                $('#IPfacilities').hide();
            }
        })
        $("#rr").click(function () {

            if ($('#rr').is(':checked')) {

                $('#IPrr').show();
            }
            else {
                $('#IPrr').hide();
            }
        })
        $("#deposit").click(function () {
            if ($('#deposit').is(':checked')) {
                $('#IPdeposit').show();
            }
            else {
                $('#IPdeposit').hide();
            }
        })
    })

    /*----------------------------- function room auto ---------------------------*/
    $scope.runRoom = function (n) {
        if (n == null) {
            $('#ModalRunRoom').modal('hide')
            var c = 0;
            for (var i = 0; i < $scope.listRoom.length; i++) {
                if ($scope.idfloor == $scope.listRoom[i].floor) {
                    c = c + 1
                }
            }
            c = c + 1
            var rNext = c;
            rNext = rNext.toString()
            var idf = $scope.idfloor.toString()
            rNext = rNext.padStart(2, "0");
            $scope.room.Name = idf + rNext;

            $scope.room.Floor = $scope.idfloor;

            $('#ModalRoom').modal('show')

            var s = document.getElementById("status").value
            $scope.room.Status = parseInt(s)
        }
        else {
            $scope.GetDefault($scope.idfloor, n);
        }

    }

});