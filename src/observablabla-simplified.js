const reactionsMap = {};
let currentlyRenderingComponent;

const handler = {
  get: function(target, key) {
    if (!reactionsMap[key]) {
      reactionsMap[key] = currentlyRenderingComponent;
    }
    const result = Reflect.get(target, key);
    return result;
  },

  set: function(target, key, value) {
    const component = reactionsMap[key];
    if (!component) {
      reactionsMap[key] = currentlyRenderingComponent;
      currentlyRenderingComponent.forceUpdate();
      return Reflect.set(target, key, value);
    }
    component.forceUpdate();
    return Reflect.set(target, key, value);
  }
};

export function store(object) {
  return new Proxy(object, handler);
}

export function view(MyComponent) {
  return class Observer extends MyComponent {
    static displayName = `${MyComponent.name}__Observer`;
    render() {
      currentlyRenderingComponent = this;
      return super.render();
    }
  };
}

window.reactionsMap = reactionsMap;
