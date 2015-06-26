var ListItem = require("models/listItem");
var Immutable = require("immutable");

function Monster(...args){
	return ListItem(args);
}

module.exports = Monster;