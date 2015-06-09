var ListItem = require("models/listItem");
var _ = require("lodash");

function Player(name, hp){
	ListItem.call(this, name, hp);
}
Player.prototype = _.create(ListItem.prototype, {
	constructor: Player
});

module.exports = Player;