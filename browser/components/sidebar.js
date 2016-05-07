app.directive('sidebar', function(){
	return {
	restrict: 'E',
	templateUrl: 'templates/sidebar.html',
	controller: function($scope, Recipes){
		$scope.$on('deleted', function (event, recipeId) {
			for (var i = 0; i < $scope.recipes.length; i++) {
				if($scope.recipes[i]._id === recipeId){
					$scope.recipes.splice(i,1);
				}
			}
		});
		Recipes.getAll()
		.then(function(recipes){
			$scope.recipes = recipes;
		})
	}
	}
})