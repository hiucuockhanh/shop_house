import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../util/util';
import Colors from '../util/Colors';
import {debounce} from 'lodash';

interface Props {
  keyword?: string;
  onCancel?: () => void;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  onSubmit?: (value: string) => void;
}
const SearchBar: React.FunctionComponent<Props> = ({
  keyword,
  editable,
  onSubmit,
  onChangeText: changeText,
  onCancel,
}) => {
  const refInputSearch = useRef<TextInput | null>(null);

  const [textInput, setTextInput] = useState('');
  const clearInput = useCallback(() => {
    refInputSearch.current?.clear();
    setTextInput('');
    changeText?.('');
  }, [changeText]);
  const handleCancel = useCallback(() => {
    Keyboard.dismiss();
    clearInput();
    onCancel?.();
  }, [clearInput, onCancel]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeText = useCallback(
    debounce(
      (text: string) => {
        changeText?.(text);
        setTextInput(text);
      },
      400,
      {trailing: true},
    ),
    [],
  );
  const onSubmitEditing = useCallback(
    (event: any) => {
      const text = event.nativeEvent.text;
      onSubmit?.(text);
    },
    [onSubmit],
  );

  useEffect(() => {
    refInputSearch.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.searchContainer}>
          <View
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={Images.IC_SEARCH} style={{height: 20, width: 20}} />
          </View>
          <TextInput
            editable={editable}
            ref={refInputSearch}
            defaultValue={keyword}
            onChangeText={onChangeText}
            placeholder={'Search'}
            onSubmitEditing={onSubmitEditing}
            style={styles.txtInput}
          />
          {textInput.length && editable ? (
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              disabled={!editable}
              onPress={clearInput}>
              <Image source={Images.IC_DELETE} style={styles.iconClear} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        {onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={[styles.cancelLabel, {color: Colors.black}]}>
              Cancel
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtInput: {
    flex: 1,
  },
  searchContainer: {
    width: '80%',
    height: 40,
    marginTop: 60,
    borderRadius: 20,
    marginLeft: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconClear: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    marginRight: 14,
  },
  cancelLabel: {
    lineHeight: 20,
    fontSize: 16,
    paddingHorizontal: 12,
  },
});
export default React.memo(SearchBar);
