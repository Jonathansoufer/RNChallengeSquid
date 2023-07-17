import { Platform } from 'react-native';

export class Device {
  static isIos() {
    return Platform.OS === 'ios';
  }

  static isAndroid() {
    return Platform.OS === 'android';
  }

  static isWeb() {
    return Platform.OS === 'web';
  }
}
