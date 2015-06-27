let React = require("react");
let Input = require("components/forms/input");
let $ = require("jquery");
const pLabelStyles = {
    fontWeight: "bold",
    display: "inline-block",
    textAlign: "left",
    width: "50%"
}
module.exports = React.createClass({
    handleItemChange(prop, id) {
        return (e) => {
            this.props.handleItemChange({prop,id,e})
        }
    },
    render() {
        let Initiative;
        if(this.props.disabled){
            Initiative = (
                <span>
                    <p style={pLabelStyles}>Initiative: </p>
                    <p style={pLabelStyles}>{this.props.item.get("initiative")}</p>
                </span>
            );
        } else {
            Initiative = <Input type={"number"} htmlFor={"Initiative"} value={this.props.item.get("initiative")} onChange={this.handleItemChange("initiative", this.props.id)}/>
        }
        return (
            <ul className="list-unstyled">
                <li>
                    <p style={pLabelStyles}>Name: </p>
                    <p style={pLabelStyles}>{this.props.item.get("name")}</p>
                </li>
                <li>
                    <p style={pLabelStyles}>HP: </p>
                    <p style={pLabelStyles}>{this.props.item.get("hp")}</p>
                </li>
                <li>
                    {Initiative}
                </li>
            </ul>
        );
    }
})
