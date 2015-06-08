global.jQuery = require('jquery');
require('bootstrap/dist/js/npm');
var React = require("react");

var Modal = React.createClass({
	render() {
		return (
			<div className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							{this.props.header}
						</div>
						<div className="modal-body">
							{this.props.body}
						</div>
						<div className="modal-footer">
							{this.props.footer}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Modal;