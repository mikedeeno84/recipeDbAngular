var request=require("request"),
	cheerio=require('cheerio'),
	rp = require('request-promise');

rp("http://www.yummly.com/recipe/Roast-Turkey-1390432")
.then(function(site){
	var $ = cheerio.load(site);
	var title = $('h1[itemprop=name]').text();
	// console.log(title)

// 	var directions='';
// 	$('.directions').each(function (element) {
// 		$(this).find('p').each(function(){
// 			directions += " " + $(this).text();
// 		})
// 	})

// 	var propertyTitles=[];
// 	var propertyInfo=[];
// 	var properties= {};
// 	$('.cooking-times dl').each(function(){
// 		$(this).find('dt').each(function(){
// 			if ($(this).text())
// 			propertyTitles.push($(this).text());
// 		})
// 		$(this).find('dd').each(function(){
// 			if ($(this).text())
// 			propertyInfo.push($(this).text());
// 		});
// 	})
// 	for (var i = 0; i < propertyTitles.length; i++) {
// 		properties[propertyTitles[i].slice(0,-1)]=propertyInfo[i]
// 	};
var name = $('.source-name a').text().replace(/\s\s+/g, ' ').slice(1);
	
var ingredients = []
	$('li[itemprop=ingredients]').each(function(){
		ingredients.push($(this).text().replace(/\s\s+/g, ' ').split('\n'))
	})

console.log(name)
	
	

// 	var recipe = {title: title, directions: directions, name:name, ingredients:ingredients, properties:properties};
// return recipe;
}).then(null, console.err)	

