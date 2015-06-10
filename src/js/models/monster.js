var ListItem = require("models/listItem");
var Immutable = require("immutable");

function Monster(name, hp){
	return Immutable.Map(ListItem.call(this, name, hp));
}
Monster.prototype = _.create(ListItem.prototype, {
	constructor: Monster
});

module.exports = Monster;