import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Images from '../util/util';
import Colors from '../util/Colors';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logoText} source={Images.Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 4,
    backgroundColor: Colors.white,
  },
  logoText: {
    height: 80,
    width: 240,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
});
export default Header;
