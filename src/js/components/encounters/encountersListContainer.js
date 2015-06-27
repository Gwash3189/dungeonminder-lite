var React = require("react");
var EncountersList = require("components/encounters/encountersList");
var FloatingActionButton = require("components/buttons/floatingActionButton");
var AddEncounterModal = require("components/encounters/add/addEncountersModal");
var EncountersListContainer = React.createClass({
	render: function() {
		return (
			<div>
				<div className="col-xs-offset-1 col-xs-10">
					<EncountersList></EncountersList>
				</div>
				<FloatingActionButton className="btn-primary" onClick={AddEncounterModal.open}>
					<i className="fa fa-plus fa-2x"></i>
				</FloatingActionButton>
				<AddEncounterModal />
			</div>
		);
	}
});

module.exports = EncountersListContainer;
