
myApp.controller('homeCtrl', ['$scope', '$http', '$timeout', '$filter', '$q', 'httpService', function ($scope, $http, $timeout, $filter, $q, httpService) {

    $scope.Oninit = function () {
        $scope.TestFunc();
        $scope.LoadData();
    }
    $scope.TestFunc = function () {
        httpService.MedthodGet().then(res => { var result = res.data; });
        $scope.TestGet();
        $scope.TestPost();
        httpService.MedthodPost({}).then(res => { var result = res.data; });
    }

    $scope.TestGet = function () {
        httpService.MedthodGet().then(res => {
            var result = res.data;
        });
    }
    $scope.TestPost = function (id) {
        httpService.MedthodPost({}).then(res => {
            var result = res.data;
        });
    }
    $scope.LoadData = function () {
        var p1 = httpService.MedthodGet();
        var p2 = httpService.MedthodGet();
        $q.all([p1, p2]).then(res => {
            // -- when all promise (p1,p2) success
            console.log('q.all success')
            var a1 = res[0].data;
            var a2 = res[1].data;
        }, function (err) {
            // -- when some promise (p1,p2) error
            console.log('q.all error')

        })
    }

}]);

