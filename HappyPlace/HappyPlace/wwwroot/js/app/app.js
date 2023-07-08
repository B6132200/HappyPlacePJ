angular.module('angular.filter', [])
angular.module('angularUtils.directives.dirPagination', [])
angular.module('customFilter', [])
	.filter('custom', function () {
		return function (input, search) {
			if (!input) return input;
			if (!search) return input;
			var expected = ('' + search).toLowerCase();
			var result = {};
			angular.forEach(input, function (value, key) {
				var actual = ('' + value).toLowerCase();
				if (actual.indexOf(expected) !== -1) {
					result[key] = value;
				}
			});
			return result;
		}
	});
angular.module('HttpConfig', [])
    .config(['$httpProvider',
		function ($httpProvider) {
			$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
			$httpProvider.interceptors.push(['$q', '$injector',
				function ($q, $injector) {
					var spinnerFunction = function () {
						$.blockUI({
							css: {
								border: 'none',
								backgroundColor: '',
							},
							message: '<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i><span class="sr-only">Loading...</span>',
							baseZ: 2000,
						});
					};

					var $http;
					var callback;

					return {
						request: function (config) {
							
							spinnerFunction();
							callback = config.callback;
							//config.headers.Authorization = "Bearer " + token;	// -- use JWT Authen
							return config;
						},

						response: function (response) {
							//get $http via $injector because of circular dependency problem
							$http = $http || $injector.get('$http');
							if ($http.pendingRequests.length < 1) {
								setTimeout(function () { $.unblockUI(); }, 500);

							}
							return response;
						},

						responseError: function (response) {
							console.log('responseError', response)
							$http = $http || $injector.get('$http');
							$.unblockUI();
							return $q.reject(response);
						}
					}
				}
			]);
		}
    ]);

var myApp = angular.module('MainApp', ['HttpConfig', 'angular.filter', 'customFilter', 'angularUtils.directives.dirPagination']);
