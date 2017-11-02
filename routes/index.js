var express = require('express');
var router = express.Router();

var urls = [];
router.get('/', function(req, res) {
	res.sendFile('index.html', {
		root: 'public'
	});
});

router.post('/api/short', function(req, res) {

	var longUrl = req.body.longUrl;
	console.log("URL " +longUrl);
	var shortUrl = req.get('Host') + '/' +  encode(Math.floor(Math.random() * 150000) + 1000);
	console.log("SHORT " + shortUrl);
	urls.push({"longUrl": longUrl, "shortUrl": shortUrl});
	res.end('{"success" : "Updated Successfully", "status" : 200}');

});

router.get('/getUrls', function(req, res) {
	res.send(urls);
});

router.get('/:shortened_id', function(req, res) {
	var shortUrl = req.get('Host') + '/' + req.params.shortened_id;
	console.log("SHR " + shortUrl);
	var longUrl = getLongUrl(urls, shortUrl);
	console.log("redirecting: " + longUrl);
	res.redirect(longUrl);
});

module.exports = router;

var alphabet = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"; //possible values in short URL 0,O,I excluded for clarity
var base = alphabet.length;

//converts base 10 number to new base
function encode(num) {
	console.log("ENCODE CALLED");
	var encoded = "";
	while(num) {
		var remainder = num % base;
		num = Math.floor(num / base);
		encoded = alphabet[remainder].toString() + encoded;
	}
	console.log();
	return encoded;
}
function getLongUrl(arr, shortU) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].shortUrl == shortU) return arr[i].longUrl;
	}
}
