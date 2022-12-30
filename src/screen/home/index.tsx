import React from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../component/Header';
import {useCategories} from '../../hook/category/useCategory';
import Colors from '../../util/Colors';
import {MaterialIndicator} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const {data, isLoading} = useCategories();

  const renderItem: ListRenderItem<Category> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('Press item: ', item.id);
          // @ts-ignore
          navigation.navigate('ProductList', {
            id: item.id,
            name: item.name,
          });
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <FastImage
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
          <View style={styles.wrapper}>
            <Text style={styles.textCategory}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      {isLoading && <MaterialIndicator size={50} color={Colors.primary} />}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
      <View style={{marginBottom: 76}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 1,
  },
  image: {
    height: 160,
    width: width,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  textCategory: {
    fontSize: 14,
    color: Colors.black,
    textTransform: 'uppercase',
  },
  wrapper: {
    backgroundColor: Colors.white,
    padding: 6,
    position: 'absolute',
    left: 10,
    bottom: 20,
  },
});

export default Home;
