import React, { Component } from "react";
import ReactDOM from "react-dom";
import { store, view } from "./observablabla-simplified";

import "./index.css";

const state = store({
  text: "",
  updateText: newText => {
    state.text = newText;
  },

  number: 0,
  increment: () => state.number++,
  decrement: () => state.number--
});

const Text = view(
  class Text extends Component {
    render() {
      return (
        <div>
          <input onChange={e => state.updateText(e.target.value)} />
          <div> {state.text} </div>
        </div>
      );
    }
  }
);

const Counter = view(
  class Counter extends Component {
    render() {
      return (
        <div>
          <div> Count: {state.number} </div>
          <button onClick={() => state.increment()}> +1 </button>
          <button onClick={() => state.decrement()}> -1 </button>
        </div>
      );
    }
  }
);

const App = view(
  class App extends Component {
    render() {
      return (
        <div>
          <Text />
          <hr />
          <Counter />
        </div>
      );
    }
  }
);

window.state = state;
ReactDOM.render(<App />, document.getElementById("root"));
