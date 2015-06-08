var React = require("react");
var EncountersStore = require("stores/encounters/encountersStore");
var Reflux = require("reflux");

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
	render: function() {
		const list = this.state.encounters.map((x,i) => {
			return (
				<div key={i} className="media well well-sm">
					<div className="media-body">
		        		<h4 className="media-heading">
		        			{x.name}
		    			</h4>
	        			<div style={{width: "100%"}}>
	        				<div style={{width: "80%" , display: "inline-block"}}>
	        					<p>{x.monsters.length} Monsters. {x.players.length} Players</p>
	        				</div>
	        				<div style={{width: "20%", display: "inline-block"}}>
	        					<a href="#"><i className="fa fa-edit"></i></a>
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