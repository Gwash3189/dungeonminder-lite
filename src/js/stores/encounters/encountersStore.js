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
		let exists = this.EncounterList.encounters.some(x => x.id === e.id);
		if(exists){
			let index = this.EncounterList.getIndexOfEncounter(e); 
			this.EncounterList.encounters[index] = e;
			this.sync(this.EncounterList.encounters);
		} else {
			this.EncounterList.add(e);
		}
		this.sync(this.EncounterList.encounters);
	},
	onRemoveEncounter(e){
		debugger;
		this.EncounterList.remove(e);
		this.sync(this.EncounterList.encounters);
	},
	sync(e) {
		this.trigger(e);
	}
});

module.exports = { actions, store }