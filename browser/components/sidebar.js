app.directive('sidebar', function(){
	return {
	restrict: 'E',
	templateUrl: 'templates/sidebar.html',
	controller: function($scope, recipeFactory){
		recipeFactory.getAllRecipes()
		.then(function(recipes){
			$scope.recipes = recipes;
		})
	}
	}
})