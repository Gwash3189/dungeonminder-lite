let React = require("react");
let RunEncounterList = require("components/encounters/run/runEncounterList");
let FloatingActionButton = require("components/buttons/floatingActionButton");
let Reflux = require("reflux");
let EncountersStore = require("stores/encounters/encountersStore");
let Immutable = require("immutable");
let Encounter = require("models/encounter");
let {State, Navigation} = require("react-router");
const clashIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADi0lEQVRYR8WXgXEaMRBFQwWxKwhUELsCQwW2KwhUEFxBzhUEV5CjAtsV+FJB4gpyqSB2BeQ/ze7NInSAGWasGc1x0p72/7+rlRh8eOc2OJb/1Wp1orVOBoNB+5Y1jwLAnP+R41YAzg8GoIWG+nioRZpti2AXmep9LPsn9UeNX/V9K7up5us4v6GAjF5kMM8N40eyQeZ72dwwrvdKj2/qo74QyGah+bHmz3YBeJDBpXot41nOxuT+x7jmEwGNoRjyT3vsf2gcZZa5TUmBuQy/20K/9ZzoI1TpmrH5qoFT5kw1wpLbwRbnzvpaNhDsWgkA2ZwYWmNRQAAmNVOhNVYMIW2VgYQxzlmP9iob/90PwBzUen6JC+p3YhtA4LBRhx3hinNDjbErYrvNQTJZ3IZiyKK/sgWu9Y4KL+7Mdg250BpwGOJ8rO5h9GWKCdpbB7R4rkIjRxNLOHZJFxJzjuQVWS4b5j4HAkX2vQoENjD7GBaa6Dcs79UBcWe2bDGSEpVozHv7qx9neYL65NZKKCawiosBiEpXqdfqxJ15QgYYxol9TLbzXK0ArpwD0aAQipkWrKlqsiPOOHs26b2G+BK90u+lgBtZ3GGJ00bdCwsmz+pjdcIQd85G0YnE3grAJQUEkvv7o4E6yDkg9joNrfBQ6+eBxZ1knxdCtBfzvRWwkw7Jh/bRawgFJ6CXWaaTcwPFNiRf1rZrHoZtdQCZSTLi7u2nvQMmB5VOUDlHpViECA/J2FXKCKKvErL91uq43ikyi3D0+jokoYO8oDYYiErjXkNaU6PZqoCVVhyPg+FSv2GF1DCLknseRMBIzjEOY0DEncE2vfHSjQ8/z5GbSsYH3pCbdxbMQwFrJE+MrGAh9afwfY0z9aE6cxc2B7CFvr2NAGIBiY4BBXvfdiRg8bZkOwVbdou3zpklM4QcCBeY0dqNRpOghnHJMSxAnpLJHE7tG+4DkGAcxjiK0reMyWZpQAB6qffuSuUMdzp2anYr4oR8sMSEEQRS6wGSFFHn3EhXeFcAxFE6TjDGHkrbxxbn0JmQB+GGtBGeEBrU8hwBCGvPYgiIDRnP7aZxJqWnnQ3Yjzyjw/ak+HRKxO/tAANIyoMYArYRchaLRbYI2zDdljyEJjlh9LtkLwizHerJf4Rqr7MgV8FuPCTkGtNwLnBtO92mos8dBKBvYYs3al4JAM+d7agAdnorGLw7gP84Qbcw4q9YHwAAAABJRU5ErkJggg==";
const encounterStarted = {
	"backgroundColor": "red"
};
module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin, State, Navigation],
	getInitialState() {
		return {
			encounter: new Encounter(),
			started: false
		};
	},
	findEncounter(encounters) {
		const encounterId = this.getParams().id;
		return encounters.find(x => x.get("id") === encounterId);
	},
	updateEncounter(encounters){
		const encounter = this.findEncounter(encounters);
		if(encounter){
			this.setState({encounter});
		} else {
			this.transitionTo("/");
		}
	},
	componentDidMount(){
		this.listenTo(EncountersStore.store, this.updateEncounter, this.updateEncounter);
	},
	toggleEncounter() {
		this.setState({
			started : !this.state.started
		});
	},
	goToRoot() {
		this.transitionTo("/")
	},
	render() {
		let button;
		if(!this.state.started){
			button = (<FloatingActionButton className="btn-primary" onClick={this.toggleEncounter}>
				<img src={clashIcon} style={{"marginTop": "-3px"}} />
			</FloatingActionButton>)
		} else {
			button = (<FloatingActionButton className="btn-primary" style={encounterStarted} onClick={this.toggleEncounter}>
				<img src={clashIcon} style={{"marginTop": "-3px"}} />
			</FloatingActionButton>)
		}
		return (
			<div>
				<div className="col-xs-offset-1 col-xs-10">
					<RunEncounterList started={this.state.started} encounter={this.state.encounter}></RunEncounterList>
				</div>
					{
						button
					}
					<FloatingActionButton className="btn-primary" style={{bottom: "110px"}} onClick={this.goToRoot}>
						<i className="fa fa-arrow-left fa-2x"></i>
					</FloatingActionButton>
			</div>
		)
	}
});
