var BootstrapModal = require("components/modals/bootstrap");
var EncounterActions = require("stores/encounters/encountersStore").actions;
var AddEncounterModalFormHeading = require("components/encounters/add/addEncounterModalFormHeading");
var AddEncounterModalStore = require("stores/modals/add/encounterModalStore").store;
var Input = require("components/forms/input");
var Encounter = require("models/encounter");
var Monster = require("models/monster");
var Player = require("models/player");
var Reflux = require("reflux");
var React = require("react");
var $ = require("jquery");
var _  = require("lodash");
var Immutable = require('immutable');
let PlayerCompoenent = require("components/encounters/add/player");
let MonsterCompoenent = require("components/encounters/add/monster");

let $modal;
let preventModalClose = function(e){
	e.preventDefault();
};
var AddEncounterModal = React.createClass({
	mixins: [Reflux.ListenerMixin],
	getInitialState() {
		return {
			encounter: new Encounter()
		}
	},
	componentDidMount() {
		$modal = $(this.refs.modal.getDOMNode());
		this.listenTo(AddEncounterModalStore, this.handleModalStore)
	},
	handleModalStore(dto) {

		if(dto.model){
			this.setState({
				encounter: dto.model
			});
		}
		if(dto.open){
			AddEncounterModal.open();
		} else {
			AddEncounterModal.close();
		}
	},
	header() {
		return <h3>Add Encounter</h3>
	},
	footer(){
		return (
			<span>
				<button type="button" className="btn btn-default" onClick={this.close}>Close</button>
	        	<button type="button" className="btn btn-primary" onClick={this.handleSave}>Save changes</button>
        	</span>
		);
	},
	body(){
		//todo
		// turn into child component
		let players = this.state.encounter.get("players").map((x, i) => {
			return <PlayerCompoenent
				key={i}
				player={x}
				onPlayerNameChange={this.handlePlayerNameChange(i)}
				onPlayerHitPointChange={this.handlePlayerHitPointChange(i)}
			/>
		});
		let monsters = this.state.encounter.get("monsters").map((x, i) => {
			return <MonsterCompoenent
				key={i}
				monster={x}
				onMonsterNameChange={this.handleMonsterNameChange(i)}
				onMonsterHitPointChange={this.handleMonsterHitPointChange(i)}
			/>
		});
		return (
			<form onSubmit={this.handleSubmit}>
				<h4>Encounter</h4>
				<Input htmlFor="Encounter Name" value={this.state.encounter.get("name")} onChange={this.handleEncounterNameChange}/>
				<hr />
				<div>
					<AddEncounterModalFormHeading heading="Players" onClick={this.handleAddPlayer}/>
						<ul className="list-unstyled">
							{
								players
							}
						</ul>
				</div>
				<hr />
				<div>
					<AddEncounterModalFormHeading heading="Monsters" onClick={this.handleAddMonster}/>
						<ul className="list-unstyled">
							{
								monsters
							}
						</ul>
				</div>
			</form>
		)
	},
	close(){
		$modal.modal("hide");
		this.setState({
			encounter: new Encounter()
		});
	},
	handleMonsterChange(index, prop){
		return (e) => {
			let value = $(e.target).val();
			let monsters = this.state.encounter
				.get("monsters")
				.update(index, m => m.set(prop, value))

			this.setState({
				encounter: this.state.encounter.set("monsters", monsters)
			});
		}
	},
	handleMonsterNameChange(index) {
		return this.handleMonsterChange(index, "name");
	},
	handleMonsterHitPointChange(index) {
		return this.handleMonsterChange(index, "hp");
	},
	handlePlayerChange(index, prop){
		return (e) => {
			let value = $(e.target).val();
			let players = this.state.encounter
				.get("players")
				.update(index, p => p.set(prop, value))
			this.setState({
				encounter: this.state.encounter.set("players", players)
			});
		}
	},
	handlePlayerNameChange(index) {
		return this.handlePlayerChange(index, "name");
	},
	handlePlayerHitPointChange(index) {
		return this.handlePlayerChange(index, "hp");
	},
	handleAddPlayer(e){
		preventModalClose(e);
		let newPlayers = this.state.encounter.get("players").push(new Player());
		let enc = this.state.encounter.set("players", newPlayers);
		this.setState({
			encounter: enc
		});
	},
	handleAddMonster(e){
		preventModalClose(e);
		let newMonsters = this.state.encounter.get("monsters").push(new Monster());
		let enc = this.state.encounter.set("monsters", newMonsters);
		this.setState({
			encounter: enc
		});
	},
	handleEncounterNameChange(e){
		var e = this.state.encounter.set("name", $(e.target).val());
		this.setState({
			encounter: e
		});
	},
	handleSubmit(){
		this.close()
	},
	handleSave(){
		EncounterActions.addEncounter(this.state.encounter);
		this.close();
	},
	render() {
		return (
			<BootstrapModal ref="modal" header={this.header()} body={this.body()} footer={this.footer()}/>
		);

	}
});

AddEncounterModal.open = function () {
	$modal.modal({
		keyboard: true,
		show: true,
	});
}

AddEncounterModal.close = function () {
	$modal.modal("hide");
}

module.exports = AddEncounterModal;
