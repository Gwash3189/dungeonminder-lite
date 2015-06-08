var ListItem = require("models/listItem");
var _ = require("lodash");

function Monster(name, hp){
	ListItem.call(this, name || "", hp || 0);
}
Monster.prototype = _.create(ListItem.prototype, {
	constructor: Monster
});

module.exports = Monster;