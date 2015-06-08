var React = require("react");
var _ = require("lodash")

var PlayersList = React.createClass({
        render: function () {
        	var style = {
			    "position": "fixed",
			    "width": "56px",
			    "height": "56px",
			    "border": "none",
			    "right": "20px",
			    "bottom": "35px",
			    "boxSizing": "border-box",
			    "color": "#fff",
			    "display": "inline-block",
			    "boxShadow": "0 3px 6px rgba(0,0,0,.2),0 3px 6px rgba(0,0,0,.28)",
			    "WebkitTransform":"translateZ(1px)",
			    "MozTransform":"translateZ(1px)",
			    "OTransform":"translateZ(1px)",
			    "transform":"translateZ(1px)",
			    "zIndex": "2",
			    "textAlign": "center",
			    "padding": "6px 0",
			    "fontSize": "12px",
			    "borderRadius": "100%"
			};
			style = _.extend(style, this.props.style);
            return (
                <button {...this.props} onClick={this.props.onClick}
                 style={style}>
                 	<span style={{"paddingTop": "2px"}}>
                 		{this.props.children}
                 	</span>
             	</button>
            )
        }
    });


module.exports = PlayersList;