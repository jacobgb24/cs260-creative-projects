angular.module('plaster', [])
	.controller('mainCtrl', [
		'$scope', '$http', '$window',
		function($scope, $http, $window) {
			$scope.createPlaster = function() {
				var randUrl = encode(Math.floor(Math.random() * 150000) + 1000);
				var userText = $scope.text.replace(/\n/g, '<br/>');
				var newPlaster = {url:randUrl, title:$scope.title, body:userText};
				$http.post('/plaster', newPlaster).success(function(data) {
					console.log(data);
				});
				$window.location.href = "/" + randUrl;
			};
		}

	]);

var alphabet = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"; //possible values in short URL 0,O,I excluded for clarity
var base = alphabet.length;

//converts base 10 number to new base
function encode(num) {
    console.log("ENCODE CALLED");
    var encoded = "";
    while(num) {
        var remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder].toString() + encoded;
    }
    console.log();
    return encoded;
}
