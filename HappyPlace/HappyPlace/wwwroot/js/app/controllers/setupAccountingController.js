'use strict';

myApp.controller('setupAccountingController', function ($scope, $http) {

    $scope.random = Math.random();

    $scope.init = function () {
        $scope.GetMonthList();
    }

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
        $scope.GetDetailExp(month, $scope.year)
        
        // console.log(typeof month + ' ' + typeof $scope.year)
    })


    $(function () {
        $('#yearpk').change(function () {
            var mid = $scope.month
            mid = parseInt(mid)
            $scope.GetBillList(mid, $scope.year)
            $scope.GetDetailExp(mid, $scope.year)
            $scope.setMonthshow(mid)
        })
    })

    $(function () {
        $('#selectMonth').change(function () {
            var mid = $scope.month
            mid = parseInt(mid)
            $scope.GetBillList(mid, $scope.year)
            $scope.GetDetailExp(mid, $scope.year)
            $scope.setMonthshow(mid)
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
                $scope.setMonthshow(month)
                // console.log($scope.bill.month)
            }
        }
    }

    $scope.setMonthshow = function (m) {
        var dmonth = ''
        for (var i = 0; i < $scope.monthList.length; i++) {
            if ($scope.monthList[i].id == m) {
                dmonth = $scope.monthList[i].name
            }
        }
        document.getElementById('dmonth').innerText = dmonth
    }


    /*----------------------- get list Bill ----------------------*/
    $scope.income = ''
    $scope.exp = ''


    $scope.GetBillList = function (mid, year) {

        // console.log(typeof mid + ' ' + typeof year)
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
            setIncome()


        }, function errorCallback(err) {
            console.log(err.data);
        });


        /*------------------------- get fine ---------------------------*/
        $http({
            method: 'GET',
            url: baseUrl + 'Accounting/GetCheckOutList',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                mid: mid,
                year: year,
            },
        }).then(function successCallback(res) {
            $scope.CheckOutList = res.data;
            console.log($scope.CheckOutList)
            
            //  console.log($scope.income)


        }, function errorCallback(err) {
            console.log(err.data);
        });

       

    };

    function setIncome() {
        $scope.income = 0

        for (var i = 0; i < $scope.listBill.length; i++) {
            $scope.income = $scope.income + $scope.listBill[i].totalBillLast
        }

        if ($scope.CheckOutList != '') {
           
            for (var j = 0; j < $scope.CheckOutList.length; j++) {
                for (var i = 0; i < $scope.listBill.length; i++) {
                   
                    if ($scope.CheckOutList[j].id == $scope.listBill[i].tenant) {
                        var WEBill = $scope.listBill[i].waterBill + $scope.listBill[i].elecBill
                        $scope.income = ($scope.income + $scope.CheckOutList[j].fine) - WEBill
                    }

                }
            }
           

        }
        
        console.log($scope.income)
        document.getElementById("income").innerText = $scope.income.toString();
        setNetIncome($scope.income)
    }

    /*------------------------------ Get Detail Expenses ---------------------- */
    $scope.exp = 0
    $scope.listDetail = ''

    $scope.GetDetailExp = function (mid, year) {

        $http({
            method: 'GET',
            url: baseUrl + 'Accounting/GetDetailExp',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                mid: mid,
                year: year,
            },

        }).then(function successCallback(res) {
            $scope.listDetail = res.data;
            console.log($scope.listDetail)
            if ($scope.listDetail == '') {
                resetRow()
                $scope.Addtd()
                document.getElementById('expenses').innerText = 0
                $scope.exp = 0

            }
            else {
                $scope.exp = 0
                for (var i = 0; i < $scope.listDetail.length; i++) {
                    $scope.exp = $scope.exp + $scope.listDetail[i].amount
                }
                resetRow()
                document.getElementById('expenses').innerText = $scope.exp.toString();
                document.getElementById('total').innerText = $scope.exp


            }


        }, function errorCallback(err) {
            console.log(err.data);
        });


    }

    /*----------------------------- set net income --------------------------------*/
    function setNetIncome(income) {
        if (income == 0) {
            $scope.exp = 0
        }
        var netIncome = income - $scope.exp
        document.getElementById('netIncome').innerText = netIncome;
        /*console.log($scope.income + ' ' + $scope.exp)*/
    }


    /*---------------------------- add td ---------------------------------- */
    $scope.Addtd = function () {
        for (var i = 0; i < 5; i++) {
           // var rowCount = $('#tDetail tr').length
            // console.log(rowCount)
            var table = document.getElementById('tDetail')
            var row = table.insertRow(i)
            var cell0 = row.insertCell(0)
            var cell1 = row.insertCell(1)
            var cell2 = row.insertCell(2)
            var cell3 = row.insertCell(3)
            cell0.innerHTML = ' <spen class="text-dark ">' + (i + 1) + '</spen>'
            cell1.innerHTML = '<input class="td-input0" type="text" style="width: 793px;"/>'
            cell2.innerHTML = '<input class="td-input1 text-center" style="width: 180px" type="text" id="c2' + (i + 1) + '" onblur="setTotal()"/>'
            cell3.innerHTML = '<span type="button" class="td-del" onclick="remove(this)" ><i class="bi bi-dash-circle-fill" style="color: #b16060; font-size: 1.45rem;"></i></span>'

        }
    }

    $scope.AddOnetd = function () {

        var rowCount = $('#tDetail tr').length
        // console.log(rowCount)
        var table = document.getElementById('tDetail')
        var row = table.insertRow(rowCount)
        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1)
        var cell2 = row.insertCell(2)
        var cell3 = row.insertCell(3)
        cell0.innerHTML = ' <spen class="text-dark ">' + (rowCount + 1) + '</spen>'
        cell1.innerHTML = '<input class="td-input0" type="text" style="width: 793px;"/>'
        cell2.innerHTML = '<input class="td-input1 text-center" style="width: 180px" type="text" id="c2' + (rowCount + 1) + '" onblur="setTotal()"/>'
        cell3.innerHTML = '<span type="button" class="td-del" onclick="remove(this)" ><i class="bi bi-dash-circle-fill" style="color: #b16060; font-size: 1.45rem;"></i></span>'


    }

    /*----------------------------------- total amount -----------------------*/

    window.setTotal = function () {
        // console.log('hi')
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

    }

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

        window.setTotal();
    }

    function resetRow() {
       
        var rowCount = $('#tDetail tr').length
        console.log(rowCount)
        for (var i = rowCount - 1; i >= 0; i--) {
            document.getElementById('tDetail').deleteRow(i)

        }

        document.getElementById('total').innerHTML = ''
     
    }

    /*----------------------------------- save detail ----------------------- */

    $scope.saveDetail = function () {
        console.log('hi')
        $scope.data = []

        var rowCount = $('#tDetail tr').length
        console.log(rowCount)
        var c = 0
        for (var i = 0; i < rowCount; i++) {

           

            var dt = document.getElementById('tDetail').rows[i].cells[1].children[0].value
            var am = document.getElementById('tDetail').rows[i].cells[2].children[0].value
            if (dt != '' && am != '') {
                $scope.data[i] = {}
                $scope.data[i].detail = dt
                $scope.data[i].amount = parseInt(am)
                $scope.data[i].month = parseInt($scope.month)
                $scope.data[i].year = $scope.year
            }
          
            
        }
       
        if ($scope.listDetail.length != 0) {
            for (var i = 0; i < $scope.listDetail.length; i++) {
                $scope.data[i].id = $scope.listDetail[i].id
            }
        }
         

        if ($scope.detailRemove != '') {
              console.log($scope.detailRemove)
            $http({
                method: 'POST',
                url: baseUrl + 'Accounting/DelDetailExp',
                random: $scope.random,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify($scope.detailRemove),

            }).then(function (res) { })
        }

      //  console.log(JSON.stringify($scope.data))
       
        $http({
            method: 'POST',
            url: baseUrl + 'Accounting/SaveDetailExp',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
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
    

   
    

    


})
