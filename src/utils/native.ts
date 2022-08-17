/* eslint-disable no-extend-native */
String.prototype.toCapitalCase = function () {
	return this[0].toUpperCase() + this.substring(1);
};

String.prototype.toInt = function () {
	if (this === "") return 0;
	const parsed = parseInt(this.toString(), 10);
	if (isNaN(parsed)) return 0;
	return parsed;
};
