import { LogBox } from 'react-native';

import * as Sentry from '@sentry/react-native';

LogBox.ignoreLogs([
  "EventEmitter.removeListener('url', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
  '[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.',
  'Possible Unhandled Promise Rejection',
  'rendered size is not usable. Either the height or width is too small',
  'In React 18',
]);

export function log(...args: any[]) {
  if (__DEV__) {
    console.log(...args.map(arg => (typeof arg === 'function' ? arg() : arg)));
  }
}

export function warn(...args: any[]) {
  if (__DEV__) {
    console.warn(...args.map(arg => (typeof arg === 'function' ? arg() : arg)));
  } else {
    Sentry.captureException(args);
  }
}
