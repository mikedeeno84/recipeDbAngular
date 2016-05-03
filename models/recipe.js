
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));

var ingredientSchema = new mongoose.Schema({
	quantity: {type: Number},
	ingredient: {type: String}

})

var recipeSchema = new mongoose.Schema({
	title: {type: String, required: true},
	instructions: {type: String, required: true},
	author: {type: String},	
	lastUpdatedAt: {type: Date, default: Date.now },
	dateCreated : {type: Date, default: Date.now },	
	ingredients: {type: [ingredientSchema], required: true},
	total_time: {type: String},
	prep_time: {type: String},
	cook_time: {type: String},
	servings: {type: Number}
});


recipeSchema.statics.findByTitle = function (title, callbackFn){
	return this.findOne({ title: title }, callbackFn).exec()
};

recipeSchema.post('save', function(doc){
	doc.lastUpdatedAt = Date.now()
})

function tagReturner (tags){
	return tags.join(", ")
}


var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = {Recipe: Recipe};
