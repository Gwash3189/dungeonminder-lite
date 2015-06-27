var React = require("react");
var Immutable = require("immutable");
let EncountersStore = require("stores/encounters/encountersStore");
var ListItem = require("./runEncounterListItem");
var $ = require("jquery");

module.exports = React.createClass({
	getInitialState() {
		return {
			playersAndMonsters : Immutable.List()
				.concat(
					this.props.encounter.get("players"),
			 		this.props.encounter.get("monsters")
				)
		}
	},
	componentWillReceiveProps(nextProps){
		this.setState({ playersAndMonsters: Immutable.List().concat(
				nextProps.encounter.get("players"),
				nextProps.encounter.get("monsters")
			)
		});
		if(nextProps.started){

			let newList = Immutable.List().concat(nextProps.encounter.get("players"),nextProps.encounter.get("monsters"))
			newList = newList.sort((a,b) => b.get("initiative") - a.get("initiative"));
			this.setState({
				playersAndMonsters: newList
			});
		}
	},
	onItemChange({e,prop,id}) {
		const value = $(e.target).val();
		let oldValue = this.state.playersAndMonsters.find((x, i) => x.get("id") === id);
		let newItem = oldValue.set(prop, value);
		let playersIndex = this.props.encounter.get("players").indexOf(oldValue);
		let monstersIndex = this.props.encounter.get("monsters").indexOf(oldValue);
		let newEncounter;
		if(playersIndex > -1){
			let newPlayers = this.props.encounter.get("players").update(playersIndex, x => x.merge(newItem));
			newEncounter = this.props.encounter.set("players", newPlayers);
		} else if(monstersIndex > -1) {
			let newMonsters = this.props.encounter.get("monsters").update(monstersIndex, x => x.merge(newItem));
			newEncounter = this.props.encounter.set("monsters", newMonsters);
		}

		EncountersStore.actions.addEncounter(newEncounter);
	},
	render() {
		return (
			<div key={this.props.encounter.get("id")}  className="media well well-sm">
				<div className="media-body" >
					<h4 className="media-heading">
						{this.props.encounter.get("name")}
					</h4>
					<div style={{width: "100%"}}>
						<ul className="list-unstyled">
							{
								this.state.playersAndMonsters.map((x,i) => {
									return <ListItem id={x.get("id")} handleItemChange={this.onItemChange} disabled={this.props.started} item={x} key={i} />
								})
							}
						</ul>
					</div>
				</div>
			</div>
		)
	}
});
