var _ = require("lodash");

function Encounter(name, players, monsters) {
	this.name = name || "";
	this.players = players || [];
	this.monsters = monsters || [];
	this.sorted = [];
};

Encounter.prototype.add = {
	player: function(p){
		this.players.push(p);
	},
	monsters: function(e){
		this.monsters.push(e);
	}
};

Encounter.prototype.remove = {
	player: function(p){
		this.players = _.without(this.players, [p]);
	},
	monsters: function(e){
		this.monsters = _.without(this.monsters, [e]);
	}
};

Encounter.prototype.sort = function() {
	this.sorted = _.sortBy(this.players.concat(this.monsters), 'initiative');
	return this.sorted;
};

module.exports = Encounter;
