'use strict';

myApp.controller('setupBookToCIController', function ($scope, $http) {

    $scope.init = function () {
        $scope.grab_data_from_url();
      
    }

    $scope.grab_data_from_url = function () {
        $scope.url = window.location.href;
        var idData = $scope.url.split('data=').pop();
        idData = parseInt(idData)
       // console.log(idData)
        $scope.GetBook(idData)
    }

    /*----------------- function get book ----------------------*/
    $scope.GetBook = function (id) {
        // console.log(f)
        $http({
            method: 'GET',
            url: baseUrl + 'BooK/GetBook',
            random: $scope.random,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                id: id
            }

        }).then(function successCallback(res) {
            $scope.Book = res.data;

            const randomId = function (length = 3) {
                return Math.random().toString(36).substring(2, length + 2);
            };


            $scope.DataMore.tn = 'T' + $scope.Book.rooms.name + '-' + $scope.tnY + randomId()
           


            $scope.setGender()
           // console.log($scope.Book)


        }, function errorCallback(err) {
            console.log(err.data);
        });
    };

    /*-------------------------- set gender --------------------------*/
    $scope.setGender = function () {
        if ($scope.Book.gender == 'ชาย') {
            document.getElementById('boy').checked = true
        }
        if ($scope.Book.gender == 'หญิง') {
            document.getElementById('girl').checked = true

        }

    }

    /*------------------------------- set date now ------------------------------*/
    $(function () {
        var dateNow = document.getElementById('dateCI').valueAsDate = new Date();
        $scope.dateCI1 = dateNow
        $scope.tnY = dateNow.getFullYear()
        $scope.tnY = $scope.tnY % 100
    })

    /*-------------------- change gender --------------------------*/
    $scope.checkGender = function (val) {
        console.log(val)
        $scope.DataMore.gender = val
        
       

    }

    $scope.DataMore = {}
    $scope.DataMore.address = ''
    $scope.DataMore.total = ''
    $scope.DataMore.emeterStart = ''
    $scope.DataMore.gender = ''
    $scope.DataMore.tn = ''
    $scope.DataMore.age = ''


    /*-------------------------- save tenant ----------------------- */
    $scope.SaveTenant = function (book) {
        $scope.tenant = book
        delete $scope.tenant.dateB
        delete $scope.entranceFee
       
        $scope.tenant.address = $scope.DataMore.address
        $scope.tenant.total = $scope.DataMore.total
        $scope.tenant.emeterStart = $scope.DataMore.emeterStart
        $scope.tenant.age = $scope.DataMore.age
        if ($scope.DataMore.gender != '') {
            $scope.tenant.gender = $scope.DataMore.gender
        }
        
        $scope.tenant.tn = $scope.DataMore.tn



        $scope.tenant.waterBill = $scope.Book.rooms.waterRate * $scope.tenant.total

        //  console.log($scope.dateCI1)
        var currentDate = $scope.dateCI1
        var month = currentDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var dateOfMonth = currentDate.getDate();
        if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
        var year = currentDate.getFullYear();
        var formattedDate = dateOfMonth + "/" + month + "/" + year;
        $scope.tenant.dateCI = formattedDate

        console.log($scope.tenant)

        var check = validateTenant($scope.tenant);
        if (check == 1) {

            delete $scope.tenant.deposit
            delete $scope.tenant.rooms

            $http({
                method: 'POST',
                url: baseUrl + 'Book/SaveTenant',
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
                        window.location.href = '/Book/Index'


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
        if (tenant.address == '') {
            $("#errmsgAddress").html("* ใส่ข้อมูลที่อยู่").show()
            check = 1
        }
        else {
            $("#errmsgAddress").html("* ใส่ข้อมูลที่อยู่").hide()

        }
        if (tenant.age == '' || tenant.age == undefined) {
            $("#errmsgAge").html("* ต้องอายุ 20 ปีขึ้นไป").show()
            check = 1
        }
        else {
            $("#errmsgAge").html("* ต้องอายุ 20 ปีขึ้นไป").hide()

        }
        if (tenant.total == '' || tenant.total == undefined) {
            $("#errmsgTotal").html("* ต้องมากกว่า 0").show()
            check = 1
        }
        else {
            $("#errmsgTotal").html("* ต้องมากกว่า 0").hide()

        }
        if (tenant.emeterStart == '') {
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

    $scope.reset = function () {
        window.location.reload();
    }


})
