var express = require('express');
var router = express.Router();
var Recipe = require('../../models/recipe.js').Recipe;
// var scrapeAll_Recipes = require('../../server/scrape/all_recipes.js')
// var scrapeFoodNetwork = require('../../server/scrape/food_network.js')
// var scrapeFoodDotCom = require('../../server/scrape/fooddotcom.js')
var scraper = {
	allrecipes : require('../../server/scrape/all_recipes.js'),
	foodnetwork: require('../../server/scrape/food_network.js'),
	food: require('../../server/scrape/fooddotcom.js')
}

var formatter = {
	allrecipes: require('../../server/format/allrecipes.js'),
	foodnetwork: require('../../server/format/food_network.js'),
	food: require('../../server/format/fooddotcom.js')
}

router.get("/recipes", function (req, res, next) {
	Recipe.find().exec()
		.then(function(recipes){
			res.json(recipes)
		}).then(null, console.err)
})

router.get("/recipes/:id", function (req, res, next) {
	Recipe.findOne({_id: req.params.id}).exec()
		.then(function(recipe){
			res.json(recipe);
		}).then(null, console.err)
})

router.post("/recipes", function(req, res, next){
	var newRecipe = new Recipe(req.body);
	newRecipe.save()
	.then(function(recipe){
		res.json(recipe)
	})

})

router.post("/recipes/fromsite/:scrapesite", function (req, res, next){
	scraper[req.params.scrapesite](req.body.url)
	.then(function(recipe){
		recipe.ingredients = formatter[req.params.scrapesite](recipe.ingredients);
		console.log(recipe)
		var newRecipe = new Recipe(recipe);
		return newRecipe.save()
	}).then(function(recipe){
		res.json(recipe)
	});
})

module.exports = router