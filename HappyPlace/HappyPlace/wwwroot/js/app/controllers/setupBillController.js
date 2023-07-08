'use strict';

myApp.controller('setupBillController', function ($scope, $http, $filter) {

    $scope.random = Math.random();

    $scope.init = function () {
        //$scope.GetYear();
        $scope.GetFloorList();
        $scope.GetMonthList();

        //   $scope.GetBillList();
        //   $scope.GetRoomList();

    }

    /*-------------------------------------- get floor -------------------------- */
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

    /*------------------------------- get year // get month ---------------------*/
    $scope.GetMonthList = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'Bill/GetMonthList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {
            $scope.monthList = res.data;
            $scope.selectMNow();


        }, function errorCallback(err) {
            console.log(err.data);
        });
    }

    var month = 0

    $('.date-own').datepicker({
        minViewMode: 2,
        format: 'yyyy'
    });

    $scope.monthNow = 0

    $(function () {
        var d = new Date()
        var m = d.getMonth() + 1;
        month = parseInt(m)
        $scope.monthNow = month
        $scope.year = d.getFullYear()
        $scope.year = $scope.year.toString()
        //  console.log($scope.year)
        $scope.GetBillList(month, $scope.year)
        // console.log(typeof month + ' ' + typeof $scope.year)
    })


    $(function () {
        $('#yearpk').change(function () {
            var mid = $scope.month
            mid = parseInt(mid)
            $scope.GetBillList(mid, $scope.year)

        })
    })

    $(function () {
        $('#selectMonth').change(function () {
            var mid = $scope.month
            mid = parseInt(mid)
            $scope.GetBillList(mid, $scope.year)
            // console.log(mid, $scope.year)
        })
    })


    /*----------------------- set month select ----------------------*/
    $scope.bill = {}
    $scope.month = ''


    $scope.selectMNow = function () {
        for (var i = 0; i < $scope.monthList.length; i++) {
            if ($scope.monthList[i].id == month) {
                var idS = $scope.monthList[i].id.toString()
                $scope.month = idS
                $scope.monthInt = parseInt(idS)
                // console.log($scope.bill.month)
            }
        }
    }



    /*----------------------- get list Bill ----------------------*/


    $scope.GetBillList = function (mid, year) {
        document.getElementById('nocard').hidden = true
        var currentDate = new Date()
        var m = currentDate.getMonth() + 1;
        var y = currentDate.getFullYear()

        if (m == mid && y == year) {
           // console.log('hi')
            $http({
                method: 'GET',
                url: baseUrl + 'Bill/GetBillList',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    mid: mid,
                    year: year,
                },

            }).then(function successCallback(res) {
                $scope.listBill = res.data;
                $scope.listBill1 = ''

                // console.log($scope.listBill)
                if ($scope.listBill == '') {
                    $scope.GetRoomList('noBill');
                    // console.log($scope.listBill)
                    document.getElementById('finish').hidden = true
                }
                else {
                    document.getElementById('finish').hidden = false

                    $scope.GetRoomList('haveBill');
                    $scope.listBill1 = $scope.listBill
                    $scope.oriListBill = $scope.listBill

                }

            }, function errorCallback(err) {
                console.log(err.data);
            });
        }
        else {
            console.log('hiii')
            $http({
                method: 'GET',
                url: baseUrl + 'Bill/GetBillList',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    mid: mid,
                    year: year,
                },

            }).then(function successCallback(res) {
                $scope.listBill = res.data;
                
                if ($scope.listBill == '') {
                    
                    document.getElementById('nocard').hidden = false
                    $scope.listBill1 = $scope.listBill
                }
                else {
                    document.getElementById('noBill').hidden = true
                    document.getElementById('finish').hidden = true

                    $scope.listBill1 = $scope.listBill
                    $scope.oriListBill = $scope.listBill
                    
                }

               

            }, function errorCallback(err) {
                console.log(err.data);
            });
        }

    };


    /*----------------------- get list room ----------------------*/
    $scope.listRoom1 = {}

    $scope.GetRoomList = function (key) {
        $http({
            method: 'GET',
            url: baseUrl + 'Bill/GetRoomList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(res) {
            $scope.listRoom = res.data;
            console.log($scope.listRoom)
            console.log(key)

            if (key === 'noBill') {
                //  $scope.GetBillListpastM(m - 1, year)
                document.getElementById('noBill').hidden = false
                $scope.listRoom1 = $scope.listRoom
                $scope.oriListRoom = $scope.listRoom
                $scope.setRoomBill();
            }
            else {
                // $scope.setRoomBill();
                //var currentDate = new Date()
                //var month = currentDate.getMonth() + 1;
                //var year = currentDate.getFullYear()

                //var date = $scope.listBill[0].date
                //const dateC = date.split('/')

                //var m = dateC[1]
                //var y = dateC[2]
                //m = parseInt(m)


                //  $scope.GetBillListpastM(m-1, year)
                //$scope.checkBill()
                if ($scope.listRoom.length == $scope.listBill.length) {
                    document.getElementById('noBill').hidden = true
                    document.getElementById('finish').hidden = true

                    $scope.listBill1 = $scope.listBill
                    $scope.oriListBill = $scope.listBill
                }
                else {
                    document.getElementById('noBill').hidden = false
                    console.log($scope.listBill)
                    var surplus = []

                    var length = $scope.listRoom.length
                    for (var i = 0; i < length; i++) {
                        var h = 0
                        for (var j = 0; j < $scope.listBill.length; j++) {
                            if ($scope.listRoom[i].room == $scope.listBill[j].room) {

                                h = h + 1
                            }
                        }
                        if (h == 0) {
                            surplus.push($scope.listRoom[i])
                        }
                    }
                    console.log(surplus)

                    $scope.listRoom1 = surplus
                    console.log($scope.listRoom1)
                    $scope.oriListRoom = $scope.listRoom
                    $scope.setRoomBill();

                }


            }

        }, function errorCallback(err) {
            console.log(err.data);
        });
    };



    /*----------------------- set room bill ------------------------------*/
    $scope.setRoomBill = function () {
        for (var i = 0; i < $scope.listRoom.length; i++) {
            var date = $scope.listRoom[i].dateCI
            const dateCI = date.split('/')
            var d = dateCI[0]
            var m = dateCI[1]
            var y = dateCI[2]
            if (parseInt(m) == month) {
                var day = parseInt(d) - 1
              //  console.log(day)
                let x = $scope.listRoom[i].rooms.roomRate / 30;
                x = parseInt(x)
              //  console.log(x)
                let p = day * x
              //  console.log(p)
                $scope.listRoom[i].rooms.roomRate = $scope.listRoom[i].rooms.roomRate - p


            }
            else {
                // $scope.listRoom[i].rooms.roomRate = $scope.listRoom[i].rooms.roomRate - p
            }

        }
    }


    /*------------------------------ set date bill ------------------------ */
    $(function () {
        var currentDate = new Date()
        var month = currentDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var dateOfMonth = currentDate.getDate();
        if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
        var year = currentDate.getFullYear();
        var formattedDate = dateOfMonth + "/" + month + "/" + year;
        $scope.date = formattedDate
        // console.log($scope.bill.date)
    })

    /*------------------------------ calculate bill ------------------------------*/

    $scope.Data = []
    var count = -1;


    $scope.CalBill = function (room, index) {
        $scope.bill = {}
        $('#EL' + room).blur(function () {
            var el = document.getElementById('EL' + room).value

            if (el != '') {
                el = parseInt(el)
                var amount = el - $scope.listRoom1[index - 1].emeterStart
                document.getElementById('amount' + room).innerHTML = amount.toString()
                console.log(amount + ' -- ' + el + " -- " + $scope.listRoom[index - 1].emeterStart)
                var eBill = amount * $scope.listRoom1[index - 1].rooms.electricRate
                document.getElementById('eBill' + room).innerHTML = eBill.toString()
                var rBill = $scope.listRoom1[index - 1].rooms.roomRate + $scope.listRoom[index - 1].waterBill + eBill
                //  document.getElementById('tbtBill' + room).innerHTML = rBill.toString()

                //  console.log(rBill)

                $scope.bill.roomBill = $scope.listRoom1[index - 1].rooms.roomRate
                $scope.bill.waterBill = $scope.listRoom1[index - 1].waterBill
                $scope.bill.elecBill = eBill
                $scope.bill.emeterStart = $scope.listRoom1[index - 1].emeterStart
                $scope.bill.emeterLast = el
                $scope.bill.totalBill = rBill
                $scope.bill.date = $scope.date

                $scope.bill.month = $scope.monthInt
                $scope.bill.room = $scope.listRoom1[index - 1].room
                $scope.bill.tenant = $scope.listRoom1[index - 1].id

                var check = $scope.validateEL('room', room)
                if (check == 1) {
                    count = count + 1
                    $scope.Data[count] = $scope.bill
                    //  console.log($scope.Data)

                    document.getElementById('EL' + room).disabled = true;
                    document.getElementById('edit' + room).hidden = false;


                }
            }


        })

    }


    /*----------------------------- edit Bill ------------------------------------*/

    $scope.CalBill2 = function (room, index, elbe) {


        $scope.bill = {}
        $('#ELB' + room).blur(function () {


            var el = document.getElementById('ELB' + room).value


            if (el != '' && el != elbe) {

                el = parseInt(el)
                var amount = el - $scope.listBill[index - 1].emeterStart
                document.getElementById('amount' + room).innerHTML = amount.toString()
                var eBill = amount * $scope.listBill[index - 1].rooms.electricRate
                document.getElementById('eBill' + room).innerHTML = eBill.toString()
                var rBill = $scope.listBill[index - 1].roomBill + $scope.listBill[index - 1].waterBill + eBill
                document.getElementById('tbtBill' + room).innerHTML = rBill.toString()

                //  console.log(rBill)

                // $scope.bill.roomBill = $scope.listRoom[index - 1].rooms.roomRate
                // $scope.bill.waterBill = $scope.listRoom[index - 1].waterBill
                $scope.listBill[index - 1].elecBill = eBill
                // $scope.bill.emeterStart = $scope.listRoom[index - 1].emeterStart
                $scope.listBill[index - 1].emeterLast = el
                $scope.listBill[index - 1].totalBill = rBill
                // $scope.listBill[index - 1] = $scope.date

                //  $scope.listBill[index - 1].month = $scope.monthInt
                //  $scope.listBill[index - 1].room = $scope.listRoom[index - 1].room
                //  $scope.listBill[index - 1].tenant = $scope.listRoom[index - 1].id
                $scope.bill = $scope.listBill[index - 1]

                var check = $scope.validateEL('bill', room)

                if (check == 1) {
                    console.log($scope.bill)

                    $http({
                        method: 'POST',
                        url: baseUrl + 'Bill/EditBill',
                        random: $scope.random,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: $scope.bill,

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
                    })




                }
            }
            else {

                document.getElementById('ELB' + room).disabled = true
                document.getElementById('editB' + room).hidden = false;
            }


        })

    }

    /*----------------------------- validate ---------------------------*/
    $scope.validateEL = function (key, room) {
        if (key === 'room') {
            var l = document.getElementById('EL' + room).value
            var s = document.getElementById('ES' + room).innerHTML
        }
        else {
            var l = document.getElementById('ELB' + room).value
            var s = document.getElementById('ES' + room).innerHTML
        }

        //  console.log(s + ' ' + l)
        l = parseInt(l)
        s = parseInt(s)
        var ch = 0
        if (l < s) {
            $("#errmsgEL" + room).html("* ต้องมากกว่าครั้งก่อน").show()
            ch = 0
        }
        else {
            $("#errmsgEL" + room).html("* ต้องมากกว่าครั้งก่อน").hide()
            ch = 1
        }

        return ch == 0 ? 0 : 1
    }

    /*------------------------------------ save --------------------------------------*/
    $scope.Save = function () {
        //  console.log($scope.Data)

        // $scope.Data2 = $scope.Data
        let uniqueData = [...new Set($scope.Data)];
        console.log(uniqueData)
        var length = uniqueData.length
        var room = []
        var data = []
        for (var i = 0; i < length; i++) {
            room[i] = uniqueData[i].room
        }
        //  console.log(room)
        let uniqueRoom = [...new Set(room)];
        console.log(uniqueRoom)
        for (var i = 0; i < uniqueRoom.length; i++) {
            for (var j = 0; j < length; j++) {
                if (uniqueRoom[i] == uniqueData[j].room) {
                    data[i] = uniqueData[j]
                }
            }
        }
        console.log(data)

        if (data != '') {
            $http({
                method: 'POST',
                url: baseUrl + 'Bill/SaveBill',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),

            }).then(function (res) {
                if (res.data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'คำนวณสำเร็จ'
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

    }

    /*----------------------------------- edit EL no Bill ------------------------------*/


    $scope.editEL = function (key, room) {
        if (key === 'room') {
            document.getElementById('EL' + room).disabled = false
            document.getElementById('edit' + room).hidden = true;
        }
        else {
            document.getElementById('ELB' + room).disabled = false
            document.getElementById('editB' + room).hidden = true;
        }

    }


    /*------------------------------- search by select floor ---------------------*/
    $scope.floor = 'all'


    $scope.sort = function (idf) {
        var Bill = []
        var Room = []
        console.log($scope.oriListRoom)
        console.log($scope.oriListBill)


        if ($scope.floor != 'all') {


            var idf = parseInt($scope.floor)

            for (var i = 0; i < $scope.oriListRoom.length; i++) {

                if (idf == $scope.oriListRoom[i].rooms.floor) {
                    Room.push($scope.oriListRoom[i])

                }

            }


            for (var j = 0; j < $scope.oriListBill.length; j++) {
                if (idf == $scope.oriListBill[j].rooms.floor) {
                    Bill.push($scope.oriListBill[j])

                }

            }

            $scope.listBill1 = Bill
            $scope.listRoom1 = Room

        }
        else {

            $scope.listRoom1 = $scope.oriListRoom
            $scope.listBill1 = $scope.oriListBill
        }

    }

    /*------------------------------ set foot Bill and Print ------------------------------*/
    $scope.setfootBill = function () {
        $('#ModalFootBill').modal('show')

    }
    $scope.footBill = ''

    $scope.Print = function () {
        $('#ModalFootBill').modal('hide')
        var FB = document.getElementById('footBill').value;
        for (var i = 0; i < $scope.listBill1.length; i++) {
            document.getElementById('textFB' + i).innerText = FB
        }


    }


})