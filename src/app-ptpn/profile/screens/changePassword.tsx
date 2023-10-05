import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
// import styles from './styles';
import { navigate } from '@utils/navigation';
import {
  BaseView,
  Text,
  Icon,
  Header,
  Input,
  Button,
  ModalConfirmation,
} from '@components';
import { FlashList } from '@shopify/flash-list';
import { spacing } from '@constants/spacing';
import { toTitleCase } from '@utils/index';
import { useHooks } from '@profileApp/hooks/usePassword';
import { COLOR_BACKGROUND } from '@themes/index';
import { ScrollView } from 'react-native-gesture-handler';
// import { useBearStore } from './../stores/stores';

const App: React.FC = () => {
  const { doChangePassword } = useHooks();
  const [isVisible, setisVisible] = useState(false);
  // const [oldPass, setoldPass] = useState('');
  const [newPass, setnewPass] = useState('');
  const [repeatNewPass, setrepeatNewPass] = useState('');

  const verifPassword = () => {
    if (newPass !== repeatNewPass) {
      Toast.show({
        type: 'error',
        text1: 'Konfirmasi Password harus sama',
      });
    } else doChangePassword(newPass);
  };

  return (
    <BaseView containerColor={COLOR_BACKGROUND}>
      <Header title="Ubah Password" />
      <View style={{ flex: 1, padding: spacing.md }}>
        <ScrollView>
          {/* <Input
            value={oldPass}
            label={'Password Lama'}
            type="password"
            placeholder="Masukan Password Lama"
            onInteract={txt => setoldPass(txt)}
          /> */}
          <Input
            value={newPass}
            label={'Password Baru'}
            type="password"
            placeholder="Masukan Password Baru"
            onInteract={txt => setnewPass(txt)}
          />
          <Input
            value={repeatNewPass}
            label={'Konfirmasi Password Baru'}
            type="password"
            placeholder="Masukan Konfirmasi Password Baru"
            onInteract={txt => setrepeatNewPass(txt)}
          />
        </ScrollView>
        <Button title="Ubah Password" onPress={() => setisVisible(true)} />
      </View>
      <ModalConfirmation
        title="Yakin mau ubah password ?"
        subTitle="Setelah ubah password anda akan terlogout"
        isVisible={isVisible}
        onClose={() => setisVisible(false)}
        onSuccess={() => verifPassword()}
      />
    </BaseView>
  );
};

export default App;
