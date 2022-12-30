import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useProductById} from '../../hook/product/useProduct';
import {MaterialIndicator} from 'react-native-indicators';
import Colors from '../../util/Colors';
import Images from '../../util/util';
import Slider from './Slider';
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../../redux/action/action';
import HeaderBackCustom from '../../component/HeaderBackCustom';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Product = ({route}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onPressBackIcon = () => {
    console.log('BACKBACK');
    navigation.goBack();
  };
  const value = Object.values(route.params);
  const {isLoading, data} = useProductById(Number(value[0]));
  console.log('Value data: ', data);
  console.log('Product id: ', value);
  return (
    <View style={styles.container}>
      <HeaderBackCustom title={'Detail'} onPressBack={onPressBackIcon} />
      {isLoading && <MaterialIndicator size={50} color={Colors.primary} />}
      <Slider items={data?.images} product={data} />
      <View
        style={{
          backgroundColor: Colors.white,
          paddingBottom: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={{color: Colors.primary}}>{data?.category?.name}</Text>
          <Text style={styles.price}>${data?.price}</Text>
        </View>
        <View style={{paddingHorizontal: 8}}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={{marginTop: 10, color: Colors.primary}}>
            {data?.description}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.btnCart}
            onPress={() => {
              console.log('Press add to cart');
              dispatch(addItemToCart(data));
            }}>
            <Image source={Images.IC_CART} style={styles.cart} />
            <Text style={{paddingLeft: 6, color: Colors.white}}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cart: {
    height: 18,
    width: 18,
    tintColor: Colors.white,
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    marginTop: 10,
  },
  price: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.tabbar,
  },
  descriptionTitle: {
    marginTop: 20,
    left: 0,
    fontWeight: '600',
    fontSize: 16,
  },
  btnCart: {
    marginTop: 40,
    backgroundColor: Colors.tabbar,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    justifyContent: 'center',
    width: width * 0.5,
    flexDirection: 'row',
  },
});

export default Product;
