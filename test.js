var foodNetworkRecipe = require('./server/scrape/food_network.js')
var foodDotComRecipe = require('./server/scrape/fooddotcom.js')
var allrecipes = require('./server/scrape/all_recipes.js')
var Recipe=require('./models/recipe.js')
foodNetworkRecipe("http://www.foodnetwork.com/recipes/alton-brown/who-loves-ya-baby-back-recipe.html")
	.then(function(recipeData){
		console.log(recipeData.title)
	}).then(null, console.log)
foodDotComRecipe("http://www.food.com/recipe/ribs-19581")
	.then(function(recipeData){
		console.log(recipeData)
	})
allrecipes("http://allrecipes.com/recipe/77955/italian-style-chili/")
	.then(function(recipeData){
		console.log(recipeData.title)
	})


