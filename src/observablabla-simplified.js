const reactionsMap = {};
let currentlyRenderingComponent;

const handler = {
  get: function(target, key) {
    if (typeof currentlyRenderingComponent === "undefined") {
      return Reflect.get(target, key);
    }
    if (!reactionsMap[key]) {
      reactionsMap[key] = [currentlyRenderingComponent];
    }
    const hasComponent = reactionsMap[key].find(
      comp => comp.ID === currentlyRenderingComponent.ID
    );
    if (!hasComponent) {
      reactionsMap[key].push(currentlyRenderingComponent);
    }
    return Reflect.get(target, key);
  },

  set: function(target, key, value) {
    if (!reactionsMap[key]) {
      reactionsMap[key] = [currentlyRenderingComponent];
    }
    reactionsMap[key].forEach(component => component.forceUpdate());
    return Reflect.set(target, key, value);
  }
};

export function store(object) {
  return new Proxy(object, handler);
}

export function view(MyComponent) {
  return class Observer extends MyComponent {
    ID = `${Math.floor(Math.random() * 10e9)}`;
    static displayName = `${MyComponent.name}__Observer`;

    render() {
      currentlyRenderingComponent = this;
      const renderValue = super.render();
      currentlyRenderingComponent = undefined;
      return renderValue;
    }
  };
}

window.reactionsMap = reactionsMap;
