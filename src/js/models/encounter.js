var _ = require("lodash");
var Immutable = require("immutable");
var validate = require("validate.js");

function Encounter({name="", players=[], monsters=[], id=_.uniqueId()}={}) {
	this.name = name || "";
	this.players = players || [];
	this.monsters = monsters || [];
	this.sorted = [];
	this.id = id;
	return Immutable.Map(this);
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
	debugger;
	
	const encounterMessages = validate(this, constraints, {format: "flat"});
	const playerMessages = _.flatten(this.players.map(x => x.validate()));
	const monsterMessages = _.flatten(this.monsters.map(x => x.validate()));
};

Encounter.prototype.add = {
	players: function(p){
		this.players.push(p);
	},
	monsters: function(e){
		this.monsters.push(e);
	}
};

Encounter.prototype.remove = {};
Encounter.prototype.remove.players = function(p, self){
	this.players = _.without(self.players, [p]);
};
Encounter.prototype.remove.monsters = function(e, self){
	this.monsters = _.without(self.monsters, [e]);
};

Encounter.prototype.new = function(){
	return Encounter.apply(this, arguments);
}

Encounter.prototype.clone = {};
Encounter.prototype.clone.players = function(newPlayers, self){
	return _.cloneDeep(self.players.concat(newPlayers));
};
Encounter.prototype.clone.monsters = function(newMonsters, self){
	return _.cloneDeep(self.monsters.concat(newMonsters));
};

Encounter.prototype.sort = function() {
	this.sorted = _.sortBy(this.players.concat(this.monsters), 'initiative');
	return this.sorted;
};

module.exports = Encounter;
