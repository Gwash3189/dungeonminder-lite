var Reflux = require("reflux");
var EncounterList = require("models/encounterList");

var actions = Reflux.createActions([
	"openModal",
	"closeModal"
]);

var store = Reflux.createStore({
	listenables: actions,
	init: function() {
		this.open = false;
	},
	onOpenModal(model) {
		this.open = true;
		this.sync({
			open: this.open, 
			model: model
		});
	},
	onCloseModal(){
		this.open = false;
		this.sync({
			open: this.open
		});
	},
	sync(e) {
		this.trigger(e);
	}
});

module.exports = { actions, store }