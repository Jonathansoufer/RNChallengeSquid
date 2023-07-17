/**
 * This file contains all spacing constants used in the app so that we can avoid, different looking and feelings
 */
import { initialSafeAreaInsets } from './layout';
import { Platform } from 'react-native';

/**
 * @prop xs - 2
 * @prop sm - 4
 * @prop base - 8
 * @prop regular - 12
 * @prop md - 16
 * @prop lg - 24
 * @prop xl - 32
 * @prop xxl - 40
 */
export enum Spacing {
  xs = 2,
  sm = 4,
  base = 8,
  regular = 12,
  md = 16,
  lg = 24,
  xl = 32,
  xxl = 40,
}

export const safeBottom =
  Platform.OS === 'ios' ? initialSafeAreaInsets.bottom + 12 : 40;
