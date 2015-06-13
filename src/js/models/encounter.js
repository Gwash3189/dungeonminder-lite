let _ = require("lodash");
let Immutable = require("immutable");
let validate = require("validate.js");
let ListItem = require("models/listItem");

function Encounter({name="", players=[], monsters=[], id=_.uniqueId()}={}) {
	this.name = name || "";
	this.players = players || [];
	this.monsters = monsters || [];
	this.sorted = [];
	this.id = id;
	return Immutable.Map(this);
};


Encounter.prototype.validate = function(obj) {
	const constraints = {
		name: {
			presence: true,
			length: {
				minimum: 1,
				message: "Encounter name can't be blank"
			}
		},
		players: {
			presence: true,
			length: {
				minimum: 1,
				message: makeListMessage("player")
			}
		},
		monsters: {
			presence: true,
			length: {
				minimum: 1,
				message: makeListMessage("monster")
			}		
		}
	};
	debugger;
	const encounterMessages = validate((obj || this), constraints, {format: "flat"}) || [];
	const playerMessages = _.flatten((obj || this).players.map(x => x.toJS()).map(x => ListItem.prototype.validate(x))) || [];
	const monsterMessages = _.flatten((obj || this).monsters.map(x => x.toJS()).map(x => ListItem.prototype.validate(x))) || [];
	return [].concat(encounterMessages, playerMessages, monsterMessages);

	function makeListMessage(listName){
		return `One ${listName} is required.`
	}
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
