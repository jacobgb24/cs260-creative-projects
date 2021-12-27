var crypto = require('crypto');
var mongoose = require('mongoose'),
	User = mongoose.model('User');

function hashPW(pwd) {
	return crypto.createHash('sha256').update(pwd).
	digest('base64').toString();
}
exports.signup = function(req, res) {
	console.log("Begin exports.signup");
	var user = new User({
		username: req.body.username
	});
	console.log("after new user exports.signup");
	user.set('hashed_password', hashPW(req.body.password));
	console.log("after hashing user exports.signup");
	user.set('email', req.body.email);
	console.log("after email user exports.signup");
	user.save(function(err) {
		console.log("In exports.signup");
		console.log(err);
		if (err) {
			res.session.error = err;
			res.redirect('/signup');
		} else {
			req.session.user = user.id;
			req.session.username = user.username;
			req.session.msg = 'Authenticated as ' + user.username;
			req.session.entries = user.entries;
			res.redirect('/');
		}
	});
};
exports.login = function(req, res) {
	User.findOne({
			username: req.body.username
		})
		.exec(function(err, user) {
			if (!user) {
				err = 'User Not Found.';
			} else if (user.hashed_password ===
				hashPW(req.body.password.toString())) {
				req.session.regenerate(function() {
					console.log("login");
					console.log(user);
					req.session.user = user.id;
					req.session.username = user.username;
					req.session.msg = 'Authenticated as ' + user.username;
					req.session.entries = user.entries;
					res.redirect('/');
				});
			} else {
				err = 'Authentication failed.';
			}
			if (err) {
				req.session.regenerate(function() {
					req.session.msg = err;
					res.redirect('/login');
				});
			}
		});
};
exports.getUserProfile = function(req, res) {
	User.findOne({
			_id: req.session.user
		})
		.exec(function(err, user) {
			if (!user) {
				res.json(404, {
					err: 'User Not Found.'
				});
			} else {
				console.log("GET" + user);
				res.json(user);
			}
		});
};
exports.updateUser = function(req, res) {
	console.log("UPDATE:" + req.body);
	console.log("NEW:" + req.body.entry);
	User.findOne({
			_id: req.session.user
		})
		.exec(function(err, user) {
			user.entries.push(req.body.entry);
			user.save(function(err) {
				if (err) {
					res.sessor.error = err;
				} else {
					console.log(user.entries);
					req.session.entries.push(req.body.entry);
				}
				res.redirect('/user');
			});
		});
};
exports.deleteEntries = function(req, res) {
	User.findOne({
			_id: req.session.user
		})
		.exec(function(err, user) {
			user.entries = [];

			user.save(function(err) {
				if (err) {
					res.sessor.error = err;
				} else {
					console.log(user.entries);
					req.session.entries = [];
				}
				res.redirect('/user');
			});
		});
};
