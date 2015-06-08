let React = require("react");

module.exports = React.createClass({
	render() {
		return (
			<span style={
					{
						"width": "100%"
					}}>
					<span style={
						{
							"width": "80%", 
							"display": "inline-block"
						}}>
						<h4>{this.props.heading}</h4>
					</span>
					<span style={
						{
							"width": "20%"
						}}>
						<button onClick={this.props.onClick} className="btn btn-info">
							<i className="fa fa-plus"></i>
						</button>
					</span>
				</span>
		);
	}
});