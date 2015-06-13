let _ = require("lodash")
let validate = require("validate.js");

function ListItem({name, hp}={}) {
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

ListItem.prototype.validate = function(obj){
	debugger;
	const constraints = {
		name: {
			presence: true,
			length: {
				minimum: 1,
				message: "Provide a player name"
			}
		},
		hp: {
			presence: true, 
			numericality: {
				message: "HP can only contain numbers"
			}
		}
	};
	return validate(obj || this, constraints);
}

module.exports = ListItem;