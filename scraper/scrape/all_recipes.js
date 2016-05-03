var cheerio=require('cheerio'),
	rp = require('request-promise');
module.exports = function(siteURL){
return rp(siteURL)
.then(function(site){
	var $ = cheerio.load(site);

	var title = $('h1[itemprop=name]').text();
	var ingredients = [];
	$('.recipe-ingred_txt').each(function(){
		ingredients.push($(this).text())
	});

	ingredients = ingredients.slice(0,-3);
	var directions='';
	$('.recipe-directions__list--item').each(function () {
		directions += $(this).text(); + " "
	})

	var propertyTitles=[];
	var propertyInfo=[];
	var properties= {};
	$('.prepTime').each(function(){
		$(this).find('time').each(function(){
			propertyInfo.push($(this).text());
		})
	})
	if (propertyInfo[2]) properties['Total Time']=propertyInfo[2];
	if (propertyInfo[0]) properties["Prep"]=propertyInfo[0];
	if (propertyInfo[1]) properties["Cook"]=propertyInfo[1];

	var name = $('.submitter__name').text()

	var servings = parseInt($('#metaRecipeServings')[0].content)
	var recipe = {title: title, instructions: directions, author:name, ingredients:ingredients, total_time: properties['Total Time'], prep_time: properties['Prep'], cook_time:properties['Cook']};
	if (servings) recipe.servings=servings
	console.log(site)
return recipe;
}).then(null, console.err)	
}
