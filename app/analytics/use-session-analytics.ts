import useAppState from 'react-native-appstate-hook';

import { mixpanel, Events, track } from '../analytics';

export function useSessionAnalytics() {
  useAppState({
    onForeground: () => {
      mixpanel.timeEvent(Events.SESSION);
      mixpanel.flush();
    },
    onBackground: () => {
      track(Events.SESSION);
      mixpanel.flush();
    },
  });
}
