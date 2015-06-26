var Reflux = require("reflux");
var EncounterList = require("models/encounterList");

var actions = Reflux.createActions([
	"addEncounter",
	"removeEncounter"
]);

var store = Reflux.createStore({
	listenables: actions,
	getInitialState() {
		return this.EncounterList.get("encounters");
	},
	init: function() {
		this.EncounterList = new EncounterList();
	},
	onAddEncounter(e) {

		let exists = this.EncounterList.get("encounters").some(x => x.get("id") === e.get("id"));
		if(exists){
			let index = this.EncounterList.indexOf(e);
			this.EncounterList = this.EncounterList.get("encounters").update(index, _ => e);
			this.sync(this.EncounterList.get("encounters"));
		} else {
			this.EncounterList = this.EncounterList.set("encounters", this.EncounterList.get("encounters").push(e));
		}
		this.sync(this.EncounterList.get("encounters"));
	},
	onRemoveEncounter(e){

		this.EncounterList.delete(this.EncounterList.indexOf(e));
		this.sync(this.EncounterList.get("encounters"));
	},
	sync(e) {
		this.trigger(e);
	}
});

module.exports = { actions, store }
