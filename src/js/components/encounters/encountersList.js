var React = require("react");
var {Navigation} = require('react-router');
var Reflux = require("reflux");
var EncountersStore = require("stores/encounters/encountersStore");
var AddEncounterModalActions = require("stores/modals/add/encounterModalStore").actions;
var Immutable = require("Immutable");
var $ = require("jquery");
var EncounterList = require("models/encounterList");

var EncountersList = React.createClass({
	mixins: [Reflux.ListenerMixin, Navigation],
	getInitialState() {
		return {
			encounters: Immutable.List()
		};
	},
	updateEncounters(encounters){
		this.setState({encounters});
	},
	componentDidMount(){

		this.listenTo(EncountersStore.store, this.updateEncounters, this.updateEncounters);
	},
	editEncounter(model) {
		return function() {
			AddEncounterModalActions.openModal(model)
		}
	},
	removeEncounter(model) {
		return function() {
			EncountersStore.actions.removeEncounter(model);
		}
	},
	handleNavigationToEncounter(id) {
		return (e) => {

			if($(e.target).prop("tagName").toLowerCase() !== "button"){
				this.transitionTo("encounter", {id: id})
			}
		}
	},
	render: function() {
		const list = this.state.encounters.map((x,i) => {
			return (
				<div key={i}  className="media well well-sm">
					<div className="media-body" onClick={this.handleNavigationToEncounter(x.get("id"))}>
		        		<h4 className="media-heading">
		        			{x.get("name")}
		    			</h4>
	        			<div style={{width: "100%"}}>
	        				<div style={{width: "70%" , display: "inline-block"}}>
	        					<p>{x.get("monsters").count()} Monsters. {x.get("players").count()} Players</p>
	        				</div>
	        				<div style={{width: "15%", display: "inline-block"}}>
	        					<button className="btn btn-info btn-sm" onClick={this.editEncounter(x)}>
	        						<i className="fa fa-edit"></i>
        						</button>
	        				</div>
	        				<div style={{width: "15%", display: "inline-block"}}>
	        					<button className="btn btn-danger btn-sm" onClick={this.removeEncounter(x)}>
        							<i className="fa fa-remove"></i>
    							</button>
	        				</div>
		        		</div>
		      		</div>
				</div>
			);
		});
		return (
			<div>
				{
					list.count() === 0 ?
						<h1 className="text-center text-muted">No Encounters</h1> :
						list
				}
			</div>
		)
	}
});

module.exports = EncountersList;
