var cheerio=require('cheerio'),
    rp = require('request-promise'),
    fs = require('fs');
var siteUrl='http://allrecipes.com/recipe/12181/no-bake-peanut-butter-pie/'
rp(siteUrl).then(function (site) {
    fs.writeFile('test.txt', site);
})