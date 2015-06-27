var _ = require("lodash");
var Immutable = require("immutable");
var validate = require("validate.js");

function Encounter({name="", players=[], monsters=[], id=_.uniqueId()}={}) {
	return Immutable.Map({
		name,
		players: Immutable.List(players),
		monsters: Immutable.List(monsters),
		id
	});
};

Encounter.prototype.validate = function() {
	const constraints = {
		name: {
			presence: true,
			length: {
				minimum: 1
			}
		},
		players: {
			length: {
				minimum: 1,
				message: "One player is required"
			}
		},
		monsters: {
			length: {
				minimum: 1,
				message: "One monster is required"
			}
		}
	};


	const encounterMessages = validate(this, constraints, {format: "flat"});
	const playerMessages = _.flatten(this.players.map(x => x.validate()));
	const monsterMessages = _.flatten(this.monsters.map(x => x.validate()));
};
module.exports = Encounter;
