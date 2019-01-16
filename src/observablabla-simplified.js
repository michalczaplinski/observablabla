const reactionsMap = {};
let currentlyRenderingComponent;

const handler = {
  get: function(target, key) {
    if (!reactionsMap[key]) {
      reactionsMap[key] = [currentlyRenderingComponent];
    }
    const hasComponent = reactionsMap[key].find(
      comp => comp.ID === currentlyRenderingComponent.ID
    );
    if (!hasComponent) {
      reactionsMap[key].push(currentlyRenderingComponent);
    }
    const result = Reflect.get(target, key);
    return result;
  },

  set: function(target, key, value) {
    if (!reactionsMap[key]) {
      reactionsMap[key] = [currentlyRenderingComponent];
      // currentlyRenderingComponent.forceUpdate();
      // return Reflect.set(target, key, value);
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
      return super.render();
    }
  };
}

window.reactionsMap = reactionsMap;
