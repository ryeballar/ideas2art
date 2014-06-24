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

	.directive('uiViewSlider', function($rootScope, $animate) {

		var classes = {
			welcome: ['welcome-from', 'what-we-do-to'],
			whatWeDo: ['what-we-do-from', 'our-clients-to'],
			ourClients: ['our-clients-from', 'contact-us-to'],
			contactUs: ['contact-us-from', 'welcome-to']
		}

		return function(scope, elem, attr) {
			 $rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
			 	var uiView = angular.element(elem.children()[0]);
			 	var cls = classes[toState.name];
			 	$animate.addClass(uiView, cls.join(' '));
			 });
		};
	})

	.controller('WelcomeController', function($scope) {

	})

	.controller('whatWeDoController', function($scope, $timeout) {
		$timeout(function() {
			$scope.vendors = [{
				header: 'Digital Marketing',
				details: 'Bring your digital product, app or software exposure to the world through our proven marketing services.'
			}, {
				header: 'Native Android/IOS',
				details: 'Breathtaking apps and mobile experiences, focused on user experience and performance'
			}, {
				header: 'Web Based Platforms',
				details: 'Groundbreaking technology applied to the development of impactful sites, hostsites and web apps.'
			}, {
				header: 'Game Development',
				details: 'Creative collaboration and development, using digital platforms to produce unique and engaging experiences.'
			}];
		}, 100);
	})

	.controller('OurClientsController', function($scope, $timeout) {
		$timeout(function() {
			$scope.partition = 3;
			$scope.range = 9;
		},200);
	})

	.controller('ContactUsController', function($scope, $http) {
		$scope = function(contact) {
			$scope.successMessage = false;
			$scope.warningMessage = false;

			$scope.sending = true;
			$http({
				method: 'POST',
				url: 'contact-us.php',
				data: contact
			}).success(function(success) {
				if(success)
					$scope.succesMessage = true;
				else
					$scope.warningMessage = true;
			})['finally'](function() {
				$scope.sending = false;
			});
		}
	});