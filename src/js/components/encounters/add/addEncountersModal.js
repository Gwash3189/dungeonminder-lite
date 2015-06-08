var BootstrapModal = require("components/modals/bootstrap");
var EncounterActions = require("stores/encounters/encountersStore").actions;
var AddEncounterModalFormHeading = require("components/encounters/add/addEncounterModalFormHeading");
var Input = require("components/forms/input");
var Encounter = require("models/encounter");
var Monster = require("models/monster");
var Player = require("models/player");
var React = require("react");
var $ = require("jquery");
var _  = require("lodash");


let $modal;
let preventModalClose = function(e){
	e.preventDefault();
};
var AddEncounterModal = React.createClass({
	getInitialState() {
		return {
			encounter: new Encounter("", [], [])
		}
	},
	componentDidMount() {
		$modal = $(this.refs.modal.getDOMNode());
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
		let players = this.state.encounter.players.map((x, i) => {
			return (
				<li key={i}>
					<h5>{x.name || "Player Name"}</h5>
					<Input htmlFor="Name" onChange={this.handlePlayerNameChange(i)}/>
					<Input htmlFor="Hit Points" onChange={this.handlePlayerHitPointChange(i)}/>
				</li>
			);
		});
		return (
			<form onSubmit={this.handleSubmit}>
				<h4>Encounter</h4>
				<Input htmlFor="Encounter Name" onChange={this.handleEncounterNameChange}/>
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

				</div>
			</form>
		)
	},
	close(){
		$modal.modal("hide");
	},
	handlePlayerChange(index, prop){
		return (e) => {
			let value = $(e.target).val();
			let players = this.state.encounter.clone.players([], this.state.encounter);
			let p = players[index];
			p[prop] = value;

			p = Player.prototype.new(p, Player);
			players[index] = p;

			this.setState({
				encounter: this.state.encounter.new({
					players
				})
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
		let enc = this.state.encounter.new({
			players: this.state.encounter.clone.players([new Player()], this.state.encounter)
		});
		this.setState({
			encounter: enc
		});
	},
	handleAddMonster(e){
		preventModalClose(e);
		let enc = this.state.encounter.new({
			monsters: this.state.encounter.clone.monsters([new Monster()], this.state.encounter)
		});
		this.setState({
			encounter: enc
		});
	},
	handleEncounterNameChange(e){
		var e = new Encounter($(e.target).val(), this.state.encounter.players, this.state.encounter.monsters);
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