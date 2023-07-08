'use strict';

myApp.controller('setupPaymentController', function ($scope, $http, $filter) {

    $scope.random = Math.random();

    $scope.init = function () {
        //$scope.GetYear();
        $scope.GetStatusList();
        $scope.GetFloorList();
        $scope.GetMonthList();

        //   $scope.GetBillList();
        //   $scope.GetRoomList();

    }

    /*-------------------------------------- get status -------------------------- */
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


        }, function errorCallback(err) {
            console.log(err.data);
        });
    };


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

    /*------------------------------- search by select floor ---------------------*/
    $scope.floor = 'all'


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
        var day = d.getDate();
        if (day < 10) day = "0" + day;

        $scope.dayNow = parseInt(day)
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
            console.log(mid, $scope.year)
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
        console.log(typeof mid + ' ' + typeof year)
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

            $scope.deadline = $scope.listBill[0].deadline;
           // console.log($scope.listBill[0].deadline)
            $scope.laterate = $scope.listBill[0].lateRate;


            const date = $scope.deadline.split('/')
            var d = date[0]
            var m = date[1]
            var y = date[2]
            var dateS = y + '-' + m + '-' + d

            $scope.setupdeadline = new Date(dateS)



            $scope.setuplateRate = $scope.laterate

            $scope.total = 0
            $scope.now = 0
            document.getElementById('btnSetup').disabled = false;

            for (var i = 0; i < $scope.listBill.length; i++) {
                if ($scope.listBill[i].statuses.name == 'ค้างชำระ') {

                    if ($scope.monthNow > parseInt($scope.deadline.substring(3, 5))) {
                        $scope.listBill[i].dayLate = $scope.listBill[i].dayLate + $scope.dayNow
                        $scope.listBill[i].lateBill = $scope.listBill[i].dayLate * $scope.laterate
                        $scope.listBill[i].totalBillLast = $scope.listBill[i].totalBill + $scope.listBill[i].lateBill
                    }
                    if ($scope.dayNow > parseInt($scope.deadline.substring(0, 2)) && $scope.monthNow == parseInt($scope.deadline.substring(3, 5))) {
                        var dd = parseInt($scope.deadline.substring(0, 2))
                        var dn = $scope.dayNow 
                        $scope.listBill[i].dayLate = dn - dd
                        $scope.listBill[i].lateBill = $scope.listBill[i].dayLate * $scope.laterate
                        $scope.listBill[i].totalBillLast = $scope.listBill[i].totalBill + $scope.listBill[i].lateBill
                    }
                }
                if ($scope.listBill[i].statuses.name == 'ชำระแล้ว') {
                    document.getElementById('btnSetup').disabled = true;
                    $scope.now = $scope.listBill[i].totalBillLast + $scope.now
                    
                }

                $scope.total = $scope.listBill[i].totalBillLast + $scope.total
            }
            $scope.listBill1 = $scope.listBill
            $scope.oriListBill = $scope.listBill
            $scope.listBillPrint = []

          

            document.getElementById("total").innerText = $scope.total
            document.getElementById("now").innerText = $scope.now
            //  console.log( $scope.monthNow + " " +  parseInt($scope.deadline.substring(3, 5)))

            $scope.printReceipt('start')


        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*------------------------------- pay success ---------------------------------*/
    $scope.paySuccess = function (data) {

        //Swal.fire({
        //    title: 'เลือกรูปแบบการชำระเงิน',
        //    input: 'radio',
        //    inputOptions: {
        //        'เงินสด': 'เงินสด',
        //        'โอนเงิน': 'โอนเงิน',

        //    },

        //    // validator is optional
        //    inputValidator: function (result) {
        //        if (!result) {
        //            return 'โปรดเลือกรูปแบบการชำระเงิน!';
        //        }
        //    }
        //}).then(function (result) {
        //    if (result.isConfirmed) {
        //        Swal.fire({
        //            icon: 'success',
        //            html: 'You selected: ' + result.value
        //        });
        //    }
        //})

        Swal.fire({
            title: 'ยืนยันการชำระเงิน',
            text: "*** เลือกรูปแบบการชำระเงิน ***",
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#1abb50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            input: 'radio',
            inputOptions: {
                'เงินสด': 'เงินสด',
                'โอนเงิน': 'โอนเงิน',

            },

            // validator is optional
            inputValidator: function (result) {
                if (!result) {
                    return 'โปรดเลือกรูปแบบการชำระเงิน';
                }
            }

        }).then(function (result) {

            if (result.value) {
                console.log(result.value)
                console.log(data)

                data.paidBy = result.value


                var currentDate = new Date();
                var month = currentDate.getMonth() + 1;
                if (month < 10) month = "0" + month;
                var dateOfMonth = currentDate.getDate();
                if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
                var year = currentDate.getFullYear();
                var formattedDate = dateOfMonth + "/" + month + "/" + year;
                data.datePay = formattedDate

                // console.log(data)

                $http({
                    method: 'POST',
                    url: baseUrl + 'Payment/EditBill',
                    random: $scope.random,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data,

                }).then(function (res) {
                    if (res.data) {
                        window.location.reload();
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



    /*-------------------------------- sort data -------------------------------*/

    $scope.floor = 'all'
    $scope.status = 'all'

    $scope.sort = function () {
        var Bill = []
        console.log($scope.floor + ' ' + $scope.status)
        // console.log($scope.oriListBill)

        if ($scope.floor != 'all' && $scope.status != 'all') {
            var idf = parseInt($scope.floor)
            var ids = parseInt($scope.status)

            for (var j = 0; j < $scope.oriListBill.length; j++) {
                if (idf == $scope.oriListBill[j].rooms.floor && ids == $scope.oriListBill[j].status) {
                    Bill.push($scope.oriListBill[j])

                }

            }
            $scope.listBill1 = Bill
        }
        if ($scope.floor != 'all' && $scope.status == 'all') {
            var idf = parseInt($scope.floor)

            for (var j = 0; j < $scope.oriListBill.length; j++) {
                if (idf == $scope.oriListBill[j].rooms.floor) {
                    Bill.push($scope.oriListBill[j])

                }

            }
            $scope.listBill1 = Bill
        }
        if ($scope.floor == 'all' && $scope.status != 'all') {
            var ids = parseInt($scope.status)
            for (var j = 0; j < $scope.oriListBill.length; j++) {
                if (ids == $scope.oriListBill[j].status) {
                    Bill.push($scope.oriListBill[j])

                }

            }
            $scope.listBill1 = Bill
        }
        if ($scope.floor == 'all' && $scope.status == 'all') {
            $scope.listBill1 = $scope.oriListBill
        }

    }

    /*--------------------------------------- setup deadlinr and late rate --------------------------------*/
    $scope.setup = function () {
        $('#ModalSetup').modal('show')
    }

    $scope.editSetup = function () {

        var currentDate = $scope.setupdeadline
        var month = currentDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var dateOfMonth = currentDate.getDate();
        if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
        var year = currentDate.getFullYear();
        var formattedDate = dateOfMonth + "/" + month + "/" + year;
        var dl = formattedDate

        // console.log(typeof dl + " " + typeof $scope.setuplateRate)

        $http({
            method: 'POST',
            url: baseUrl + 'Payment/EditSetup',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                dl: dl,
                lr: $scope.setuplateRate
            },
            data: JSON.stringify($scope.oriListBill),
        }).then(function (res) {
            if (res.data) {
                window.location.reload();

            };
        });
    }

    /*---------------------------------------- reset ------------------------------------*/
    $scope.reset = function () {
        window.location.reload();
    }

    /*------------------------------------- print Receipt--------------------------------*/
    $scope.printReceipt = function (key) {
        $scope.listBillPrint = []
        if (key == 'start') {
            for (var i = 0; i < $scope.listBill1.length; i++) {
                if ($scope.listBill1[i].statuses.name == 'ชำระแล้ว') {
                    $scope.listBillPrint.push($scope.listBill1[i])
                }

            }

          
        }
        if (key == 'all') {
            for (var i = 0; i < $scope.listBill1.length; i++) {
                if ($scope.listBill1[i].statuses.name == 'ชำระแล้ว') {
                    $scope.listBillPrint.push($scope.listBill1[i])
                }

            }

            setTimeout(print, 1000);
        }
        if (key != 'all' && key != 'start') {
            for (var i = 0; i < $scope.listBill1.length; i++) {
                if ($scope.listBill1[i].id == key) {
                    $scope.listBillPrint.push($scope.listBill1[i])
                }

            }
            setTimeout(print, 1000);
        }
       
        
    }

    function print() {
       // document.title = "ใบเสร็จรับเงิน"
        window.print();

    }
    

    $scope.printOneReceipt = function (index) {
        printData(index)
        console.log(index)
    }

    function printData(index) {
        var divToPrint = document.getElementById("printTable" + index);
        //document.getElementById("printTable" + index).style.display = 'block'
        //window.print();
        //console.log(divToPrint)
        // newWin = window.open("");
        var newWin = document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }
})