import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../util/util';
import Product from '../product';
import Colors from '../../util/Colors';
import {useNavigation} from '@react-navigation/native';
import {MaterialIndicator} from 'react-native-indicators';
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../../redux/action/action';
import FastImage from 'react-native-fast-image';

const {height, width} = Dimensions.get('window');

interface Props {
  input: string;
  data: Array<Product>;
  isLoading: boolean;
}

const SearchResult: React.FunctionComponent<Props> = ({
  input,
  data,
  isLoading,
}) => {
  console.log('re-render');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hasResult, setHasResult] = useState(true);
  console.log(hasResult);
  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <View style={styles.flexTop}>
          <MaterialIndicator size={50} color={Colors.primary} />
        </View>
      )}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          if (input === '') {
            setHasResult(true);
            return (
              <TouchableOpacity
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('Product', {
                    id: item.id,
                  });
                }}>
                <View style={styles.wrapper}>
                  <FastImage
                    source={{uri: item.images[0]}}
                    style={styles.image}
                  />
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
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          dispatch(addItemToCart(item));
                        }}>
                        <Image source={Images.IC_CART} style={styles.cart} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          } else if (
            item.title.toLowerCase().trim().includes(input.toLowerCase().trim())
          ) {
            setHasResult(true);
            return (
              <TouchableOpacity
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('Product', {
                    id: item.id,
                  });
                }}>
                <View style={styles.wrapper}>
                  <FastImage source={{uri: item.images[0]}} style={styles.image} />
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
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          dispatch(addItemToCart(item));
                        }}>
                        <Image source={Images.IC_CART} style={styles.cart} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          } else {
            setHasResult(false);
          }
        }}
      />
      <View style={{marginBottom: 84}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cart: {
    height: 18,
    width: 18,
    tintColor: Colors.white,
  },
  animatableImage: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginLeft: 17,
  },
  input: {
    borderRadius: 6,
    fontSize: 14,
    height: 40,
    flex: 1,
    padding: 0,
    marginBottom: 0,
    opacity: 1,
    borderWidth: 1,
  },
  flexTop: {
    marginTop: 200,
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
});

export default SearchResult;
