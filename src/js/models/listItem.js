let _ = require("lodash")
function ListItem(name, hp) {
	this.name = name;
	this.hp = hp;
	this.initiative = 0
}

ListItem.prototype.clone = function() {
	return _.deepClose(this);
}

ListItem.prototype.new = function({name, hp}, f){
	let h = hp || this.hp;
	let n = name || this.name;
	return new f(n, hp);
}

module.exports = ListItem;