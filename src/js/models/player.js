var ListItem = require("models/listItem");
var _ = require("lodash");

function Player(name, hp, initiative){
	ListItem.call(this, name, hp, initiative);
}
Player.prototype = _.create(ListItem.prototype, {
	constructor: Player
});