var React = require("react");
var Reflux = require("reflux");
var EncountersStore = require("stores/encounters/encountersStore");
var AddEncounterModalActions = require("stores/modals/add/encounterModalStore").actions;


var EncountersList = React.createClass({
	mixins: [Reflux.ListenerMixin],
	getInitialState() {
		return {
			encounters: []
		};
	},
	updateEncounters(encounters){
		this.setState({encounters});
	},
	componentDidMount(){
		this.listenTo(EncountersStore.store, this.updateEncounters);
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
	render: function() {
		const list = this.state.encounters.map((x,i) => {
			return (
				<div key={i} className="media well well-sm">
					<div className="media-body">
		        		<h4 className="media-heading">
		        			{x.name}
		    			</h4>
	        			<div style={{width: "100%"}}>
	        				<div style={{width: "70%" , display: "inline-block"}}>
	        					<p>{x.get("monsters").length} Monsters. {x.get("players").length} Players</p>
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
		return (<div>
				{
					list.length === 0 ?
						<h1 className="text-center text-muted">No Encounters</h1> :
						list
				}
			</div>
		)
	}
});

module.exports = EncountersList;