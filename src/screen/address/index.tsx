import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderBackCustom from '../../component/HeaderBackCustom';
import {useNavigation} from '@react-navigation/native';
import Images from '../../util/util';
import Colors from '../../util/Colors';
import {useDispatch, useSelector} from 'react-redux';
import Empty from '../../component/Empty';
import {removeAddress} from '../../redux/action/action';
import {RootState} from '../../redux/store/store';

const Address = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const address = useSelector((state: RootState) => state.address);
  const renderItem: ListRenderItem<Address> = ({item, index}) => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.item}>{item.address}</Text>
        <Text style={styles.item}>{item.city}</Text>
        <Text style={styles.item}>{item.company}</Text>
        <Text style={styles.item}>{item.zipcode}</Text>
        <Text style={[styles.item, {color: Colors.tabbar}]}>{item.phone}</Text>
        <TouchableOpacity
          style={styles.btnRemove}
          onPress={() => {
            dispatch(removeAddress(index));
          }}>
          <Image source={Images.IC_REMOVE} style={styles.cart} />
        </TouchableOpacity>
      </View>
    );
  };
  const onPressBackIcon = () => {
    navigation.goBack();
  };
  const onPressRightIcon = () => {
    // @ts-ignore
    navigation.navigate('ItemAddress');
  };
  console.log('Address day ne: ', address);
  return (
    <View style={styles.container}>
      <HeaderBackCustom
        title={'Address'}
        onPressBack={onPressBackIcon}
        rightIcon={Images.IC_ADD}
        onPressRightIcon={onPressRightIcon}
      />
      {address.length < 1 ? (
        <Empty title={'No address created'} />
      ) : (
        <FlatList
          data={address}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    color: Colors.primary,
    lineHeight: 24,
  },
  cart: {
    height: 20,
    width: 20,
    tintColor: Colors.black,
  },
  wrapper: {
    padding: 8,
    backgroundColor: Colors.white,
    marginBottom: 6,
    flexDirection: 'column',
  },
  btnRemove: {
    height: 40,
    width: 50,
    position: 'absolute',
    bottom: 10,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Address;
