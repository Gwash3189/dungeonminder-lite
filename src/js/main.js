require("styles/styles.js");
var {Route, run, DefaultRoute } = require("react-router");
var React = require("react");
var document = require("document");


var routes = (
    <Route name="home" path="/" handler={HomeContainer}>
    </Route>
);

run(routes, function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params}/>, document.body)
})
