var React = require('react');
var Input = require("components/forms/input");

module.exports = React.createClass({
    render() {
        
        return (
            <li key={this.props.key}>
                <h5>{this.props.monster.get("name") || "monster Name"}</h5>
                <Input htmlFor="monster Name" value={this.props.monster.get("name")} onChange={this.props.onMonsterNameChange} {...this.props}/>
                <Input htmlFor="Hit Points" value={this.props.monster.get("hp")} onChange={this.props.onMonsterHitPointChange} {...this.props}/>
            </li>
        );
    }
})
