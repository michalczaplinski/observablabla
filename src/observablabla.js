//
//
//    REACTIONS_MAP
//
//
//

// const reactionsMap = {};
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
