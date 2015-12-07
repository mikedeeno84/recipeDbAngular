
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));


var recipeSchema = new mongoose.Schema({
	title: {type: String, required: true},
	instructions: {type: String, required: true},
	author: {type: String},	
	lastUpdatedAt: {type: Date, default: Date.now },
	dateCreated : {type: Date, default: Date.now },	
	ingredients: {type: [String], required: true}
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
module.exports = Recipe;
