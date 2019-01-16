// const reactionsMap = {};
// let currentlyRenderingComponent;

const handler = {
  get: (target, key) => {
    console.log(`accessing key: ${key}`);
    return Reflect.get(target, key);
  },
  set: (target, key, value) => {
    console.log(`setting key ${key} to value ${value}`);
    return Reflect.set(target, key, value);
  }
};

// export function store(object) {
//   return new Proxy(object, handler);
// }

// export function view(MyComponent) {
//   return class Observer extends MyComponent {
//     ID = `${Math.floor(Math.random() * 10e9)}`;
//     static displayName = `${MyComponent.name}__Observer`;

//     render() {
//       currentlyRenderingComponent = this;
//       const renderValue = super.render();
//       currentlyRenderingComponent = undefined;
//       return renderValue;
//     }
//   };
// }
