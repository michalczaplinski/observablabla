import React, { Component } from "react";
import ReactDOM from "react-dom";
import { store, view } from "./observablabla";

import "./index.css";

const state = store({
  // text: "hello",
  number: 0,
  increment: () => state.number++,
  decrement: () => state.number--
});

const App = view(
  class App extends Component {
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

window.state = state;
ReactDOM.render(<App />, document.getElementById("root"));
