var ListItem = require("models/listItem");
var _ = require("lodash");

function Monster(name, hp, initiative){
	ListItem.call(this, name, hp, initiative);
}
Monster.prototype = _.create(ListItem.prototype, {
	constructor: Monster
});