require("styles/styles.js");
var React = require('react');
var { Route, DefaultRoute, run } = require('react-router');


var routes = (
    <Route name="home" path="/" handler={require('react-router-proxy!./components/home/homeContainer')}>
    	<DefaultRoute handler={require('react-router-proxy!./components/encounters/encountersListContainer')} />
    </Route>
);

run(routes, function (Handler, state) {
    React.render(<Handler/>, document.getElementById("app"))
})
