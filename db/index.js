var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));

