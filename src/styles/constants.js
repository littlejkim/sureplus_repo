const PRIMARY_COLOR = '#7610EB';
const ERROR_COLOR = '#FF3B30';
const BACKGROUND_COLOR_LIGHT = '#FFFFFF';
const BACKGROUND_COLOR_DARK = '#17171b';

const LightTheme = {
  dark: false,
  colors: {
    primary: PRIMARY_COLOR,
    background: BACKGROUND_COLOR_LIGHT,
    title: 'black',
    mainText: 'black',
    subText: 'white',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: PRIMARY_COLOR,
    background: BACKGROUND_COLOR_DARK,
    title: 'white',
    mainText: 'white',
    subText: 'black',
  },
};

export {
  LightTheme,
  DarkTheme,
  PRIMARY_COLOR,
  ERROR_COLOR,
  BACKGROUND_COLOR_DARK,
  BACKGROUND_COLOR_LIGHT,
};
