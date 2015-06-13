var React = require("react");

module.exports = React.createClass({
	render(){
		let type = this.props.type || "text";
		return (
			 <div className="form-group">
                <label className="control-label" htmlFor={this.props.htmlFor}>{this.props.htmlFor}</label>
                <input type={type} id={this.props.htmlFor} className="form-control input-lg"  {...this.props}/>
            </div>
		);
	}
})