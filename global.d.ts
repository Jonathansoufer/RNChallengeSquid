export declare global {
  export type ValueOf<T> = T[keyof T];
}

declare module 'react-native-config' {
  export interface NativeConfig {
    ENV: ENV;
    DEV_MIXPANEL_TOKEN: string;
    MIXPANEL_TOKEN: string;
    COINMARKETCAP_API_URL: string;
    COINMARKETCAP_API_KEY: string;
    SQUID_TEST_URL: string;
    SQUID_INTEGRATOR_ID: string;
    [name: string]: string | boolean;
  }
  export const Config: NativeConfig;
}
