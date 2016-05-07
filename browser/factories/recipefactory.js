app.factory('Recipes', function ($http){
	var fact = {
		cachedRecipes:[]
	}
	fact.getAll = function(){
		var Recipes = this;
		return $http.get('/api/recipes')
		.then(function(response){
			Recipes.cachedRecipes = response.data;
			return Recipes.cachedRecipes;
		}).then(null, console.error);
	}
	fact.getById = function(id){
		return $http.get('/api/recipes/' + id)
		.then(function(response){
			return response.data;
		}).then(null, console.error);
	}
	fact.post = function(recipeObj){
		var Recipes = this;
		return $http.post('api/recipes', recipeObj)
		.then(function(response){
			Recipes.cachedRecipes.push(response.data)
			return response.data;
		}).then(null, console.error);
	}
	fact.postByUrl = function(recipeUrl, recipeHost){

		var Recipes = this;
		console.log(recipeHost)
		return $http.post('api/recipes/fromsite/' + recipeHost, {url: recipeUrl})
		.then(function(response){
			Recipes.cachedRecipes.push(response.data)
			return response.data;
		}).then(null, console.error);
	}

	fact.delete = function (recipeId) {
		return $http.delete('api/recipes/' + recipeId)
			.then(function (response) {
				return response.data;
			});
	}

	fact.parseUrl = function(recipeUrl){
		var Recipes = this;
		if(!recipeUrl) return;
		var splitURL = recipeUrl.split('.');
		console.log(splitURL)
		if (splitURL.indexOf("http://allrecipes") > -1 || splitURL.indexOf("allrecipes") > -1) return "allrecipes";
		if (splitURL.indexOf("foodnetwork") > -1) return "foodnetwork";
		if (splitURL.indexOf("food") > -1) return "food";
		if (splitURL.indexOf("yummly") > -1) return "yummly";
		if (splitURL.indexOf("thekitchn") > -1) return "thekitchn";
	}
	return fact;
})