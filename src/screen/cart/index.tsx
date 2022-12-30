import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../product';
import Colors from '../../util/Colors';
import {useNavigation} from '@react-navigation/native';
import {removeFromCart} from '../../redux/action/action';
import Images from '../../util/util';
import Empty from '../../component/Empty';
import {RootState} from '../../redux/store/store';

const {height, width} = Dimensions.get('window');

const ShoppingCart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.cart);
  let total = 0;
  product.forEach((item: Product) => {
    total += item.price;
  });
  console.log('CART: ', product);
  const renderItem: ListRenderItem<Product> = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Product', {
            id: item.id,
          });
        }}>
        <View style={styles.wrapper}>
          <Image source={{uri: item.images[0]}} style={styles.image} />
          <View style={styles.col}>
            <Text style={styles.txtTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={{color: Colors.primary, marginTop: 8}}>
              {item?.category?.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 20,
              }}>
              ${item.price}
            </Text>
            <TouchableOpacity
              style={styles.btnError}
              onPress={() => {
                dispatch(removeFromCart(index));
              }}>
              <Image source={Images.IC_REMOVE} style={styles.cart} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (product.length < 1) {
    return <Empty title={'Your shopping cart is empty'} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{marginBottom: 140}} />
      <View
        style={{
          backgroundColor: Colors.white,
          justifyContent: 'space-between',
          alignItems: 'center',
          height: height * 0.07,
          paddingHorizontal: 8,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Colors.background,
          width: width,
          position: 'absolute',
          bottom: 79,
          flexDirection: 'row',
        }}>
        <View>
          <Text style={{color: Colors.primary, fontSize: 16}}>
            Order Total:
          </Text>
          <Text style={{marginTop: 4, fontSize: 16, fontWeight: '500'}}>
            ${total}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.tabbar,
            height: 36,
            paddingHorizontal: 22,
            borderRadius: 8,
            justifyContent: 'center',
          }}>
          <Text style={{color: Colors.white, fontSize: 16}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  cart: {
    height: 18,
    width: 18,
    tintColor: Colors.white,
  },
  wrapper: {
    width: width,
    height: height * 0.2,
    backgroundColor: Colors.white,
    margin: 4,
    flexDirection: 'row',
  },
  image: {
    height: 140,
    width: 140,
  },
  col: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  txtTitle: {
    width: width * 0.9,
    marginTop: 10,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 140,
  },
  btnError: {
    backgroundColor: Colors.error,
    height: 36,
    width: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default ShoppingCart;
