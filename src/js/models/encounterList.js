var encounter = require("models/encounter");
var _ = require("lodash");

function EncounterList(encounters) {
	this.encounters = [];
}

EncounterList.prototype.add = function(encounter) {
	this.encounters.push(encounter);
};

EncounterList.prototype.remove = function(encounter) {
	this.encounters = this.encounters.filter(x => x.id !== encounter.id);
};

EncounterList.prototype.getIndexOfEncounter = function(encouter){
	let index = -1;
	this.encounters.some((x,i) => {
		if(x.id === encouter.id){
			index = i;
			return true;
		}
		return false;
	});
	return index;
}

module.exports = EncounterList;
