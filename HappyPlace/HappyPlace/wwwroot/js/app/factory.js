myApp.factory('httpService', ['$http', function ($http) {
	return {

		MedthodGet: function (callback) {
			return $http.get(`${window.baseUrl}Home/MedthodGet`, callback);
		},
		MedthodPost: function (param, callback) {
			return $http.post(`${window.baseUrl}Home/MedthodPost`, param, callback);
		},

	};
}]);
