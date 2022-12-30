import {Image, StyleSheet, Text, View} from 'react-native';
import Images from '../util/util';
import Colors from '../util/Colors';
import React from 'react';

interface Props {
  title: string;
}

const Empty: React.FunctionComponent<Props> = ({title}) => {
  return (
    <View style={styles.container}>
      <Image source={Images.IC_EMPTY} style={styles.image} />
      <Text style={styles.txt}>{title}</Text>
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
    height: 140,
    width: 140,
  },
  txt: {
    color: Colors.primary,
    fontSize: 18,
  },
});

export default Empty;
