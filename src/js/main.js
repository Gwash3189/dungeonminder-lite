require("styles/styles.js");
var { Route, run, DefaultRoute } = require("react-router");
var React = require("react");


var routes = (
    <Route name="home" path="/">
    	<DefaultRoute handler={require('react-router-proxy!./components/home/homeContainer')} />
    </Route>
);

run(routes, function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params}/>, document.body)
})
