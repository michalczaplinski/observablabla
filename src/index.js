import React, { Component } from "react";
import ReactDOM from "react-dom";
import { store, view } from "./observablabla-simplified";

import "./index.css";

const state = store({
  seconds: 0,
  updateSeconds: () => state.seconds++,

  number: 0,
  increment: () => state.number++,
  decrement: () => state.number--,

  text: "",
  updateText: text => {
    state.text = text;
  }
});

const Number = view(
  class Number extends Component {
    render() {
      return <div> Count: {state.number} </div>;
    }
  }
);

const Text = view(
  class Text extends Component {
    render() {
      return (
        <div>
          <input
            value={state.text}
            onChange={e => state.updateText(e.target.value)}
          />
          <div> {state.text} </div>
        </div>
      );
    }
  }
);

const Seconds = view(
  class Seconds extends Component {
    componentDidMount() {
      setInterval(() => state.updateSeconds(), 1000);
    }
    render() {
      return <div> Seconds: {state.seconds} </div>;
    }
  }
);

const App = view(
  class App extends Component {
    render() {
      return (
        <div>
          <Seconds />
          <hr />
          <Text />
          <hr />
          <Number />
          <hr />
          <div>
            <Number />
            <button onClick={() => state.increment()}> +1 </button>
            <button onClick={() => state.decrement()}> -1 </button>
          </div>
        </div>
      );
    }
  }
);

window.state = state;

ReactDOM.render(<App />, document.getElementById("root"));
