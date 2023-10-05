import { heightByScreen } from '@utils/dimensions';
import { BaseView } from '@components';
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Text, TextInput, Easing } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Input from '../../../components/Input/indexx';
import styles from './styles';
import Header from '@components/index/Header';

type HomeScreenProps = {
  navigation: any,
};

const SplashScreen = ({ navigation }: HomeScreenProps) => {
  const [value, setvalue] = useState('Egypt');
  const [multiValue, setmultiValue] = useState(['Egypt']);
  const [images, setimages] = useState([]);
  const [toogle, settoogle] = useState(true);
  const [date, setdate] = useState(new Date());

  return (
    <BaseView style={styles.container} error={false} toast={'asdaaa'}>
      <Header title="Input" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
        // style={{
        //   backgroundColor: 'white',
        //   shadowColor: '#000',
        //   shadowOffset: {
        //     width: 0,
        //     height: 12,
        //   },
        //   shadowOpacity: 0.58,
        //   shadowRadius: 16.0,

        //   elevation: 24,
        //   borderRadius: 10,
        //   margin: 20,
        // }}
        >
          {/* <Input
            label={`username`}
            onInteract={(data: React.SetStateAction<string>) => setvalue(data)}
            value={value}
            error={value == '' ? 'Tidak boleh kosong' : ''}
          />
          <Input
            label="password"
            onInteract={(data: React.SetStateAction<string>) => setvalue(data)}
            value={value}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="password"
          />*/}
          <Input
            label="otp"
            onInteract={(data: React.SetStateAction<string>) => setvalue(data)}
            value={value}
            length={4}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="otp"
          />
          <Input
            label="otp"
            onInteract={(data: React.SetStateAction<string>) => setvalue(data)}
            value={value}
            length={6}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="otp"
          />
          <Input
            label="image"
            onInteract={(data: React.SetStateAction<string>) => setimages(data)}
            value={images}
            error={images.length == 0 ? 'Tidak boleh kosong' : ''}
            type="image"
            length={1} // single input
          />
          <Input
            label="image"
            onInteract={(data: React.SetStateAction<string>) => setimages(data)}
            value={images}
            error={images.length == 0 ? 'Tidak boleh kosong' : ''}
            type="image" 
            // multiple input
          />
          <Input
            label="masukan kata kunci"
            onInteract={(data: React.SetStateAction<string>) => setvalue(data)}
            value={value}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="search"
          />
          <Input
            label={`switch`}
            onInteract={(data: React.SetStateAction<string[]>) =>
              setmultiValue(data)
            }
            value={multiValue}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="switch"
            data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
          />
          <Input
            label="select"
            onInteract={(data: React.SetStateAction<string>) => setvalue(data)}
            data={[
              'Egypt',
              'Canada',
              'Australia',
              'Cilodong',
              'Mexico',
              'Tambun',
              'Ohio',
              'Meikarta',
            ]}
            value={value}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="select"
            placeholder="Pilih area ..."
          />
          <Input
            label="check"
            onInteract={(data: React.SetStateAction<string[]>) =>
              setmultiValue(data)
            }
            data={['Egypt', 'Canada', 'Australia', 'Cilodong']}
            value={multiValue}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="check"
          />
          <Input
            label="radio"
            onInteract={(data: React.SetStateAction<string>) => setvalue(data)}
            data={[
              'Egypt',
              'Canada',
              'Australia',
              'Cilodong',
              'Mexico',
              'Tambun',
              'Ohio',
              'Meikarta',
            ]}
            value={value}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="radio"
          />

          {/*   <Input
            label="area"
            onInteract={(data: React.SetStateAction<string>) => setvalue(data)}
            value={value}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="area"
          />
          <Input
            label="date"
            onInteract={(data: React.SetStateAction<any>) => setdate(data)}
            value={date}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="date"
          />
          <Input
            label="time"
            onInteract={(data: React.SetStateAction<any>) => setdate(data)}
            value={date}
            error={value == '' ? 'Tidak boleh kosong' : ''}
            type="time"
          /> */}
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default SplashScreen;
