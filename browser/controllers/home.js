app.controller('HomeController', function($scope, FactoryJustCuz){
	$scope.narf = "Point!"
	$scope.getPoint = function (){
		return FactoryJustCuz.narf
	}

})