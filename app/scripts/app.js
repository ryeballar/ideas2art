angular
	.module('ideas2artApp', [
		'ngAnimate',
		'ngResource',
		'ngTouch',
		'ui.router'
	])

	.filter('range', function() {
		return function(input, total) {
			total = parseInt(total);
			for (var i=0; i<total; i++)
				input.push(i);
			return input;
		};
	})

	.filter('partition', function() {
		var cache = {};
		var filter = function(arr, size) {
			if (!arr) { return; }

			var newArr = [];

			for (var i=0; i<arr.length; i+=size)
				newArr.push(arr.slice(i, i+size));

			var arrString = JSON.stringify(arr);
			var fromCache = cache[arrString+size];

			if (JSON.stringify(fromCache) === JSON.stringify(newArr))
				return fromCache;

			cache[arrString+size] = newArr;
			return newArr;
		};

		return filter;
	})

	.config(function($urlRouterProvider, $stateProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/weclome');

		$stateProvider
			.state('welcome', {
				url: '/weclome',
				templateUrl: 'views/welcome.html',
				controller: 'WelcomeController'
			})

			.state('whatWeDo', {
				url: '/what-we-do',
				templateUrl: 'views/what-we-do.html',
				controller: 'whatWeDoController'
			})

			.state('ourClients', {
				url: '/our-clients',
				templateUrl: 'views/our-clients.html',
				controller: 'OurClientsController'
			})

			.state('contactUs', {
				url: '/contact-us',
				templateUrl: 'views/contact-us.html',
				controller: 'ContactUsController'
			})

	})

	.directive('uiViewSlider', function($rootScope) {

		var classes = {
			welcome: 'ui-view-welcome',
			whatWeDo: 'ui-view-what-we-do',
			ourClients: 'ui-view-our-clients',
			contactUs: 'ui-view-contact-us'
		}

		return function(scope, elem, attr) {
			$rootScope.$on('$stateChangeSuccess', function(event, toState, fromState) {
				var children = elem.children();
				angular.element(children[0]).addClass(classes[toState.name]);
			});
		};
	})

	.controller('WelcomeController', function($scope) {

	})

	.controller('whatWeDoController', function($scope) {

	})

	.controller('OurClientsController', function($scope) {

	})

	.controller('ContactUsController', function($scope) {

	});