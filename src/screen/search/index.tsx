import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../util/Colors';
import {useProducts} from '../../hook/product/useProduct';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../component/SearchBar';
import SearchResult from './SearchResult';

const Search = () => {
  console.log('re-render');
  const navigation = useNavigation();
  const {data, isLoading} = useProducts();
  const [keywordSearch, setKeywordSearch] = useState('');
  console.log(keywordSearch);
  const onChangeText = useCallback((text: string) => {
    setKeywordSearch(text);
  }, []);
  const onPressCancel = useCallback(() => {
    // @ts-ignore
    navigation.navigate('Home');
  }, [navigation]);
  const onSubmit = useCallback(() => {
    console.log('Submit');
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          keyword={keywordSearch}
          onChangeText={onChangeText}
          onCancel={onPressCancel}
          onSubmit={onSubmit}
          editable={true}
        />
      </View>
      <SearchResult input={keywordSearch} data={data} isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default Search;
