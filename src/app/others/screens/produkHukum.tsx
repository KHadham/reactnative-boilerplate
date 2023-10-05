import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import IMAGES from '@images';
import { useNavigationHandler } from '@utils/navigation';
import {
  BaseView,
  Accordion,
  Header,
  Icon,
  Text,
  Button,
  ModalPDF,
} from '@components';
import { FlashList } from '@shopify/flash-list';
import { useHooks } from '@othersApp/hooks/produkHukum';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { widthByScreen } from '@utils/dimensions';
import { spacing } from '@constants/spacing';
import styles from '@othersApp/styles';
import {
  COLOR_BACKGROUND,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_EVENT_ERROR,
  COLOR_GREY,
} from '@themes/index';

const App: React.FC = () => {
  const { data, isLoading } = useHooks();
  const { navigate, onPressLink } = useNavigationHandler();
  const [pdfUrl, setpdfUrl] = useState({ title: '', url: '' });

  return (
    <BaseView style={{ backgroundColor: COLOR_BACKGROUND }}>
      <Header title="Produk Hukum" shadow />
      <FlatList
        data={data}
        renderItem={({ index, item }) => (
          <Accordion
            isLoading={isLoading}
            style={{ margin: spacing.md, backgroundColor: 'white' }}
            keys={index}
            content={
              <Text size="subTitle" weight="bold">
                {item.kategori}
              </Text>
            }
            contentExpand={
              <FlatList
                ListEmptyComponent={() => (
                  <View style={styles.itemProdukHukumNull}>
                    <Text size="desc">Data {item.kategori} kosong</Text>
                    <Icon name="close" color={COLOR_EVENT_ERROR} />
                  </View>
                )}
                data={item.child}
                renderItem={({ index, item }) => (
                  <Button
                    key={index}
                    style={styles.itemProdukHukum}
                    onPress={() =>
                      setpdfUrl({ title: item.judul, url: item.file_path_url })
                    }
                  >
                    <Text style={{ flex: 1 }} size="info" weight="bold">
                      {item.judul}
                    </Text>
                    <Icon name="file-pdf-box" color={COLOR_BASE_PRIMARY_DARK} />
                  </Button>
                )}
              />
            }
          />
        )}
      />
      <ModalPDF
        isVisible={pdfUrl.url !== ''}
        onClose={() => setpdfUrl({ title: '', url: '' })}
        url={pdfUrl.url}
        title={pdfUrl.title}
      />
    </BaseView>
  );
};

export default App;
