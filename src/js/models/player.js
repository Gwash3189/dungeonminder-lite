var ListItem = require("models/listItem");
var _ = require("lodash");

function Player(name, hp){
	ListItem.call(this, name || "", hp || 0);
}
Player.prototype = _.create(ListItem.prototype, {
	constructor: Player
});

module.exports = Player;