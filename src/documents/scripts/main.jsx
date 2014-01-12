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

var Application = React.createClass({
  getInitialState: function() {
    return {
      instruments: this.props.project.instruments,
      patterns: this.props.project.patterns
    };
  },

  render: function() {
    return (
      <div>
        <h3>Instrument List</h3>
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

// /** @jsx React.DOM */

// var UserGist = React.createClass({
//   getInitialState: function() {
//     return {
//       username: '',
//       lastGistUrl: ''
//     };
//   },

//   componentDidMount: function() {
//     $.get(this.props.source, function(result) {
//       var lastGist = result[0];

//       this.setState({
//         username: lastGist.user.login,
//         lastGistUrl: lastGist.html_url
//       });
//     }.bind(this));
//   },

//   render: function() {
//     return (
//       <div>
//         {this.state.username}s last gist is
//         <a href={this.state.lastGistUrl}>here</a>.
//       </div>
//     );
//   }
// });

// React.renderComponent(
//   <UserGist source="https://api.github.com/users/octocat/gists" />,
//   document.getElementById('example')
// );


// /** @jsx React.DOM */

// var Counter = {
//   // Invoked immediately before rendering occurs. If you call setState within this method,
//   // render() will see the updated state and will be executed only once despite the state change.

//   // Create a new instance of intervals
//   componentWillMount: function() {
//     this.intervals = [];
//   },

//   // Add interval to new scope
//   setInterval: function() {
//     this.intervals.push(setInterval.apply(null, arguments));
//   },

//   // Invoked immediately after rendering occurs. At this point in the lifecycle, the component has a
//   // DOM representation which you can access via the rootNode argument or by calling this.getDOMNode().
//   // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
//   // or send AJAX requests, perform those operations in this method.
//   componentWillUnmount: function() {
//     this.intervals.map(clearInterval);
//   }
// };

// var Indicator = React.createClass({
//   // Use the mixin
//   mixins: [Counter],

//   getInitialState: function() {
//     return {
//       step: 0,
//       currentStepClass: 'current' + 0,
//       tempo: 120
//     };
//   },

//   componentDidMount: function(rootNode) {
//     var tempo = this.state.tempo,
//         rate = 1000 / (tempo / 60);

//     // Call a method on the mixin
//     this.setInterval(this.tick, rate);
//   },

//   componentWillUpdate: function(nextProps, nextState) {},

//   // Count up to 16
//   tick: function() {
//     var step = this.state.step >= 7 ? 0 : this.state.step + 1;

//     this.setState({
//       step: step,
//       currentStepClass: 'current' + step
//     });
//   },

//   render: function() {
//     return (
//       <div className={this.state.currentStepClass}>
//         <div className='indicator indicator0'></div>
//         <div className='indicator indicator1'></div>
//         <div className='indicator indicator2'></div>
//         <div className='indicator indicator3'></div>

//         <div className='indicator indicator4'></div>
//         <div className='indicator indicator5'></div>
//         <div className='indicator indicator6'></div>
//         <div className='indicator indicator7'></div>
//       </div>
//     );
//   }
// });

// React.renderComponent(
//   <Indicator />,
//   document.getElementById('example')
// );
