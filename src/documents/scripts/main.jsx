/** @jsx React.DOM */

// Create a pattern (of steps)
var Pattern = React.createClass({
  getInitialState: function() {
    return {
      pattern: this.props.pattern
    }
  },

  onClick: function(e){
    var index = e.nativeEvent.target.attributes['data-step'].value;

    // Remove element, and insert new step value in its place
    this.state.pattern.splice(index, 1, this.state.pattern[index] === 1 ? 0 : 1);

    // Update item
    this.setState({ pattern: this.state.pattern });
  },

  render: function() {
    // Return a step
    var createStep = function(step, index) {
      return (
        <li data-step={index} className={'step ' + step} onClick={this.onClick}>{step}</li>
      );
    };

    // Create pattern by mapping sequece steps
    return (
      <ul>
        {this.state.pattern.map(createStep, this)}
      </ul>
    );
  }
});

// Create a list of instruments (each with its own Pattern)
var InstrumentList = React.createClass({
  // Set the sequence of this
  getInitialState: function() {
    return {
      patterns: this.props.patterns
    };
  },

  render: function() {
    // Return another instrument
    var createInstrument = function(item) {
      return (
        <li>
          <h4>{item.name}</h4>
          <Pattern id={item.pattern} pattern={this.state.patterns[item.pattern]}></Pattern>
        </li>
      );
    };

    // Create instrument list
    return (
      <ul>
        {this.props.instruments.map(createInstrument, this)}
      </ul>
    );
  }
});

var Controls = React.createClass({
  getInitialState: function() {
    return {}
  },

  onPlay: function() {
    console.log('play');
  },

  onStop: function() {
    console.log('stop');
  },

  render: function() {
    return (
      <div>
        <button onClick={this.onPlay}>Play</button>
        <button onClick={this.onStop}>Stop</button>
      </div>
    );
  }
})

var Counter = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      counter: {},
      tempo: this.props.tempo
    }
  },

  tick: function() {
    // @todo loop back at max pattern length
    this.setState({count: this.state.count + 1});
  },

  start: function() {
    var rate = 1000 / (tempo * 60);

    this.interval = setInterval(this.tick, rate);
  },

  stop: function() {
    clearInterval(this.interval);
  },

  render: function() {
    return (
      <div />
    );
  }
})

var Application = React.createClass({
  getInitialState: function() {
    return {
      instruments: this.props.project.instruments,
      patterns: this.props.project.patterns,
      tempo: this.props.project.tempo
    };
  },

  render: function() {
    return (
      <div>
        <h3>Instrument List</h3>
        <Counter tempo={this.state.tempo} />
        <InstrumentList instruments={this.state.instruments} patterns={this.state.patterns} />
        <Controls />
      </div>
    );
  }
});

$.getJSON("project.json", function(json) {
  React.renderComponent(
    <Application project={json} />,
    document.getElementById('example')
  );
 });
