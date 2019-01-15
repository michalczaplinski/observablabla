import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import { observable, observe } from './observablabla';

const store = observable({
  newTodo: '',
  todos: {},
  filter: 'all',
  addTodo: () => {
    store.todos = {
      ...store.todos,
      [uuid.v4()]: { content: store.newTodo, done: false }
    };
    store.updateNewTodo('');
  },
  updateNewTodo: content => { store.newTodo = content },
  deleteTodo: id => {
    const newTodos = store.todos;
    delete newTodos[id];
    store.todos = newTodos;
  },
  toggleDone: id => {
    store.todos = {
      ...store.todos,
      [id]: { ...store.todos[id], done: !store.todos[id].done }
    }
  },
  setActiveFilter: filter => { store.filter = filter; },
  clearCompleted: () => {
    const newTodos = store.todos;
    for (let [id, todo] of Object.entries(newTodos)) {
      if (todo.done) {
        delete newTodos[id]
      }
    }
    store.todos = newTodos;
  }
})


const Todo = observe(class Todo extends React.Component {
  render() {
    const { id, todo } = this.props;
    return (
      <li key={id}>
        <button onClick={() => store.toggleDone(id)}> {todo.done ? "⌧" : "✔"} </button>
        <span>
          {todo.done ? <s>{todo.content}</s> : todo.content}
        </span>
        <button onClick={() => store.deleteTodo(id)}> ❌ </button>
      </li>
    )
  }
})

const TodoApp = observe(class TodoApp extends React.Component {
  render() {
    const todos = Object.entries(store.todos).filter(([id, item]) => {
      if (store.filter === 'all') {
        return true;
      }
      if (store.filter === 'active') {
        if (item.done) {
          return false;
        } else {
          return true
        }
      }
      if (store.filter === 'completed') {
        if (item.done) {
          return true
        } else {
          return false;
        }
      }
    });

    return (
      <span>
        <input value={store.newTodo} onChange={e => store.updateNewTodo(e.target.value)} />
        <button onClick={store.addTodo}> add </button>
        <ul>
          {todos.map(([id, value]) => (
            <Todo key={id} id={id} todo={value} />
          ))}
        </ul>
        <div>
          SHOW:
          <div>
            <button onClick={() => store.setActiveFilter('all')} > ALL </button>
            <button onClick={() => store.setActiveFilter('active')} > ACTIVE </button>
            <button onClick={() => store.setActiveFilter('completed')} > COMPLETED </button>
          </div>
        </div>
        <br />
        <button onClick={store.clearCompleted} > CLEAR COMPLETED </button>
      </span>
    )
  }
})

window.store = store;

ReactDOM.render(<TodoApp />, document.getElementById("root"));
