import {extend} from 'consistencss';
import {palette} from './colors';
import {Dimensions} from 'react-native';

export const BASE_PIXEL = 4;

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export const respColumns = (itemWidth: number = 80) =>
  Math.floor((deviceWidth - BASE_PIXEL * 10) / itemWidth);

export const MOBILE = 375;
export const TABLET = 768;
export const DESKTOP = 1024;
export const DESKTOP_HUGE = 1440;

export const isNarrow = deviceWidth < TABLET;

export const uiKit = () =>
  extend({
    sizing: {
      base: BASE_PIXEL,
    },
    layout: {
      xs: 0,
      sm: 411,
      md: 568,
      lg: TABLET,
      xl: DESKTOP,
      xxl: DESKTOP_HUGE,
    },
    colors: palette,
  });

export const bordColor = (color = palette.white) => ({
  borderWidth: 1,
  borderColor: color,
});
export const topRadius = (rad = 4) => ({
  borderTopLeftRadius: rad * BASE_PIXEL,
  borderTopRightRadius: rad * BASE_PIXEL,
});
