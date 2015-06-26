var Encounter = require("models/Encounter");
var Immutable = require("immutable");

function EncounterList(encounters) {
	return Immutable.Map({
		encounters: Immutable.List(encounters)
	});
}

module.exports = EncounterList;
