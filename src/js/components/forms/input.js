var React = require("react");

module.exports = React.createClass({
	render(){
		return (
			 <div className="form-group">
                <label htmlFor={this.props.htmlFor}>{this.props.htmlFor}</label>
                <input type="text" id={this.props.htmlFor} className="form-control input-lg"  {...this.props}/>
            </div>
		);
	}
})