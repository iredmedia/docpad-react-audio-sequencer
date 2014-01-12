/** @jsx React.DOM */

var SetIntervalMixin = {
	// Invoked immediately before rendering occurs. If you call setState within this method,
	// render() will see the updated state and will be executed only once despite the state change.

	// Create a new instance of intervals
  componentWillMount: function() {
    this.intervals = [];
  },

  // Add interval to new scope
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },

  // Invoked immediately after rendering occurs. At this point in the lifecycle, the component has a
  // DOM representation which you can access via the rootNode argument or by calling this.getDOMNode().
	// If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
	// or send AJAX requests, perform those operations in this method.
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var TickTock = React.createClass({
  // Use the mixin
  mixins: [SetIntervalMixin],

  // Create initial values for state!
  getInitialState: function() {
    return {
      seconds: 0,
      decaSeconds: 0
    };
  },

  // Invoked immediately after rendering occurs (get dom rep by rootNode argument or calling this.getDOMNode().)
  componentDidMount: function(rootNode) {
    // Display this components DOM representation!
    console.log(rootNode);

    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },

  // Update state
  tick: function() {
    var seconds = this.state.seconds + 1;
    this.setState({
      seconds: seconds,
      decaSeconds: seconds * 10
    });
  },

  // Invoked immediately before rendering when new props or state are being received.
  // This method is not called for the initial render.

  // On state change, basically.
  componentWillUpdate: function(nextProps, nextState) {
    console.log(nextProps, nextState);
  },

  // Render this node out
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds. <br />
        React has been running for {this.state.decaSeconds} seconds.
      </p>
    );
  }
});

React.renderComponent(
  <TickTock />,
  document.getElementById('example')
);
