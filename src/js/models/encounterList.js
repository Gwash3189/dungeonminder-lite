var encounter = require("models/encounter");
var _ = require("lodash");

function EncounterList(encounters) {
	// this.encounters = Array.isArray(encounters) ? 
	// 	encounters : 
	// 	(encounters.encounters || []);
	this.encounters = [];
}

EncounterList.prototype.add = function(encounter) {
	this.encounter.push(encounter);
};

EncounterList.prototype.remove = function(encounter) {
	this.encounters = _.without(this.encounters, [encounter]);
};

module.exports = EncounterList;
