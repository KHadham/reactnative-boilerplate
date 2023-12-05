import { Platform, Appearance, PixelRatio } from 'react-native';

const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  // Use dark color scheme
}

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { fontPixel } from '@utils/dimensions';

const citataTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#234d7c',
    secondary: '#486d96',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};



export const COLOR_BASE_PRIMARY_MAIN = '#003D80';
export const COLOR_BASE_PRIMARY_DARK = '#004d80';
export const COLOR_BORDER = '#c7c7c7'

// export const COLOR_BASE_PRIMARY_DARK = '#039855';
// export const COLOR_BASE_PRIMARY_MAIN = '#43A01C';
export const COLOR_BASE_PRIMARY_LIGHT = 'rgba(179, 30, 114, 0.07)';
export const COLOR_BASE_PRIMARY_MAIN_OPACITY50 = 'rgba(178,30,114, 0.3)';

// export const COLOR_BASE_SECONDARY_DARK = '#ba000d';
// export const COLOR_BASE_SECONDARY_MAIN = '#FCD41C';
// export const COLOR_BASE_SECONDARY_LIGHT = '#D6D6D6';

export const COLOR_FONT_PRIMARY_DARK = '#262626';
export const COLOR_FONT_PRIMARY_LIGHT = '#757575';

export const COLOR_EVENT_SUCCESS = '#43936C';
export const COLOR_EVENT_ERROR = '#CB3A31';
export const COLOR_EVENT_INACTIVE = '#ededed';
export const COLOR_EVENT_INFORMATION = '#3267E3';
export const COLOR_EVENT_WARNING = '#e0b336';

export const COLOR_BACKGROUND_SUCCESS = '#EFF9E1';
export const COLOR_BACKGROUND_ERROR = '#FFECEB';
export const COLOR_BACKGROUND_INACTIVE = '#d6d6d6';
export const COLOR_BACKGROUND_INFORMATION = '#EBEFFF';
export const COLOR_BACKGROUND_WARNING = '#FFF2E5';

export const COLOR_BACKGROUND = '#F5F5F5';

export const COLOR_WHITE = '#ffffff';
export const COLOR_GREY = '#bdbdbd';
export const COLOR_GREY_LIGHT = '#F5F7FA';
export const COLOR_WHITE_OPACITY50 = 'rgba(255,255,255,0.5)';
export const COLOR_BLACK = '#000000';
export const COLOR_BLACK_OPACITY50 = 'rgba(0,0,0,0.5)';
export const COLOR_TRANSPARENT = 'rgba(52, 52, 52, 0.3)';
export const COLOR_REAL_TRANSPARENT = 'transparent';

export const FONT_PRIMARY_REGULAR = 'Inter-Regular'
export const FONT_PRIMARY_LIGHT = 'Inter-ExtraLight';
export const FONT_PRIMARY_BOLD = 'Inter-Bold';

export const FONT_SECONDARY_REGULAR = 'PlusJakartaSans-Regular'
export const FONT_SECONDARY_LIGHT = 'PlusJakartaSans-Italic';
export const FONT_SECONDARY_BOLD = 'PlusJakartaSans-Bold';

const getFontScale = PixelRatio.getFontScale();
const fontSize = size => fontPixel(size) 

export const FONT_SIZE_HEADER = fontSize(23);
export const FONT_SIZE_TITLE = fontSize(21);
export const FONT_SIZE_SUBTITLE = fontSize(19);
export const FONT_SIZE_DESC = fontSize(16);
export const FONT_SIZE_REGULAR = fontSize(14);
export const FONT_SIZE_INFO = fontSize(12);

