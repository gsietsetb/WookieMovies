import C, {apply} from 'consistencss';
import {isSmall} from './sizes';

const prevFonts = {
  roboto: {
    regular: 'Roboto', // 400
    bold: 'Roboto-Bold', // 700
    semiBold: 'Roboto-Medium', // 500
  },
  workSans: {
    regular: 'WorkSans-Regular', // 400
    semiBold: 'WorkSans-SemiBold', // 600
  },
};
const titleFont = 'Baloo2';
export const wFonts = {
  mainTitle: {
    fontFamily: titleFont,
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 43.2,
  },
  heroTitle: {
    fontFamily: titleFont,
    fontSize: isSmall ? 28 : 48,
    lineHeight: isSmall ? 38 : 58,
    fontWeight: '500',
  },
  cta1: {
    fontFamily: titleFont,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
  },
  title1: {
    fontFamily: titleFont,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  highlight: {
    fontFamily: 'Karla',
    fontSize: 20,
  },
  textBold: {
    fontFamily: 'Karla',
    fontSize: 16,
    fontWeight: 'bold',
  },
  body1: {
    fontFamily: 'Karla',
    fontSize: 16,
    lineHeight: 22.4,
  },
  subtitle: {
    fontFamily: 'Karla',
    fontSize: 14,
    lineHeight: 19.6,
  },
  bodySmall: {
    fontFamily: 'Karla',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 14,
  },

  /**Titles*/
  /*heroTitle: apply(
    isWide ? C.font12 : C.font7,
    {fontFamily: /!* isWeb ? 'Baloo 2 script' :*!/ 'Baloo2-Medium'},
    C.weightMedium,
    isWide ? C.line14 : C.line10,
    C.textPrimaryBlue,
  ),
  mainTitle: apply(
    C.font7,
    {fontFamily: /!*isWeb ? 'Baloo 2' :*!/ 'Baloo2-Medium'},
    C.weightBold,
    C.textPrimaryBlue,
  ),
  title1: [
    C.font6,
    {fontFamily: /!*isWeb ? 'Baloo 2' :*!/ 'Baloo2-Medium'},
    C.weightBold,
    C.textPrimaryBlue,
  ],
  title2: [C.font5, {fontFamily: /!*isWeb ? 'Baloo 2' :*!/ 'Baloo2-Medium'}],
  cta1: [C.font5, {fontFamily: isWeb ? 'Baloo 2' : 'Baloo2-Semibold'}],
  /!**Paragraph*!/
  textBold: [C.font4, C.bold, {fontFamily: 'Karla'}], //karla 16 Bold
  subtitle: [{fontFamily: 'Karla', fontSize: 14}, C.textGreyish], //karla 14 regular
  body1: [C.font4, {fontFamily: 'Karla'}], //karla 16 regular
  caption: [C.font4, {fontFamily: 'Karla', textAlign: 'left'}, C.textGreyish],
  navBar: [C.font3, {fontFamily: 'Karla'}],*/
};
export const textTypes = {
  mainTitle: {
    family: prevFonts.workSans.semiBold,
    style: apply(C.font12, C.line10),
  },
  h1: {
    family: prevFonts.workSans.semiBold,
    style: apply(C.font8, C.line10),
  },
  h2Thin: {
    family: prevFonts.workSans.regular,
    style: apply(C.font6, C.line8),
  },
  h2: {
    family: prevFonts.workSans.semiBold,
    style: apply(C.font6, C.line8),
  },
  h3Thin: {
    family: prevFonts.workSans.regular,
    style: apply(C.line6, {fontSize: 18}),
  },
  h3: {
    family: prevFonts.workSans.semiBold,
    style: apply(C.line6, {fontSize: 18}),
  },
  regular: {
    family: prevFonts.roboto.regular,
    style: apply(C.font4, C.line6),
  },
  medium: {
    family: prevFonts.roboto.semiBold,
    style: apply(C.font4, C.line6),
  },
  body: {
    family: prevFonts.roboto.regular,
    style: apply(C.line5, {fontSize: 14}),
  },
  bodyBold: {
    family: prevFonts.roboto.semiBold,
    style: apply(C.line5, {fontSize: 14}),
  },
  bodySmall: {
    family: prevFonts.roboto.regular,
    style: apply(C.font3, C.line4),
  },
  bodySmallBold: {
    family: prevFonts.roboto.semiBold,
    style: apply(C.font3, C.line4),
  },
  badge: {
    family: prevFonts.roboto.semiBold,
    style: apply(C.uppercase, C.line3, {
      letterSpacing: 0.4,
      fontSize: 10,
    }),
  },
};
