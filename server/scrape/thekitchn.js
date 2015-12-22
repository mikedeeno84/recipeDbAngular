var request=require("request"),
	cheerio=require('cheerio'),
	rp = require('request-promise');

rp("http://www.thekitchn.com/recipe-fast-easy-turkey-tortilla-soup-recipes-from-the-kitchn-15020")
.then(function(site){
	var $ = cheerio.load(site);

	var title = $('.post-title i').text();

	var directions='';
	$('.directions').each(function (element) {
		$(this).find('p').each(function(){
			directions += " " + $(this).text();
		})
	})

	// var propertyTitles=[];
	// var propertyInfo=[];
	// var properties= {};
	// $('.cooking-times dl').each(function(){
	// 	$(this).find('dt').each(function(){
	// 		if ($(this).text())
	// 		propertyTitles.push($(this).text());
	// 	})
	// 	$(this).find('dd').each(function(){
	// 		if ($(this).text())
	// 		propertyInfo.push($(this).text());
	// 	});
	// })
	// for (var i = 0; i < propertyTitles.length; i++) {
	// 	properties[propertyTitles[i].slice(0,-1)]=propertyInfo[i]
	// };
	// var name = $('.copyright').text().split(" ").slice(-2).join(" ");
	var ingredients = [];
	$('#recipe p').each(function(){
			if ($(this).find('br').length > 0) ingredients.push($(this).text().split('\n').map(function(ingredient){
				var narf =ingredient.replace(/\s\s+/g, '')
				if (narf.length>0) return narf
			}));
			})
	console.log(ingredients)

	// var recipe = {title: title, directions: directions, name:name, ingredients:ingredients, properties:properties};
// return recipe;
}).then(null, console.err)	

