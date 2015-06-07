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
		<div>
			{
				this.state.encounters.map(x => {
					return (
						<div className="media well well-sm">
							<div className="media-body">
				        		<h4 className="media-heading">
				        			{x.name}
				    			</h4>
				        		<p>{x.monster.length} Monsters. {x.players.length} Players</p>
				      		</div>
						</div>
					)
				})
			}
		</div>
	}
});

module.exports = EncountersList;