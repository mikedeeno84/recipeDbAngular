app.config(function ($stateProvider) {
	$stateProvider.state('recipe', {
		url:'/recipes/:recipeId',
		templateUrl: '/templates/recipeview.html',
		resolve: {
			recipe: function(recipeFactory, $stateParams){
				return recipeFactory.getRecipeById($stateParams.recipeId);
			}
		},
		controller: function ($scope, recipe){
			$scope.recipe = recipe;
			$scope.servings = $scope.recipe.servings;
			$scope.modifier = function(){
				return ($scope.servings/$scope.recipe.servings)
			}
			$scope.showIngredient = function(ingredient){
				if (!ingredient.quantity) return "";
				return ingredient.quantity * $scope.modifier();
			}
		}
	})
})