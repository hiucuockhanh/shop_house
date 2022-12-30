import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  NativeScrollEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as permissions from 'react-native-permissions';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import {useNavigation} from '@react-navigation/native';
import HeaderRemoveCustom from '../../component/HeaderRemoveCustom';
import Colors from '../../util/Colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ImageSlider = ({route}: any) => {
  const naviagation = useNavigation();
  const [slider, setSlider] = useState(0);
  console.log(typeof route.params.images);
  console.log('Value: ', route.params.images);
  const items = route.params.images;

  useEffect(() => {
    const getPermissions = async () => {
      await getPermission();
    };
    getPermissions().catch(err => console.log(err));
  }, []);

  const getPermission = async () => {
    try {
      const granted = await permissions.request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === RESULTS.GRANTED) {
        console.log('Access Permission Photo');
        return true;
      }
    } catch (err) {
      console.log('Access denied');
      return false;
    }
    return;
  };

  const saveToGallery = async (imgUrl: string) => {
    const newImgUri = imgUrl.lastIndexOf('/');
    const imageName = imgUrl.substring(newImgUri);
    const dirs = RNFetchBlob.fs.dirs;
    const path = dirs.PictureDir + imageName;

    if (Platform.OS === 'android') {
      const granted = await getPermission();
      if (!granted) {
        return;
      }
      RNFetchBlob.config({
        fileCache: false,
        appendExt: 'png',
        indicator: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image',
        },
      })
        .fetch('GET', imgUrl)
        .then(() => {
          Alert.alert(
            'Save remote Image',
            'Image Saved Successfully',
            [{text: 'OK', onPress: () => console.log('OK')}],
            {cancelable: false},
          );
        })
        .catch(err => {
          console.log('Error: ', err);
        });
    } else {
      try {
        CameraRoll.save(imgUrl).then(() => {
          Alert.alert(
            'Save remote Image',
            'Image Saved Successfully',
            [{text: 'OK', onPress: () => console.log('OK')}],
            {cancelable: false},
          );
        });
      } catch (err) {
        console.log('Error save: ', err);
      }
    }
  };

  const onChange = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != slider) {
        setSlider(slide);
      }
    }
  };

  const onPressBack = () => {
    naviagation.goBack();
  };

  return (
    <View style={{backgroundColor: Colors.white}}>
      <HeaderRemoveCustom
        title={`${slider + 1} of ${items.length}`}
        onPressBack={onPressBack}
      />
      <ScrollView
        onScroll={({nativeEvent}) => onChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}>
        {items?.map((e: any, index: number) => (
          <TouchableOpacity
            key={index}
            onLongPress={() => {
              console.log('Picture: ', e);
              console.log('Picture index: ', index);
              Alert.alert(
                'Save to gallery',
                'Are you sure save image',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                  },
                  {text: 'OK', onPress: () => saveToGallery(e)},
                ],
                {cancelable: false},
              );
            }}>
            <Image resizeMode="cover" style={styles.wrap} source={{uri: e}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {items?.map((e: any, index: number) => (
          <Text
            key={index}
            style={slider == index ? styles.doActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absRight: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  absTop: {
    position: 'absolute',
    top: 20,
    right: 10,
    padding: 10,
  },
  imageRight: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 6,
    height: 30,
    width: 30,
  },
  imageTop: {
    resizeMode: 'stretch',
    height: 40,
    width: 40,
  },
  wrap: {
    marginTop: 40,
    width: WIDTH,
    height: HEIGHT * 0.5,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  doActive: {
    margin: 3,
    fontSize: 12,
    color: 'black',
  },
  dot: {
    margin: 3,
    fontSize: 12,
    color: 'white',
  },
});

export default ImageSlider;
