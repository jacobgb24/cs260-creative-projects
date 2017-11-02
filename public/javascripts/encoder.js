var alphabet = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"; //possible values in short URL 0,O,I excluded for clarity
var base = alphabet.length;

//converts base 10 number to new base
function encode(num) {
	console.log("ENCODE CALLED");
	var encoded = "";
	while(num) {
		var remainder = num % base;
		num = Math/floor(num / base);
		encoded = alphabet[remainder].toString() + encoded;
	}
	console.log();
	return encoded;
}
//decodes back to base10
function decode(str) {
	var decoded = 0;
	while(str) {
		var index = alphabet.indexOf(str[0]);
		var pow = str.length - 1;
		decoded += index * (Math.pow(base, pow));
		str = str.substring(1); //cuts first char off after processing
	}
	return decoded;
}
