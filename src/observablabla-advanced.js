const reactionsMap = new WeakMap();
let currentlyRenderingComponent;

export function store(object) {
  const handler = {
    get: function(target, key, receiver) {
      const componentMap = reactionsMap.get(target);
      reactionsMap.set(target, {
        [key]: currentlyRenderingComponent,
        ...componentMap
      });
      const result = Reflect.get(target, key, receiver);
      return result;
    },

    set: function(target, key, value) {
      const componentMap = reactionsMap.get(target);
      if (!componentMap[key]) {
        reactionsMap.set(target, {
          [key]: currentlyRenderingComponent,
          ...componentMap
        });
        currentlyRenderingComponent.forceUpdate();
        return Reflect.set(target, key, value);
      }
      componentMap[key].forceUpdate();
      return Reflect.set(target, key, value);
    }
  };
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
