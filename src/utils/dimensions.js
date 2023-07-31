import { Dimensions,PixelRatio } from 'react-native';

const WINDOW = Dimensions.get('window');

export const isPortrait = () => {
  const { width, height } = Dimensions.get('window');
  if (width > height) return false
  else return true
};

export function heightByScreen(size) {
  return (size * (isPortrait ? WINDOW.height : WINDOW.width)) / 100;
}

export function widthByScreen(size) {
  return (size * (isPortrait ? WINDOW.width : WINDOW.height)) / 100;
}
const widthBaseScale = widthByScreen(100) / 414;
const heightBaseScale = heightByScreen(100) / 896;
function normalize(size, based = 'width') {
 const newSize = (based === 'height') ? 
                 size * heightBaseScale : size * widthBaseScale;
 return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const widthPixel = (size) => {
  return normalize(size, 'width');
};
//for height  pixel
const heightPixel = (size) => {
  return normalize(size, 'height');
};
//for font  pixel
export const fontPixel = (size) => {
  return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = (size) => {
  return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size) => {
  return widthPixel(size);
};