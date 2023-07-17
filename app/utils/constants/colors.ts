/**
 * This file contains all the colors used in the app.
 * It is used by the ThemeProvider to provide the colors to the app.
 */

const tintColorLight = '#066BF9';
const tintColorDark = '#fff';

const alert = '#F90505';
const wasabi = '#80FB44';
const vitamin = '#FF5722';

const rare = '#F90505';
const white = '#ffffff';
const black = '#000000';
const kirby = '#F972FA';

const gray100 = '#121212';
const gray200 = '#1C1C1C';
const gray300 = '#2A2A2D';
const gray400 = '#6B7280';
const gray500 = '#9E9E9E';
const ice = '#f2f2f2';

const lightblue = '#066BF9';
const mainblue = '#2566E4';
const buttonblue = '#3066db';
const stake = '#F972FA';
const liquid = '#7A6BF9';
const robin = '#9FE0EF';
const vault = '#066BF9';
const lend = '#9C7C35';
const lazer = '#F927F7';
const yuzu = '#E9FF00';

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  vitamin,
  alert,
  wasabi,
  rare,
  white,
  black,
  gray100,
  gray200,
  gray300,
  gray400,
  gray500,
  lightblue,
  stake,
  liquid,
  ice,
  robin,
  vault,
  lend,
  kirby,
  lazer,
  yuzu,
  mainblue,
  buttonblue,
  pill: gray100,
  border: gray100,
  separator: gray100,

  transparent: 'transparent',
} as const;

type ColorsType = typeof Colors;

type ValuesOfNestedObject<T extends Record<string, any>> = {
  [Key in keyof T]: T[Key] extends string
    ? T[Key]
    : ValuesOfNestedObject<T[Key]>;
}[keyof T & string];

export type ColorValues = ValuesOfNestedObject<ColorsType>;
