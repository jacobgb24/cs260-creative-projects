angular.module('paste', ['ngclipboard'])
	.controller('mainCtrl', [
		'$scope', '$http', '$location', '$sce',
		function($scope, $http, $location, $sce) {
			$scope.fullUrl = window.location.href;
			console.log($scope.fullUrl);
			var extension = '/plaster/' + $scope.fullUrl.substr($scope.fullUrl.lastIndexOf('/') + 1);	
			console.log(extension);
			$http.get(extension).success(function(data) {
					console.log(data);
					console.log(data[0].body);
					$scope.title = data[0].title;
					$scope.textHtml = $sce.trustAsHtml(data[0].body);
				});

		}
	]);


