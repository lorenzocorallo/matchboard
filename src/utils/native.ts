/* eslint-disable no-extend-native */
String.prototype.toCapitalCase = function () {
	return this[0].toUpperCase() + this.substring(1);
};
