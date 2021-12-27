var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PasteDB = mongoose.model('PlasterDB');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('index.html', {
		root: 'public'
	});
});

router.get('/plaster/:url', function(req, res, next) {
	var urlReq = req.originalUrl.substring(req.originalUrl.lastIndexOf('/') + 1);
	console.log(urlReq);
	PasteDB.find({ url: urlReq }, function(err, paste) {
		res.json(paste);
	});
});
router.post('/plaster', function(req, res, next) {
	var plaster = new PasteDB(req.body);
	plaster.save(function(err, plaster) {
		if (err) {
			return next(err);
		}
		res.json(plaster);
	});

});
router.get('/*', function(req, res, next) {
	res.sendFile('paste.html', {
		root: 'public'
	});
});
module.exports = router;
