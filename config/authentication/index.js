var session = require('express-session');
var path = require('path');
var passport = require('passport');
var users = require('./users')



module.exports = function (app) {
	app.use(session({
		secret:'normally an ENV var',
		resave:false,
		saveUnintialized: false,
	}));

	// initialize passport and give it access to session info
	app.use(passport.initialize());
	app.use(passport.session());

	// when we give the cookie to the browser its just the userId(encrypted with our secret)
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		// find the user (we might use DB here instead)
		var user = users.filter(function (user) {
			return user.id === id;
		})[0];

		// done takes in the same arguments as traditional node callback
		// err and whatever info you want attached to the session
		done(null, user);
	})
}