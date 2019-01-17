let currentlyRenderingComponent;

const handler = {
  get: (target, key) => {
    console.log(`${key}  ->  ${currentlyRenderingComponent.name}`);
    return target[key];
  },
  set: (target, key, value) => {
    target[key] = value;
    return true;
  }
};

export function store(object) {
  return new Proxy(object, handler);
}

export function view(MyComponent) {
  return class Observer extends MyComponent {
    static displayName = `${MyComponent.name}__Observer`;
    name = `${MyComponent.name}__Observer`;
    render() {
      currentlyRenderingComponent = this;
      return super.render();
    }
  };
}

// let currentlyRenderingComponent;
// const reactionsMap = {};

// const handler = {
//   get: (target, key) => {
//     if (typeof target[key] === "function") {
//       return target[key];
//     }
//     if (!reactionsMap[key]) {
//       reactionsMap[key] = currentlyRenderingComponent;
//     }
//     return target[key];
//   },
//   set: (target, key, value) => {
//     target[key] = value;
//     reactionsMap[key].forceUpdate();
//     return true;
//   }
// };

// export function store(object) {
//   return new Proxy(object, handler);
// }

// export function view(MyComponent) {
//   return class Observer extends MyComponent {
//     static displayName = `${MyComponent.name}__Observer`;
//     name = `${MyComponent.name}__Observer`;
//     render() {
//       currentlyRenderingComponent = this;
//       return super.render();
//     }
//   };
// }

// window.reactionsMap = reactionsMap;
