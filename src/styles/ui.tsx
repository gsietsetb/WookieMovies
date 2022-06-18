import {extend} from 'consistencss';
import {palette} from './colors';

export const BASE_PIXEL = 4;

export const MOBILE = 375;
export const TABLET = 768;
export const DESKTOP = 1024;
export const DESKTOP_HUGE = 1440;

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
