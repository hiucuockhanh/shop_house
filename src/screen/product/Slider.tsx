import React, {FunctionComponent, useState} from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../util/util';
import Colors from '../../util/Colors';
import {addItemToWishlist} from '../../redux/action/action';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface Props {
  items: string[];
  product: Product;
}

const Slider: FunctionComponent<Props> = ({items, product}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [slider, setSlider] = useState(0);
  const [toggle, setToggle] = useState('white');

  const toggleHeart = (item: Product) => {
    if (toggle === 'white') {
      setToggle(Colors.error);
    } else {
      setToggle('white');
    }
    dispatch(addItemToWishlist(item));
  };

  const onChange = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != slider) {
        setSlider(slide);
      }
    }
  };

  return (
    <View>
      <ScrollView
        onScroll={({nativeEvent}) => onChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}>
        {items?.map((e, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('ImageSlider', {
                images: items,
              });
            }}>
            <Image resizeMode="cover" style={styles.wrap} source={{uri: e}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => toggleHeart(product)}>
        <View style={[styles.absRight, {backgroundColor: toggle}]}>
          <Image style={styles.imageRight} source={Images.IC_WISHLIST} />
        </View>
      </TouchableOpacity>
      <View style={styles.wrapDot}>
        {items?.map((e, index) => (
          <Text key={e} style={slider == index ? styles.doActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absRight: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  absTop: {
    position: 'absolute',
    top: 20,
    right: 10,
    padding: 10,
  },
  imageRight: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 6,
    height: 30,
    width: 30,
  },
  imageTop: {
    resizeMode: 'stretch',
    height: 40,
    width: 40,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.4,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  doActive: {
    margin: 3,
    fontSize: 12,
    color: 'black',
  },
  dot: {
    margin: 3,
    fontSize: 12,
    color: 'white',
  },
});

export default React.memo(Slider);
