let _ = require("lodash")
let validate = require("validate.js");
let Immutable = require("immutable")

function ListItem({name, hp, initiative=0, id=_.uniqueId()}={}) {
	return Immutable.Map({
		name,
		hp,
		initiative,
		id
	})
}

ListItem.prototype.validate = function(){
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
	return validate(this, constraints);
}

module.exports = ListItem;
