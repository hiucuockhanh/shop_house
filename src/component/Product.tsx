import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../util/util';
import Colors from '../util/Colors';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ModalAlert from './ModalAlert';
import FastImage from 'react-native-fast-image';

const {height, width} = Dimensions.get('window');
interface Props {
  item: Product;
  onAddToCart: (item: Product) => void;
  onAddToWishlist: (item: Product) => void;
}

const Product: React.FunctionComponent<Props> = ({
  item,
  onAddToWishlist,
  onAddToCart,
}) => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState('white');
  const [isLove, setIsLove] = useState(item.isWishlist);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleHeart = (product: Product) => {
    console.log(product);

    if (toggle === 'white') {
      setToggle(Colors.error);
      setIsLove(true);
    } else {
      setToggle('white');
      setIsLove(false);
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Product', {
            id: item.id,
          });
        }}>
        <View style={styles.item}>
          <FastImage source={{uri: item.images[0]}} style={styles.image} />
          <TouchableOpacity
            onPress={() => {
              toggleHeart(item);
              onAddToWishlist(item);
            }}
            style={{
              height: 30,
              width: 30,
              backgroundColor: isLove ? toggle : 'white',
              borderRadius: 15,
              position: 'absolute',
              bottom: 110,
              right: 20,
            }}>
            <Image
              source={Images.IC_WISHLIST}
              style={[styles.icon, {alignSelf: 'center', marginTop: 4}]}
            />
          </TouchableOpacity>
          <Text
            numberOfLines={2}
            style={{
              width: '90%',
              marginTop: 16,
              fontSize: 12,
              color: Colors.text,
              marginHorizontal: 8,
            }}>
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 8,
              position: 'absolute',
              bottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                width: '68%',
              }}>
              ${item.price}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.tabbar,
                paddingVertical: 6,
                paddingHorizontal: 18,
                borderRadius: 14,
              }}
              onPress={() => {
                onAddToCart(item);
                setModalVisible(true);
                setTimeout(() => {
                  setModalVisible(false);
                }, 1000);
              }}>
              <Image source={Images.IC_CART} style={styles.cart} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <ModalAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Product;
