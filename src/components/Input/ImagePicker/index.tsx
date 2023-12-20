import { View, FlatList, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './../styles';
import { LayoutAnimationHandler } from '@utils/uiHandler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, FastImage, Icon, Text } from '@components';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import { COLOR_WHITE } from '@themes/index';

interface IndexProps {
  data: Array<any>;
  onInteract: any;
  borderRadius: number;
  editable: boolean;
}

const index = ({
  data = [],
  onInteract,
  borderRadius,
  editable = true,
}: IndexProps) => {
  const listPhotoRef = useRef(null);
  const [isPreviewModal, setisPreviewModal] = useState(null);
  const [isPickerShow, setisPickerShow] = useState(false);

  const pickFromCamera = async (camera: boolean) => {
    setisPickerShow(false);
    if (camera) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        onInteract([...data, image]);
        listPhotoRef.current.scrollToEnd({ animated: true });
      });
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      }).then(image => {
        onInteract([...data, image]);
        listPhotoRef.current.scrollToEnd({ animated: true });
      });
    }
    ImagePicker.clean();
  };

  const pickerModal = () => (
    <Modal
      isVisible={isPickerShow}
      onBackdropPress={() => setisPickerShow(false)}
      onSwipeComplete={() => setisPickerShow(false)}
      swipeDirection={['down']}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      propagateSwipe={true}
    >
      <View style={styles.pickerModal}>
        <Button
          onPress={() => pickFromCamera(true)}
          style={styles.pickerImgBtn}
        >
          <Icon name={'camera'} size={30} />
          <Text>Dari Kamera</Text>
        </Button>
        <Button
          onPress={() => pickFromCamera(false)}
          style={styles.pickerImgBtn}
        >
          <Icon name={'folder-image'} size={30} />
          <Text>Dari Galleri</Text>
        </Button>
      </View>
    </Modal>
  );

  const removeByIndex = (index: number) => {
    const newArray = [...data];
    newArray.splice(index, 1);
    LayoutAnimationHandler();
    onInteract(newArray);
    if (index > 1) {
      listPhotoRef.current.scrollToIndex({
        index: index,
        animated: true,
      });
    }
  };

  const previewModal = () => (
    <ImageView
      images={data?.map(item => ({ uri: item || item.path })) || []}
      imageIndex={isPreviewModal}
      visible={isPreviewModal !== null}
      onRequestClose={() => setisPreviewModal(null)}
    />
  );

  return (
    <View style={styles.pickerWrap}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={listPhotoRef}
        renderItem={({ item, index }) => (
          <View style={styles.listImg}>
            <Button
              style={styles.closeBtn}
              onPress={() => removeByIndex(index)}
            >
              <Icon name={'close'} size={22} color="white" />
            </Button>
            <TouchableOpacity onPress={() => setisPreviewModal(index)}>
              <FastImage
                previewAble
                style={styles.images}
                resizeMode="cover"
                source={
                  typeof item == 'string' ? { uri: item } : { uri: item?.path }
                }
              />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <Button
            disabled={!editable}
            onPress={() => setisPickerShow(true)}
            style={[styles.footerImgList, { borderRadius }]}
          >
            <View style={styles.circlePlus}>
              <Icon name={'plus'} color={COLOR_WHITE} />
            </View>
            <Text size="info">Tambah File</Text>
          </Button>
        }
      />
      {previewModal()}
      {pickerModal()}
    </View>
  );
};

export default index;
