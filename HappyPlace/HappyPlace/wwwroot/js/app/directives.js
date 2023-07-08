myApp.directive('selectOnClick', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {
				this.select();
			});
		}
	};
});

myApp.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind('keydown keypress', function (event) {
			var code = event.keyCode || event.which;
			if (code === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});

myApp.directive('focus', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element) {
			$timeout(function () {
				element[0].focus();
			});
		}
	};
}]);

myApp.directive('integerOnly', function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function (scope, element, attr, ctrl) {
			function inputValue(val) {
				
				if (val) {
					var digits = val.replace(/[^0-9]/g, '');

					if (digits !== val) {
						ctrl.$setViewValue(digits);
						ctrl.$render();
					}
					return parseInt(digits, 10);
				}
				return undefined;
			}
			ctrl.$parsers.push(inputValue);
		}
	};
});

myApp.directive('decimalOnly', function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function (scope, element, attr, ctrl) {
			function inputValue(val) {
				if (val) {
					var digits = val.replace(/[^0-9.]/g, '');

					if (digits !== val) {
						ctrl.$setViewValue(digits);
						ctrl.$render();
					}
					return parseFloat(digits);
				}
				return undefined;
			}
			ctrl.$parsers.push(inputValue);
		}
	};
});

myApp.directive('activeLink', function () {
	return {
		link: function (scope, element) {
			element.find('.nav a').on('click', function () {
				angular.element(this)
                    .parent().siblings('.active')
                    .removeClass('active');
				angular.element(this)
                    .parent()
                    .addClass('active');
			});
		}
	};
});

myApp.directive('select2', ['$timeout', function ($timeout) {

    $(document).change(function (event) {
        $(".select2-choice").each(function (index) {
            var id = '#' + $(this).parent().attr("id");
            if (!$(event.target).closest(id).length &&
               !$(event.target).is(id)) {
                $(id).select2("close");
            }
        });
    });

    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            $timeout(function () {
                $(element).select2();
            });
        }
    };
}])
	;
