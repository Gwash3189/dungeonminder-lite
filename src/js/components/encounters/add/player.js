var React = require('react');
var Input = require("components/forms/input");

module.exports = React.createClass({
    render() {
        return (
            <li key={this.props.key}>
                <h5>{this.props.player.get("name") || "Player Name"}</h5>
                <Input htmlFor="Player Name" value={this.props.player.get("name")} onChange={this.props.onPlayerNameChange} {...this.props}/>
                <Input htmlFor="Hit Points" value={this.props.player.get("hp")} onChange={this.props.onPlayerHitPointChange} {...this.props}/>
            </li>
        );
    }
})
