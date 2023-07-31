import { widthByScreen } from '@utils/dimensions';
import { SetStateAction, MutableRefObject } from 'react';
import {
  Appearance,
  LayoutAnimation,
  LayoutAnimationProperties,
  Platform,
  UIManager,
} from 'react-native';

export const handleHorizontalScroll = (event: {
  nativeEvent: { contentOffset: { x: any } },
}) => {
  return new Promise(resolve => {
    const x = event?.nativeEvent?.contentOffset?.x;
    return resolve(Math.floor(x) / Math.floor(widthByScreen(100)) + 1);
  });
};

export const scrollToIndexHorizontal = (
  index: SetStateAction<number>,
  ref: MutableRefObject<any>
) => {
  if (ref.current) {
    const realIndex = typeof index === 'function' ? index(ref.current) : index;
    ref.current?.scrollTo({
      x: (realIndex - 1) * widthByScreen(100),
      animated: true,
    });
  }
};

export const scrollToIndex = (
  index: SetStateAction<number>,
  ref: MutableRefObject<any>
) => {
  ref.current?.scrollToIndex({ index, animated: true });
};

export const LayoutAnimationHandler = () =>
  //   {
  //   type, // Default value is 'spring'
  // }: {
  //   type?: LayoutAnimationProperties,
  // }
  {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    LayoutAnimation.configureNext({
      duration: 250,
      create: { type: 'easeIn', property: 'opacity' },
      update: { type: 'easeInEaseOut', springDamping: 0.4 },
      delete: { type: 'easeOut', property: 'opacity' },
    });
  };

export function colorToDarkMode(hexColor: string, darknessFactor = 0.5) {
  if (Appearance.getColorScheme() == 'dark') {
    // Remove the '#' character from the hexColor if present
    hexColor = hexColor.replace('#', '');

    // Split the hexColor into its RGB components
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);

    // Calculate the dark mode RGB values based on the darknessFactor
    const darkRed = Math.round(red * darknessFactor);
    const darkGreen = Math.round(green * darknessFactor);
    const darkBlue = Math.round(blue * darknessFactor);

    // Convert the dark mode RGB values back to hexadecimal format
    const darkHexColor =
      '#' +
      ((darkRed << 16) + (darkGreen << 8) + darkBlue)
        .toString(16)
        .padStart(6, '0');

    return darkHexColor;
  } else return hexColor;
}

/**
 * Convert a hexadecimal color value to RGB format.
 * @param {string} hex - The hexadecimal color value (e.g., "#RRGGBB").
 * @returns {{ r: number, g: number, b: number }} - An object containing the RGB values.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove the '#' character from the hex if present
  hex = hex.replace('#', '');

  // Split the hex into its RGB components
  const r: number = parseInt(hex.slice(0, 2), 16);
  const g: number = parseInt(hex.slice(2, 4), 16);
  const b: number = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

/**
 * Convert a hexadecimal or RGB color value to a transparent version.
 * @param {string} color - The hexadecimal or RGB color value.
 * @param {number} transparency - The transparency value, ranging from 0 to 1.
 * @returns {string} - The transparent color in the format "rgb(r, g, b, a)".
 */
export function toTransparent(color: string, transparency: number): string {
  // Check if the input color is in hexadecimal format
  const isHexColor = color.startsWith('#');

  // Extract the RGB values from the input color
  let r: number, g: number, b: number;
  if (isHexColor) {
    // Convert hexadecimal color to RGB
    const hexColor = color.replace('#', '');
    r = parseInt(hexColor.slice(0, 2), 16);
    g = parseInt(hexColor.slice(2, 4), 16);
    b = parseInt(hexColor.slice(4, 6), 16);
  } else {
    // Parse RGB values from the input color
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d*\.\d+)?\)/);
    if (!rgbMatch) {
      throw new Error('Invalid input color format. Expected hex or RGB color string.');
    }
    r = parseInt(rgbMatch[1]);
    g = parseInt(rgbMatch[2]);
    b = parseInt(rgbMatch[3]);
  }

  // Clamp the transparency value between 0 and 1
  const alpha = Math.max(0, Math.min(1, transparency));

  // Return the transparent color in "rgb(r, g, b, a)" format
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}