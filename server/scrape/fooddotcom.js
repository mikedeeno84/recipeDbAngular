var cheerio=require('cheerio'),
	rp = require('request-promise');

module.exports = function(siteURL){
return rp(siteURL)
.then(function(site){
	var $ = cheerio.load(site);

	var title = $('title').text().split('-')[0].slice(0,-8);

	var directions='';
	$('.directions li').each(function () {
		directions += $(this).text() + " ";
	})

	var properties = {};
	var total_time='';
	$('.total-time span').each(function(){
		total_time += $(this).text() + " "
	})
	var prep = $('.prep-time small').text()
	var cook = $('.cook-time small').text()

	
	var ingredients = [].slice.call($('.ingredients li'),0)
	.map(function(li){
		return $(li).text();
	})
	var name = $('.fd-byline a span:nth-child(2)').text()

	properties["Total time"] = total_time.slice(0,-1)
	properties["Prep"] = prep;
	properties["Cook"] = cook;

	var servings = parseInt($('.servings').find('.value').text())

	var recipe = {servings: servings, title: title, instructions: directions, author:name, ingredients:ingredients, total_time: properties['Total Time'], prep_time: properties['Prep'], cook_time:properties['Cook']};

return recipe;
}).then(null, console.err)	
}