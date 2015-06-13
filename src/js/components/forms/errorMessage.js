var React = require("react");

module.exports = React.createClass({
	getInitialState() {
		return {
			el : (this.props.formGroup || {getDOMNode(){return false}}).getDOMNode()
		}
	},
	render(){
		debugger;
		const className = "has-error";
		if (this.state.el && this.state.el.classList) {
			this.state.el.className += ' ' + className;
		}
		return (
			 <div className="alert alert-danger" role="alert">
			 	{this.props.children}
			 </div>
		);
	}
})