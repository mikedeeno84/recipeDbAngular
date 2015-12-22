app.config(function($stateProvider){
	$stateProvider.state('add',{
		url: '/recipes/add',
		templateUrl: '/templates/addrecipe.html',
		controller: function($scope, recipeFactory, $state){
			$scope.postRecipe = function(){
				console.log($scope.recipe)
				// recipeFactory.postRecipe($scope.recipe)
				// .then(function(newRecipe){
				// 	$state.go('recipe', {recipeId: newRecipe._id})
				// })
			};
			$scope.postUrl = function() {
				// console.log($scope.urlHost())
				recipeFactory.postByUrl($scope.recipeUrl, $scope.urlHost())
				.then(function(newRecipe){
					$state.go('recipe', {recipeId: newRecipe._id})
				});
			};
			$scope.addIngredient = function(){
				$scope.recipe.ingredients.push("");
			};
			$scope.isSupported=  function(){
				if ($scope.urlHost) return true;
			}
			$scope.urlHost = function(){
				return recipeFactory.parseUrl($scope.recipeUrl)
			}
			$scope.recipe = {};
			$scope.recipe.ingredients=[""];
		}
	})
})