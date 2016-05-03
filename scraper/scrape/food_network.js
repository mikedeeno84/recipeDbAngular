var cheerio=require('cheerio'),
	rp = require('request-promise');

module.exports = function(siteURL){
return rp(siteURL)
.then(function(site){
	var $ = cheerio.load(site);

	var title = $('h1[itemprop=name]').text();

	var directions='';
	$('.directions').each(function (element) {
		$(this).find('p').each(function(){
			directions += " " + $(this).text();
		})
	})

	var propertyTitles=[];
	var propertyInfo=[];
	var properties= {};
	$('.cooking-times dl').each(function(){
		$(this).find('dt').each(function(){
			if ($(this).text())
			propertyTitles.push($(this).text());
		})
		$(this).find('dd').each(function(){
			if ($(this).text())
			propertyInfo.push($(this).text());
		});
	})
	for (var i = 0; i < propertyTitles.length; i++) {
		properties[propertyTitles[i].slice(0,-1)]=propertyInfo[i]
	};
	var name = $('.copyright').text().split(" ").slice(-2).join(" ");
	
	var ingredients = [].slice.call($('li[itemprop=ingredients]'),0)
	.map(function(li){
		return li.children[0].data;
	})
	
	var servings = parseInt($('.difficulty').find($('dd')).eq(0).text())
	var recipe = {servings: servings, title: title, instructions: directions, author:name, ingredients:ingredients, total_time: properties['Total Time'], prep_time: properties['Prep'], cook_time:properties['Cook']};
return recipe;
}).then(null, console.err)	
}