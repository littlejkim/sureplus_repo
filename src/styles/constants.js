const PRIMARY_COLOR = '#8610EB';
const BACKGROUND_COLOR_LIGHT = '#F1F2F4';
const BACKGROUND_COLOR_DARK = '#17171b';

const LightTheme = {
  dark: false,
  colors: {
    primary: PRIMARY_COLOR,
    background: BACKGROUND_COLOR_LIGHT,
    text: 'white',
    mainText: 'black',
    subText: 'white',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: PRIMARY_COLOR,
    background: BACKGROUND_COLOR_DARK,
    text: 'white',
    mainText: 'white',
    subText: 'black',
  },
};

export {
  LightTheme,
  DarkTheme,
  PRIMARY_COLOR,
  BACKGROUND_COLOR_DARK,
  BACKGROUND_COLOR_LIGHT,
};
