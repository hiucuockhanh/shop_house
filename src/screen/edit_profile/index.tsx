import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderBackCustom from '../../component/HeaderBackCustom';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../component/CustomTextInput';
import Images from '../../util/util';
import Colors from '../../util/Colors';

const EditProfile = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const getInfomation = async () => {
    const emailLocal = await AsyncStorage.getItem('email');
    const passwordLocal = await AsyncStorage.getItem('password');
    setEmail(emailLocal!);
    setPassword(passwordLocal!);
  };
  useEffect(() => {
    getInfomation();
  });
  console.log('value email: ', email);
  console.log('value password: ', password);
  const onPressBackIcon = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderBackCustom title={'Edit Profile'} onPressBack={onPressBackIcon} />
      <CustomTextInput
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        icon={Images.IC_EMAIL}
        borderColor={Colors.primary}
        borderWidth={1}
      />
      <CustomTextInput
        value={password}
        onChangeText={value => {
          setPassword(value);
        }}
        type={'password'}
        icon={Images.IC_PASSWORD}
        borderColor={Colors.primary}
        borderWidth={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditProfile;
