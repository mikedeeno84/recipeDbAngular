var express = require('express');
var router = express.Router();
var Recipe = require('../../db/models/recipe.js').Recipe;

var scraper = {
	allrecipes : require('../../scraper/scrape/all_recipes.js'),
	foodnetwork: require('../../scraper/scrape/food_network.js'),
	food: require('../../scraper/scrape/fooddotcom.js')
}

// var Ingreedy = require('../../node_modules/ingreedy-js/')

var formatter = {
	allrecipes: require('../../scraper/format/allrecipes.js'),
	foodnetwork: require('../../scraper/format/food_network.js'),
	food: require('../../scraper/format/fooddotcom.js')
}

router.get('/recipes', function (req, res, next) {
	Recipe.find().exec()
		.then(function(recipes){
			res.json(recipes)
		}).then(null, next);
});

router.get('/recipes/:id', function (req, res, next) {
	Recipe.findOne({_id: req.params.id}).exec()
		.then(function(recipe){
			res.json(recipe);
		}).then(null, next);
});

router.post('/recipes', function(req, res, next){
	var newRecipe = new Recipe(req.body);
	newRecipe.save()
	.then(function(recipe){
		res.json(recipe);
	}).then(null, next);

});

router.post('/recipes/fromsite/:scrapesite', function (req, res, next){
	scraper[req.params.scrapesite](req.body.url)
	.then(function(recipe){
		recipe.ingredients = formatter[req.params.scrapesite](recipe.ingredients);
		console.log(recipe)
		var newRecipe = new Recipe(recipe);
		return newRecipe.save()
	}).then(function(recipe){
		res.json(recipe);
	}).then(null, next);
});
router.delete('/recipes/:id', function (req, res, next) {
	Recipe.remove({_id:req.params.id})
		.then(function () {
			res.status(204).send();
		})
})
module.exports = router