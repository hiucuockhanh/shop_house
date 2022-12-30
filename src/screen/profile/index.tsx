import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Images from '../../util/util';
import Colors from '../../util/Colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onPressLogout = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('name');
    // @ts-ignore
    navigation.navigate('Home');
  };
  const getInfomation = async () => {
    const emailLocal = await AsyncStorage.getItem('email');
    const nameLocal = await AsyncStorage.getItem('name');
    console.log('Storage name: ', nameLocal);
    const passwordLocal = await AsyncStorage.getItem('password');
    setName(nameLocal!);
    setEmail(emailLocal!);
    setPassword(passwordLocal!);
  };
  useEffect(() => {
    getInfomation();
  });
  console.log('value email: ', email);
  console.log('value password: ', password);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={Images.IC_USER} style={{height: 40, width: 40}} />
        {email ? (
          <TouchableOpacity style={{flexDirection: 'column'}}>
            <Text style={styles.name}>{name ? name.toString() : 'LOGIN'}</Text>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              <Text style={{color: Colors.text, fontSize: 13}}>
                View Your Profile
              </Text>
              <Image source={Images.IC_ARROW_RIGHT} style={styles.btnProfile} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Text style={styles.name}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: 3, alignItems: 'center'}}>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    // @ts-ignore*/}
        {/*    navigation.navigate('EditProfile');*/}
        {/*  }}*/}
        {/*  style={{width: '100%'}}>*/}
        {/*  <View style={styles.wrapperItem}>*/}
        {/*    <View style={styles.row}>*/}
        {/*      <Image source={Images.IC_EDIT_PROFILE} style={styles.icon} />*/}
        {/*      <Text style={{fontSize: 16, color: Colors.text}}>*/}
        {/*        Edit Profile*/}
        {/*      </Text>*/}
        {/*    </View>*/}
        {/*    <Image source={Images.IC_ARROW_RIGHT} style={styles.arrow} />*/}
        {/*  </View>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Address');
          }}
          style={{width: '100%'}}>
          <View style={styles.wrapperItem}>
            <View style={styles.row}>
              <Image source={Images.IC_ADDRESS} style={styles.icon} />
              <Text style={{fontSize: 16, color: Colors.text}}>Address</Text>
            </View>
            <Image source={Images.IC_ARROW_RIGHT} style={styles.arrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Shopping Cart');
          }}>
          <View style={styles.wrapperItem}>
            <View style={styles.row}>
              <Image source={Images.IC_CART} style={styles.icon} />
              <Text style={{fontSize: 16, color: Colors.text}}>My Orders</Text>
            </View>
            <Image source={Images.IC_ARROW_RIGHT} style={styles.arrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Wishlist');
          }}>
          <View style={styles.wrapperItem}>
            <View style={styles.row}>
              <Image source={Images.IC_WISHLIST} style={styles.icon} />
              <Text style={{fontSize: 16, color: Colors.text}}>Wishlist</Text>
            </View>
            <Image source={Images.IC_ARROW_RIGHT} style={styles.arrow} />
          </View>
        </TouchableOpacity>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity onPress={onPressLogout}>
            <Text style={styles.txtLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgProfile,
  },
  wrapper: {
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: Colors.white,
    paddingBottom: 10,
    shadowColor: '#505050',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  name: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  btnProfile: {
    height: 18,
    width: 18,
    tintColor: Colors.primary,
  },
  wrapperItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 60,
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: 2,
  },
  row: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: Colors.tabbar,
    marginRight: 20,
  },
  arrow: {
    height: 20,
    width: 20,
    tintColor: Colors.primary,
  },
  wrapperBtn: {
    marginTop: 20,
    backgroundColor: Colors.tabbar,
    width: '40%',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  txtLogout: {
    color: Colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default Profile;
