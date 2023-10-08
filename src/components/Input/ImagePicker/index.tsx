import { View, FlatList, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from './../styles'
import { LayoutAnimationHandler } from '@utils/uiHandler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, FastImage, FocusAwareStatusBar, Icon, Text, } from '@components';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Ripple from 'react-native-material-ripple';
import ImageView from 'react-native-image-viewing';

interface IndexProps {
  data: Array<any>;
  onInteract: any;
  borderRadius: number
}

const index = ({ data = [], onInteract, borderRadius }: IndexProps) => {
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
      })
        .then(image => {
          onInteract([...data, image]);
          listPhotoRef.current.scrollToEnd({ animated: true });
        })
    }
    ImagePicker.clean()
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
        <Ripple
          onPress={() => pickFromCamera(true)}
          style={styles.pickerImgBtn}
        >
          <Icon name={'camera'} size={30} />
          <Text>Dari Kamera</Text>
        </Ripple>
        <Ripple
          onPress={() => pickFromCamera(false)}
          style={styles.pickerImgBtn}
        >
          <Icon name={'folder-image'} size={30} />
          <Text>Dari Galleri</Text>
        </Ripple>
      </View>
    </Modal>
  );

  const removeByIndex = (index: number) => {
    const newArray = [...data];
    newArray.splice(index, 1);
    LayoutAnimationHandler()
    onInteract(newArray);
    if (index > 1) {
      listPhotoRef.current.scrollToIndex({
        index: index,
        animated: true
      });
    }
  };

  const previewModal = () => (
    <ImageView
      images={data.map(item => ({ uri: item.path }))}
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
            <Ripple
              rippleContainerBorderRadius={20}
              style={styles.closeBtn}
              onPress={() => removeByIndex(index)}
            >
              <Icon name={'close'} size={22} color="white" />
            </Ripple>
            <TouchableOpacity onPress={() => setisPreviewModal(index)}>
              <Image
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: borderRadius,
                }}
                resizeMode="cover"
                source={{ uri: item?.path }}
              />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <Button
            onPress={() => setisPickerShow(true)}
            style={[
              styles.footerImgList,
              { flex: 1, borderRadius },
            ]}
          >
            <Icon name={'camera-plus'} size={50} />
          </Button>
        }
      />
      {previewModal()}
      {pickerModal()}
    </View>
  )
}

export default index