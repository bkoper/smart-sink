import {Dispatcher} from 'flux';

const flux = new Dispatcher();

export function register(cb) {
  return flux.register(cb);
}

export function dispatch(actionType, action) {
  flux.dispatch(actionType, action);
}
