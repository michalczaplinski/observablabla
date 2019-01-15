import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observable, observe } from "./observablabla";

import "./index.css";

const store = observable({
  seconds: 0,
  updateSeconds: () => store.seconds++,

  number: 0,
  increment: () => store.number++,
  decrement: () => store.number--,

  text: "",
  updateText: text => {
    store.text = text;
  }
});

const Number = observe(
  class Number extends Component {
    render() {
      return <div> count : {store.number} </div>;
    }
  }
);

const Text = observe(
  class Text extends Component {
    render() {
      return (
        <div>
          <input
            value={store.text}
            onChange={e => store.updateText(e.target.value)}
          />
          <div> {store.text} </div>
        </div>
      );
    }
  }
);

const Seconds = observe(
  class Seconds extends Component {
    componentDidMount() {
      setInterval(store.updateSeconds, 1000);
    }
    render() {
      return <div> Seconds: {store.seconds} </div>;
    }
  }
);

class App extends Component {
  render() {
    return (
      <div>
        <Seconds />
        <hr />
        <Text />
        <hr />
        <div>
          <Number />
          <button onClick={store.increment}> +1 </button>
          <button onClick={store.decrement}> -1 </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
