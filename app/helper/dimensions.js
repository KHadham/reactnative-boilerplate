import { Dimensions } from 'react-native';

const WINDOW = Dimensions.get('window');

export function heightByScreen(size) {
  return (size * WINDOW.height) / 100;
}

export function widthByScreen(size) {
  return (size * WINDOW.width) / 100;
}

export const isPortrait = () => {
  const { width, height } = Dimensions.get('window');
  if (width > height) return false
  else return true
};