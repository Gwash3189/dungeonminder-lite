var Reflux = require("reflux");
var EncounterList = require("models/encounterList");

var actions = Reflux.createActions([
	"addEncounter",
	"removeEncounter"
]);

var store = Reflux.createStore({
	listenables: actions,
	init: function() {
		this.EncounterList = new EncounterList();
	},
	onAddEncounter(e) {
		this.EncounterList.add(e);
		this.sync(this.EncounterList.encounters);
	},
	onRemoveEncounter(e){
		this.EncounterList.remove(e);
		this.sync(this.EncounterList.encounters);
	},
	sync(e) {
		this.trigger(e);
	}
});

module.exports = { actions, store }