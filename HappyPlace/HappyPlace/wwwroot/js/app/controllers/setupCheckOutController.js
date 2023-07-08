'use strict';

myApp.controller('setupCheckOutController', function ($scope, $http) {

    $scope.random = Math.random();

    $scope.init = function () {
        $scope.GetCheckOutList();
        $scope.GetFloorList();
    }

    /*--------------------  Get Checkout ----------------------------*/

    $scope.GetCheckOutList = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'CheckOut/GetCheckOutList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {
            $scope.CheckOutList1 = res.data;
            //console.log($scope.CheckOutList)
            for (var x = 0; x < $scope.CheckOutList1.length; x++) {
                const date = $scope.CheckOutList1[x].dateOut.split('/')
                var d = date[0]
                var m = date[1]
                var y = date[2]
                var dateS = y + '-' + m + '-' + d

                $scope.CheckOutList1[x].dateOut = new Date(dateS)

               
            }
            $scope.CheckOutList = $scope.CheckOutList1

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*--------------------  Get floor ----------------------------*/

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
    $scope.room = "0"
    document.getElementById("room").disabled = true;
    $(function () {
        $('#floor').change(function () {
            var f = document.getElementById("floor").value
            f = parseInt(f)
            // console.log(f)
            $scope.GetRoomIF(f)

            $scope.room = "0"
            document.getElementById("room").disabled = false;

            //document.getElementById("tenant").value = ''
            //document.getElementById("dateCI").value = ''
            //document.getElementById("lease").value = ''
            $scope.dataRoom.tenant = ''
            $scope.dataRoom.dateCI = ''
            $scope.dataRoom.lease = ''
            $scope.dataRoom.dateCO = ''
            $scope.dataRoom.room = ''

        })
    })

    $scope.GetRoomIF = function (f) {
        // console.log(f)
        $http({
            method: 'GET',
            url: baseUrl + 'CheckOut/GetRoomList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                idFloor: f
            }

        }).then(function successCallback(res) {
            $scope.listRoom = res.data;
            console.log($scope.listRoom)

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*---------------- set detail --------------------*/

    $scope.setDetail = function () {

        var r = $scope.room
        r = parseInt(r)
        console.log(typeof r)

        for (var i = 0; i < $scope.listRoom.length; i++) {
            if ($scope.listRoom[i].room == r) {
                //document.getElementById("tenant").value = $scope.listRoom[i].name
                //document.getElementById("dateCI").value = $scope.listRoom[i].dateCI
                //document.getElementById("lease").value = $scope.listRoom[i].rooms.lease
                $scope.dataRoom.tenant = $scope.listRoom[i].name
                $scope.dataRoom.dateCI = $scope.listRoom[i].dateCI
                $scope.dataRoom.lease = $scope.listRoom[i].rooms.lease
                $scope.dataRoom.room = $scope.listRoom[i].room
                $scope.dataRoom.tenantId = $scope.listRoom[i].id


            }
        }
    }

    /*----------------------- open modal add ----------------------------*/
    $scope.OpenModalAdd = function () {
        $('#ModalAddCO').modal('show')
    }



    /*------------------------- save check out ------------------------------*/
    $scope.dataRoom = {}
    $scope.data = {}
    $scope.dateCO = ''

    $scope.saveCO = function () {


        var currentDate = $scope.dateCO
        var month = currentDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var dateOfMonth = currentDate.getDate();
        if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
        var year = currentDate.getFullYear();
        var formattedDate = dateOfMonth + "/" + month + "/" + year;
        $scope.dataRoom.dateCO = formattedDate


        $scope.data.id = $scope.dataRoom.tenantId
        $scope.data.room = $scope.dataRoom.room
        $scope.data.dateOut = $scope.dataRoom.dateCO

        console.log($scope.data)

        $http({
            method: 'POST',
            url: baseUrl + 'CheckOut/SaveCO',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
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

    /*---------------------------- add and show detail --------------------- */
    $scope.tid = ''

    $scope.OpenModalDetail = function (tid, index) {

        $scope.tid = tid
        /* $scope.GetBillDateOut(tid, index)*/
        $scope.GetDetailCO(tid, index);
        $scope.deposit = $scope.CheckOutList[index].rooms.deposit
        
        $('#ModalDetail').modal('show')

       
        // console.log(tid)
    }

    /*---------------------------- add td ---------------------------------- */
    $scope.Addtd = function () {
        var rowCount = $('#tDetail tr').length
        // console.log(rowCount)
        var table = document.getElementById('tDetail')
        var row = table.insertRow(rowCount)
        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1)
        var cell2 = row.insertCell(2)
        var cell3 = row.insertCell(3)
        cell0.innerHTML = ' <spen class="text-dark ">' + (rowCount + 1) + '</spen>'
        cell1.innerHTML = '<input class="td-input0" type="text" />'
        cell2.innerHTML = '<input class="td-input1 text-center" type="text" id="c2' + (rowCount + 1) + '" onblur="setTotal()"/>'
        cell3.innerHTML = '<span type="button" class="td-del" onclick="remove(this)" ><i class="bi bi-dash-circle-fill" style="color: #b16060; font-size: 1.45rem;"></i></span>'
    }

    /*----------------------------------- total amount -----------------------*/
    $scope.fine = 0

    window.setTotal = function () {
        console.log('hi')
        var rowCount = $('#tDetail tr').length
       // console.log(rowCount)
        var totalAmount = 0
        for (var i = 0; i < rowCount; i++) {
            var amount = document.getElementById('tDetail').rows[i].cells[2].children[0].value
            if (amount == '') {
                amount = "0"
            }
            totalAmount = totalAmount + parseInt(amount)

        }
        document.getElementById('total').innerHTML = totalAmount
        $scope.fine = totalAmount
    }

    //$scope.setTotal1 = function () {
    //    var rowCount = $('#tDetail tr').length
    //   // console.log(rowCount)
    //    var totalAmount = 0
    //    for (var i = 0; i < rowCount; i++) {
    //        var amount = document.getElementById('tDetail').rows[i].cells[2].children[0].value
    //        console.log('hi')
    //        if (amount == '') {
    //            amount = "0"
    //        }
    //        totalAmount = totalAmount + parseInt(amount)

    //    }
    //    document.getElementById('total').innerHTML = totalAmount
    //    $scope.fine = totalAmount
    //}

    /*----------------------------------- remove row ------------------------ */
    

    window.remove = function (row) {
        console.log(row.parentNode.parentNode)
        row.parentNode.parentNode.remove();
        window.setTotal();
    }

    $scope.detailRemove = []

    $scope.remove = function (index) {
        var data = $scope.listDetail[index]
        var am = $scope.listDetail[index].amount
        $scope.detailRemove.push(data)
        $scope.listDetail.splice(index, 1)

        $scope.fine = $scope.fine - am;
        document.getElementById('total').innerHTML = $scope.fine
    }

 

    /*----------------------------------- save detail ----------------------- */

    $scope.saveDetail = function () {

        $scope.data = []

        var rowCount = $('#tDetail tr').length
        for (var i = 0; i < rowCount; i++) {

            $scope.data[i] = {}

            var dt = document.getElementById('tDetail').rows[i].cells[1].children[0].value

            $scope.data[i].detail = dt

            var am = document.getElementById('tDetail').rows[i].cells[2].children[0].value

            $scope.data[i].amount = parseInt(am)

            $scope.data[i].tenant = $scope.tid

        }
        for (var i = 0; i < $scope.listDetail.length; i++) {
            $scope.data[i].id = $scope.listDetail[i].id
        }
      //  console.log($scope.data)

        if ($scope.detailRemove != '') {
          //  console.log($scope.detailRemove)
            $http({
                method: 'POST',
                url: baseUrl + 'CheckOut/DelDetailCO',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    fine: $scope.fine,
                },
                data: JSON.stringify($scope.detailRemove),

            }).then(function (res) { })
        }

         

        $http({
            method: 'POST',
            url: baseUrl + 'CheckOut/SaveDetailCO',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                fine: $scope.fine,
            },
            data: JSON.stringify($scope.data),

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
        })


    }


    /*----------------------------------- edit date out --------------------------- */

    $scope.editDateCO = function (id, index) {

        document.getElementById('date' + index).disabled = false;

        $('#date' + index).blur(function () {
            var currentDate = $scope.CheckOutList[index - 1].dateOut
            var month = currentDate.getMonth() + 1;
            if (month < 10) month = "0" + month;
            var dateOfMonth = currentDate.getDate();
            if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
            var year = currentDate.getFullYear();
            var formattedDate = dateOfMonth + "/" + month + "/" + year;
            var dateCO = formattedDate
            console.log(typeof id, typeof dateCO)

            $http({
                method: 'POST',
                url: baseUrl + 'CheckOut/EditDateOut',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    Id: id,
                    DateOut: dateCO,
                },

            }).then(function (res) {
                if (res.data) {
                    window.location.reload();

                };
            });

            document.getElementById('date' + index).disabled = true;
        })
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
                document.getElementById('total').innerHTML = $scope.CheckOutList[index].fine
                $scope.fine = $scope.CheckOutList[index].fine
            }
            else {
                $scope.Addtd()
            }


        }, function errorCallback(err) {
            console.log(err.data);
        });
    }

    /*------------------------------- confirm checkout ---------------------- */
    $scope.Confirm = function (id) {
       // console.log(id)
        Swal.fire({
            title: 'ยืนยันการออกหอพัก',
            text: "",
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#1abb50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',

        }).then(function (result) {

            if (result.value) {
                $http({
                    method: 'POST',
                    url: baseUrl + 'CheckOut/ConfirmCO',
                    random: $scope.random,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        id: id
                    },
                }).then(function (res) {
                    if (res.data) {
                        window.location.reload();
                        
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

    /*---------------------------------- delete Checkout ---------------------*/
    $scope.DelCO = function (id) {
        Swal.fire({
            title: 'ต้องการลบรายการนี้ใช่หรือไม่ ?',
            text: "",
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่ใช่',

        }).then(function (result) {

            if (result.value) {
                $http({
                    method: 'POST',
                    url: baseUrl + 'CheckOut/DeleteCO',
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

    /*---------------------------------- reset ----------------------------- */
    $scope.reset = function () {

        window.location.reload();

    }

    /*----------------------------- open page record ---------------------------*/
    $scope.OpenPageRecord = function () {
        window.location.href = "/CheckOut/Record"
    }
})