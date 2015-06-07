var React = require("react");
var EncountersList = require("components/encounters/encountersList");

var EncountersListContainer = React.createClass({
	render: function() {
		return (
			<div className="col-xs-offset-1 col-xs-10">
				<EncountersList> </EncountersList>
			</div>
		);
	}
});

module.exports = EncountersListContainer;