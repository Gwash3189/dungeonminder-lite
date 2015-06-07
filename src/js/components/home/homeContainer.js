var React = require("react");
var { RouteHandler } = require("react-router");

var HomeContainer = React.createClass({
	render: function() {
		return (
			<div className="container-fluid" style={{paddingTop: "60px"}}>
				<div className="row">
					<RouteHandler/>
				</div>
			</div>
		);
	}
});

module.exports = HomeContainer;