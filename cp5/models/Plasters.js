var mongoose = require('mongoose');
var PlasterSchema = new mongoose.Schema({
	url: String,
	title: String,
	body: String
});
mongoose.model('PlasterDB', PlasterSchema);
