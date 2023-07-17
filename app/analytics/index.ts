import { Mixpanel } from 'mixpanel-react-native';
import { Config } from 'react-native-config';
import { getUniqueId } from 'react-native-device-info';

import { Events } from './events';
export { Events };

export * from './use-performance-analytics';
export * from './use-session-analytics';

const trackAutomaticEvents = true;
export const mixpanel = new Mixpanel(
  Config.DEV_MIXPANEL_TOKEN,
  trackAutomaticEvents,
);
mixpanel.init();

export const track = (event: Events, props?: { [x: string]: any }) => {
  mixpanel.track(event, props);
};

export const registerSuperProps = (props: { [x: string]: any }) => {
  mixpanel.registerSuperPropertiesOnce(props);
};

registerSuperProps({ 'Kado Device ID': getUniqueId() });
