app.factory('recipeFactory', function ($http){
	var fact = {
		cachedRecipes:[]
	}
	fact.getAllRecipes = function(){
		var recipeFactory = this;
		return $http.get('/api/recipes')
		.then(function(response){
			recipeFactory.cachedRecipes = response.data;
			return recipeFactory.cachedRecipes;
		}).then(null, console.error);
	}
	fact.getRecipeById = function(id){
		return $http.get('/api/recipes/' + id)
		.then(function(response){
			return response.data;
		}).then(null, console.error);
	}
	fact.postRecipe = function(recipeObj){
		var recipeFactory = this;
		return $http.post('api/recipes', recipeObj)
		.then(function(response){
			recipeFactory.cachedRecipes.push(response.data)
			return response.data;
		}).then(null, console.error);
	}
	fact.postByUrl = function(recipeUrl, recipeHost){

		var recipeFactory = this;
		console.log(recipeHost)
		return $http.post('api/recipes/fromsite/' + recipeHost, {url: recipeUrl})
		.then(function(response){
			recipeFactory.cachedRecipes.push(response.data)
			return response.data;
		}).then(null, console.error);
	}

	fact.parseUrl = function(recipeUrl){
		var recipeFactory = this;
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