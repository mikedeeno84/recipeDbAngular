// spec.js
process.env.testing = true;

var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/test'
mongoose.connect(dbURI);
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));
var clearDB = require('mocha-mongoose')(dbURI);


require('../app');

var rootUrl = 'http://localhost:3000/'
describe('E2E testing for Recipe App', function() {
	
	// establish db connection
	beforeEach(function(done){
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	// clear DB after each test
	afterEach(function (done) {
		clearDB(done);
	});

	describe('some stupid test that help me get the hang of this', function () {
		beforeEach(function (done) {
			browser.get(rootUrl)
				.then(done)
		});
	  it('should have a title', function() {

	    expect(browser.getTitle()).toEqual('My Recipes');
	  });

	})
	describe('creating a new recipe', function () {
		beforeEach(function(done){
			browser.get(rootUrl + '/recipes/add')
				.then(done)
		});
		it('Should add by copying and pasting link', function(done){
			var recipeUrl = 'http://www.foodnetwork.com/recipes/alton-brown/eggs-benedict-recipe.html';
			var input = element(by.model('recipeUrl'));
			input.sendKeys(recipeUrl);
			expect(input.getAttribute('value')).toBe(recipeUrl);
			var submit = $('.urlSubmit');
			submit.click()
				.then(function(){
	    		return browser.getCurrentUrl();
				})
				.then(function (url) {
					expect(url).not.toBe(rootUrl + '/recipes/add')

					var recipeTitle = element(by.binding('recipe.title'));
					expect(recipeTitle.getText()).toEqual("Eggs Benedict");
				})
				.then(done)
		})
	});


});