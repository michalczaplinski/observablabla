import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observable, observe } from "./observablabla";

import "./index.css";

const store = observable({
  number: 0,
  increment: () => store.number++,
  decrement: () => store.number--,

  text: "hello",
  updateText: text => (store.text = text),

  list: [],
  updateList: val => {
    if (!val) return;
    store.list = store.list.concat(val);
  }
});

const Number = observe(
  class Number extends Component {
    render() {
      return <div> {store.number} </div>;
    }
  }
);

const List = observe(
  class List extends Component {
    state = { value: "" };

    render() {
      const { value } = this.state;
      return (
        <div>
          <input
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
          />
          <button
            onClick={() => {
              store.updateList(value);
              this.setState({ value: "" });
            }}
          >
            push
          </button>
          <ul>
            {store.list.map((item, index) => (
              <li key={index}> {item} </li>
            ))}
          </ul>
        </div>
      );
    }
  }
);

const Text = observe(
  class Text extends Component {
    render() {
      return (
        <input
          value={store.text}
          onChange={e => store.updateText(e.target.value)}
        />
      );
    }
  }
);

class App extends Component {
  render() {
    return (
      <div>
        <Text />
        <div>
          <button onClick={store.increment}> +1 </button>
          <button onClick={store.decrement}> -1 </button>
          <Number />
        </div>
        <List />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
