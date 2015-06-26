let ListItem = require("models/listItem");
let Immutable = require('immutable');

function Player(...args){
	return ListItem.apply(args)
}
module.exports = Player;