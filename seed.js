var Promise = require('bluebird');
var rp = require('request-promise');
require('./app');
var uri = 'http://127.0.0.1:3000/api/recipes/fromsite/foodnetwork';
var recipeUrls = [
'http://www.foodnetwork.com/recipes/tyler-florence/chicken-enchiladas-recipe.html',
'http://www.foodnetwork.com/recipes/alton-brown/the-chewy-recipe.html',
'http://www.foodnetwork.com/recipes/ina-garten/mac-and-cheese-recipe2.html',
'http://www.foodnetwork.com/recipes/giada-de-laurentiis/lemon-ricotta-cookies-with-lemon-glaze-recipe.html',
'http://www.foodnetwork.com/recipes/alton-brown/instant-pancake-mix-recipe.html',
'http://www.foodnetwork.com/recipes/alton-brown/good-eats-roast-turkey-recipe.html',
'http://www.foodnetwork.com/recipes/alton-brown/who-loves-ya-baby-back-recipe.html',
'http://www.foodnetwork.com/recipes/aarti-sequeira/sloppy-bombay-joes-recipe.html',
'http://www.foodnetwork.com/recipes/giada-de-laurentiis/lasagna-rolls-recipe.html',
'http://www.foodnetwork.com/recipes/giada-de-laurentiis/chicken-piccata-recipe2.html',
'http://www.foodnetwork.com/recipes/ina-garten/beattys-chocolate-cake-recipe.html',
'http://www.foodnetwork.com/recipes/alton-brown/guacamole-recipe.html'
];
var options = {
	method: 'POST',
	json:true,
	uri: uri
};
var promiseMap = recipeUrls.map(function (url) {
	options.body = {url:url};
	return rp(options);
})

Promise.all(promiseMap)
	.then(function(recipes){
		console.log("created " + recipes.length + "recipes");
	})
