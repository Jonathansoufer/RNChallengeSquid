/**
 * This file contains available themes in the app.
 */
export const baseTheme = {
  colors: {
    rare: '#FF0048',
    white: '#ffffff',
    black: '#000000',
  },
  font: {
    normal: 'Roboto-Regular',
    medium: 'Roboto-Medium',
  },
};

export const defaultTheme = {
  ...baseTheme,
  name: 'DEFAULT',
};

export const glyphTheme = {
  ...baseTheme,
  font: {
    normal: 'System',
    medium: 'System',
  },
  name: 'GLYPH',
};

export const getAllThemes = () => {
  return [defaultTheme, glyphTheme];
};
