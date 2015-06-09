var _ = require("lodash");

function Encounter(name, players, monsters, id=_.uniqueId()) {
	this.name = name || "";
	this.players = players || [];
	this.monsters = monsters || [];
	this.sorted = [];
	this.id = id;
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

Encounter.prototype.new = function({name, players, monsters}){
	let m = monsters || this.monsters;
	let p = players || this.players;
	let n = name || this.name;
	let id = this.id; 
	return new Encounter(n,p,m,id);
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
