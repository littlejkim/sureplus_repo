const PRIMARY_COLOR = '#8610EB';
const SECONDARY_COLOR = '#FFFFFF';
const BACKGROUND_COLOR_LIGHT = '#F1F2F4';
const BACKGROUND_COLOR_DARK = '#17171b';
const TEXT_REGULAR = 'AvenirNextCyr-Regular';
const TEXT_DEMI = 'AvenirNextCyr-Demi';
const TEXT_BOLD = 'AvenirNextCyr-Bold';
const HEADER_TEXT_SIZE = 17;

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
  SECONDARY_COLOR,
  BACKGROUND_COLOR_DARK,
  BACKGROUND_COLOR_LIGHT,
  TEXT_REGULAR,
  TEXT_BOLD,
  TEXT_DEMI,
  HEADER_TEXT_SIZE,
};
