import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observable, observe } from './observablabla';

import './index.css'

const store = observable({
  number: 0,
  incNumber: () => store.number++,

  text: 'hello',
  updateText: (text) => store.text = text,

  list: [],
  updateList: (val) => {
    if (!val) return;
    store.list = store.list.concat(val)
  },

  obj: { a: 1, b: 1 },
  updateObj: (key, value) => {
    store.obj = {
      ...store.obj,
      [key]: value
    };
  },
});

const Number = observe(class Number extends Component {
  render() {
    return (<div> {store.number} </div>)
  }
})

// const Number2 = observe(class Number extends Component {
//   render() {
//     return (<div> {store2.num} </div>)
//   }
// })

const List = observe(class List extends Component {
  state = { value: '' }

  render() {
    const { value } = this.state;
    return (<div>
      <input value={value} onChange={e => this.setState({ value: e.target.value })} />
      <button onClick={() => {
        store.updateList(value);
        this.setState({ value: '' })
      }}>
        push
      </button>
      <ul>
        {store.list.map((item, index) =>
          <li key={index}> {item} </li>
        )}
      </ul>
    </div>)
  }
})

const Text = observe(class Text extends Component {
  render() {
    return (
      <input value={store.text}
        onChange={e => store.updateText(e.target.value)}
      />
    );
  }
});

const NestedObject = observe(class NestedObject extends Component {
  render() {
    return (
      <div>
        {Object.entries(store.obj).map(([key, val], index) => (
          <div key={index}>
            <span> {key}: </span>
            <span> {val} </span>
            <button onClick={() => {
              store.updateObj(key, parseInt(val) + 1);
            }}>
              +
            </button>
          </div>
        ))}
      </div>
    )
  }
});

class App extends Component {
  render() {
    return <div>
      <Text />
      <div>
        <button onClick={store.incNumber} > store 1 + </button>
        <Number />
        {/* <Number2 /> */}
      </div>
      <List />
      <NestedObject />
    </div>;
  }
}

window.store = store;

ReactDOM.render(<App />, document.getElementById("root"));



