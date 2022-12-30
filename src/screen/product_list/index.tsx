import React from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import {useProductByCategory} from '../../hook/category/useCategory';
import Colors from '../../util/Colors';
import {MaterialIndicator} from 'react-native-indicators';
import HeaderBackCustom from '../../component/HeaderBackCustom';
import {addItemToCart, addItemToWishlist} from '../../redux/action/action';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../../component/Product';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../redux/store/store';

const {height, width} = Dimensions.get('window');

const ProductList = ({route}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const value = Object.values(route.params);
  const id = route.params.id;
  const name = route.params.name;
  console.log('ahihi', id, name);
  // console.log('Value ', value);
  const {isLoading, data} = useProductByCategory(Number(value[0]));
  const onPressBackIcon = () => {
    console.log('BACKBACK');
    navigation.goBack();
  };

  console.log('DUA: ', data);

  const item = useSelector((state: RootState) => state);
  console.log('CartCart: ', item);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderItem: ListRenderItem<Product> = ({item}) => {
    return (
      <Product
        item={item}
        onAddToCart={() => {
          dispatch(addItemToCart(item));
        }}
        onAddToWishlist={() => dispatch(addItemToWishlist(item))}
      />
    );
  };
  return (
    <View style={styles.container}>
      <HeaderBackCustom
        title={String(value[1])}
        onPressBack={onPressBackIcon}
      />
      {isLoading && <MaterialIndicator size={50} color={Colors.primary} />}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  item: {
    flex: 1,
    // alignItems: 'center',
    width: width * 0.48,
    height: height * 0.3,
    margin: '1%',
    backgroundColor: Colors.white,
  },
  image: {
    height: 160,
    width: width * 0.48,
    resizeMode: 'cover',
  },
  icon: {
    height: 24,
    width: 24,
  },
  cart: {
    height: 18,
    width: 18,
    tintColor: Colors.white,
  },
});

export default ProductList;
