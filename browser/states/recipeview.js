app.config(function ($stateProvider) {
	$stateProvider.state('recipe', {
		url:'/recipes/:recipeId',
		templateUrl: '/templates/recipeview.html',
		resolve: {
			recipe: function(Recipes, $stateParams){
				return Recipes.getById($stateParams.recipeId);
			}
		},
		controller: function ($scope, recipe, Recipes, $state, $rootScope){
			$scope.recipe = recipe;
			$scope.servings = $scope.recipe.servings;
			$scope.modifier = function(){
				return ($scope.servings/$scope.recipe.servings)
			}
			$scope.showIngredient = function(ingredient){
				if (!ingredient.quantity) return "";
				return ingredient.quantity * $scope.modifier();
			}
			$scope.delete = function (recipeId) {
				Recipes.delete(recipeId)
					.then(function () {
							$rootScope.$broadcast('deleted', recipeId)
							$state.go('homie')
					})
			}
		}
	})
})