var app = window.angular.module('app', ['ngclipboard']);

app.factory('urlFetcher', urlFetcher);
app.controller('mainCtrl', mainCtrl);

function urlFetcher($http) {

	var API_ROOT = 'getUrls';
	return {
		get: function() {
			return $http
				.get(API_ROOT)
				.then(function(resp) {
					return resp.data;
				});
		}
	};
}



function mainCtrl($scope, urlFetcher, $http) {

	$scope.urls = [];

	urlFetcher.get()
		.then(function(data) {
			console.log("getting urls");
			$scope.urls = data;
		});


	$scope.addurl = function() {
		console.log("addurl called");
		var formData = {
			"longUrl": $scope.url
		};
		console.log(formData);
		var route = 'api/short';
		$http({
			url: route,
			method: "POST",
			data: formData
		}).success(function(data, status, headers, config) {
			urlFetcher.get()
				.then(function(data) {
					console.log("getting urls");
					$scope.urls = data;
				});
			console.log("Post worked");
		}).error(function(data, status, headers, config) {
			console.log("data " + data);
			console.log("Post failed");
		});
	};
}

