import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { goBack, navigate, push } from '../../helper/navigation';
import BaseView from '@app/components/BaseView';
import Input from './Input';
import Button from './Button';
import Login from './Login';
import { widthByScreen } from '@app/helper/dimensions';
interface AppProps {
  props1: string;
  props2: number;
}

const App: React.FC<AppProps> = ({
  props1 = 'default value',
  props2,
}) => {
  //   const [first, setfirst] = useState('');
  //   useEffect(() => {
  //     first;

  //     return () => {
  //       second;
  //     };
  //   }, []);

  return (
    <BaseView>
      <ScrollView horizontal>
        <View style={{width:widthByScreen(100)}}>
          <Input />
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default App;
