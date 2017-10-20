angular.module('main', ['ngSanitize'])
	.controller('ctrl', ['$scope', '$sce', function($scope, $sce) {
		$scope.output = [];
		$scope.numErrorsSpacing = 0;
		$scope.numErrorsBraces = 0;
		$scope.setOut = function() {
			$scope.output = $scope.codeIn;
			//finds number of spacing issues
			console.log($scope.output);
			$scope.numErrorsSpacing = $scope.output.match(
				new RegExp(/(\S[=+\-*/%<!>]=\S)|(\s[=+\-*/%<!>]=\S)|(\S[=+\-*/%<!>]=\s)|(\S((&&);|(\|\|)|(<<)|(>>))\S)|(\s((&&)|(\|\|)|(<<)|(>>))\S)|(\S((&&)|(\|\|)|(<<)|(>>))\s)|([^\s\-+*%/<!>=][+\-*%/<!>][^\s\-+*%/=])|([^\-+*%/<!>=][+\-*%/<!>=][^\s\-+*%/<!>=])|([^\s\-+*%/<!>=][+\-*%/<!>=][^\-+*%/<!>=])/, 'g')).length;
			//finds number of brace issues
			$scope.numErrorsBraces = $scope.output.match(new RegExp(/([\n\S]{)|([^\n\s]})/, 'g')).length;
		};
		$scope.thisIsSafe = function(code) {
			//highlights spacing errors
			code = code.replace(
				new RegExp(/(\S[=+\-*/%<!>]=\S)|(\s[=+\-*/%<!>]=\S)|(\S[=+\-*/%<!>]=\s)|(\S((&&);|(\|\|)|(<<)|(>>))\S)|(\s((&&)|(\|\|)|(<<)|(>>))\S)|(\S((&&)|(\|\|)|(<<)|(>>))\s)|([^\s\-+*%/<!>=][+\-*%/<!>][^\s\-+*%/=])|([^\-+*%/<!>=][+\-*%/<!>=][^\s\-+*%/<!>=])|([^\s\-+*%/<!>=][+\-*%/<!>=][^\-+*%/<>!=])/, 'g'),
				'<span class="highlighted">$&</span>');
			//highlights brace errors
			code = code.replace(new RegExp(/([\n\S]{)|([^\n\s]})/, 'g'), '<span class="highlightedBlue">$&</span>');
			//converts < symbols not used in added spans to safe html escape
			code = code.replace(new RegExp(/(<(?=[^s/]))/, 'g'), '&lt;');
			//promises it is safe so sanitize doesn't yell at me
			return $sce.trustAsHtml(code);
		};
	}]);

