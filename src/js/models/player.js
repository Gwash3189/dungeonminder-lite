let ListItem = require("models/listItem");
let Immutable = require('immutable');

function Player(name, hp){
	return Immutable.Map(ListItem.call(this, name, hp));
}
Player.prototype = _.create(ListItem.prototype, {
	constructor: Player
});

module.exports = Player;