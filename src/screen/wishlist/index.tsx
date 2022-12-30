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
import Images from '../../util/util';
import {addItemToCart, removeFromWishlist} from '../../redux/action/action';
import {useNavigation} from '@react-navigation/native';
import Empty from '../../component/Empty';
import {RootState} from '../../redux/store/store';

const {height, width} = Dimensions.get('window');

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  console.log('CART: ', wishlist);
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
          <View style={{flexDirection: 'column', marginLeft: 10}}>
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
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  dispatch(addItemToCart(item));
                }}>
                <Image source={Images.IC_CART} style={styles.cart} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnError}
                onPress={() => {
                  dispatch(removeFromWishlist(index));
                }}>
                <Image source={Images.IC_REMOVE} style={styles.cart} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (wishlist.length < 1) {
    return <Empty title={'Your wishlist is empty'} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{marginBottom: 84}} />
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
  btn: {
    backgroundColor: Colors.tabbar,
    height: 36,
    width: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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

export default Wishlist;
