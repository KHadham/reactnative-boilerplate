// import {
//   COLOR_FONT_PRIMARY_DARK,
//   FONT_SIZE_HEADER,
//   FONT_SIZE_TITLE,
//   FONT_SIZE_DESC,
//   FONT_SIZE_CAPTION,
//   FONT_SIZE_INFO,
//   FONT_SIZE_SUBTITLE,
// } from '@app/styles';
// import React from 'react';
// import { TextStyle, Text as Txt } from 'react-native';

// type TextWrapProps = {
//   children: any,
//   style?: TextStyle,
//   onPress?: () => void,
//   color?: string,
//   type?:
//     | Array<'bold' | 'italic' | 'regular' | 'underline' | 'thin'>
//     | 'bold'
//     | 'italic'
//     | 'regular'
//     | 'underline'
//     | 'thin',
// };

// const BaseText = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
//   // type,
// }: TextWrapProps) => {
//   // const fontFamily = [
//   //   { key: 'bold', weight: '900' },
//   //   { key: 'italic', weight: 'normal' },
//   //   { key: 'regular', weight: 'normal' },
//   //   { key: 'thin', weight: 'normal' },
//   //   { key: 'underline', weight: 'normal' },
//   // ].find(data => data.key == type);

//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           fontSize: FONT_SIZE_DESC,
//           color,
//           fontFamily: 'Inter-Regular',
//           // ,
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Desc = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
//   type,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           fontSize: FONT_SIZE_DESC,
//           color,
//           fontFamily: 'Inter-Regular',
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Header = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           fontSize: FONT_SIZE_HEADER,
//           fontWeight: 'bold',
//           color,
//           fontFamily: 'Inter-Bold',
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Title = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           fontSize: FONT_SIZE_TITLE,
//           color,
//           fontFamily: 'Inter-Bold',
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const SubTitle = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           fontSize: FONT_SIZE_SUBTITLE,
//           color,
//           fontFamily: 'Inter-Bold',
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Button = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           fontSize: 20,
//           backgroundColor: color,
//           padding: 10,
//           borderRadius: 5,
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Italic = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           fontStyle: 'italic',
//           color,
//           fontSize: FONT_SIZE_CAPTION,
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Info = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           fontSize: FONT_SIZE_CAPTION,
//           color,
//           fontFamily: 'Inter-ExtraLight',
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Underline = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           color,
//           textDecorationLine: 'underline',
//           fontFamily: 'Inter-ExtraLight',
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Bold = ({
//   color = COLOR_FONT_PRIMARY_DARK,
//   children,
//   style,
//   onPress,
// }: TextWrapProps) => {
//   return (
//     <Txt
//       onPress={onPress}
//       style={[
//         {
//           color,
//           fontFamily: 'Inter-Bold',
//         },
//         style,
//       ]}
//     >
//       {children}
//     </Txt>
//   );
// };

// const Text = {
//   // with size
//   Header,
//   Title,
//   Desc,
//   Button,
//   Info,
//   SubTitle,
//   // no size
//   Italic,
//   Underline,
//   Bold,
//   default: BaseText,
// };

// export default Text;
import {
  COLOR_FONT_PRIMARY_DARK,
  FONT_SIZE_HEADER,
  FONT_SIZE_TITLE,
  FONT_SIZE_DESC,
  FONT_SIZE_CAPTION,
  FONT_SIZE_INFO,
  FONT_SIZE_SUBTITLE,
} from '@app/styles';
import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Text: React.FC<TextProps> & {
  Desc: React.FC<TextProps>,
  Header: React.FC<TextProps>,
  Title: React.FC<TextProps>,
  SubTitle: React.FC<TextProps>,
  Button: React.FC<TextProps>,
  Italic: React.FC<TextProps>,
  Info: React.FC<TextProps>,
  Underline: React.FC<TextProps>,
  Bold: React.FC<TextProps>,
  // Add other text styles here
} = ({ children, style }) => {
  return <RNText style={style}>{children}</RNText>;
};

Text.Desc = ({ children, style }) => {
  return (
    <RNText
      style={[style, { fontSize: FONT_SIZE_DESC, fontFamily: 'Inter-Regular' }]}
    >
      {children}
    </RNText>
  );
};

Text.Header = ({ children, style }) => {
  return (
    <RNText
      style={[
        style,
        { fontSize: FONT_SIZE_HEADER, fontFamily: 'Inter-Regular' },
      ]}
    >
      {children}
    </RNText>
  );
};

Text.Title = ({ children, style }) => {
  return (
    <RNText
      style={[
        style,
        { fontSize: FONT_SIZE_TITLE, fontFamily: 'Inter-Regular' },
      ]}
    >
      {children}
    </RNText>
  );
};

Text.SubTitle = ({ children, style }) => {
  return (
    <RNText
      style={[
        style,
        { fontSize: FONT_SIZE_SUBTITLE, fontFamily: 'Inter-Regular' },
      ]}
    >
      {children}
    </RNText>
  );
};

Text.Button = ({ children, style }) => {
  return (
    <RNText
      style={[
        style,
        { fontSize: FONT_SIZE_CAPTION, fontFamily: 'Inter-Regular' },
      ]}
    >
      {children}
    </RNText>
  );
};

Text.Italic = ({ children, style }) => {
  return (
    <RNText
      style={[
        style,
        { fontSize: FONT_SIZE_CAPTION, fontFamily: 'Inter-Regular' },
      ]}
    >
      {children}
    </RNText>
  );
};

Text.Info = ({ children, style }) => {
  return (
    <RNText
      style={[
        style,
        { fontSize: FONT_SIZE_CAPTION, fontFamily: 'Inter-Regular' },
      ]}
    >
      {children}
    </RNText>
  );
};

Text.Underline = ({ children, style }) => {
  return (
    <RNText
      style={[
        style,
        { fontSize: FONT_SIZE_CAPTION, fontFamily: 'Inter-Regular' },
      ]}
    >
      {children}
    </RNText>
  );
};

Text.Bold = ({ children, style }) => {
  return (
    <RNText
      style={[style, { fontSize: FONT_SIZE_INFO, fontFamily: 'Inter-Regular' }]}
    >
      {children}
    </RNText>
  );
};

export default Text;
