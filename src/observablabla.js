const reactionsMap = {};
//    Mapping from the key name to the component that needs to be rerendered
//    {
//      [store_key1]: ComponentToBeRerendered
//      [store_key2]: ComponentToBeRerendered
//    }

// let currentlyRenderingComponent;

const handler = {
  get: (target, key) => {
    return Reflect.get(target, key);
  },
  set: (target, key, value) => {
    console.log(`setting key ${key} to value ${value}`);
    return Reflect.set(target, key, value);
  }
};
