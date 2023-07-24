/**
 * @format
 */
import { AppRegistry } from 'react-native';
import 'text-encoding-polyfill';
import App from './App';
import { name as appName } from './app.json';
import './app/localization/i18n';
import './shim';

AppRegistry.registerComponent(appName, () => App);
