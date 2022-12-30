import React, {useCallback, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import Images from '../../util/util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  // const application = useApplication();
  const {isInternetReachable, type, isConnected} = useNetInfo();
  useEffect(() => {
    if (type !== 'none' && isConnected && isInternetReachable) {
      console.log('Internet connection');
    } else {
      showMessage({
        message: 'No internet connection',
        description: 'Please try again.',
        type: 'danger',
        autoHide: false,
      });
    }
  }, [isConnected, isInternetReachable, type]);

  const getInfomation = useCallback(async () => {
    const emailLocal = await AsyncStorage.getItem('email');
    if (emailLocal) {
      // @ts-ignore
      navigation.navigate('Bottom');
      // navigation.navigate('Login');
    } else {
      // @ts-ignore
      navigation.navigate('Login');
    }
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      getInfomation();
    }, 2000);
  }, [getInfomation, navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Images.SplashImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
});

export default Splash;
