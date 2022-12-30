import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  icon: ImageSourcePropType;
  placeholder?: string;
  type?: string;
  borderColor?: string;
  borderWidth?: number;
}

const CustomTextInput: React.FunctionComponent<Props> = ({
  value,
  onChangeText,
  icon,
  placeholder,
  type,
  borderColor,
  borderWidth,
}) => {
  return (
    <View
      style={[
        styles.input,
        {borderColor: borderColor, borderWidth: borderWidth},
      ]}>
      <Image source={icon} style={[styles.image, {tintColor: borderColor}]} />
      <TextInput
        placeholder={placeholder}
        value={value}
        style={{marginLeft: 10, width: '100%'}}
        secureTextEntry={type ? true : false}
        onChangeText={onChangeText}
        // keyboardType={type ? type : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '85%',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 40,
  },
  image: {
    height: 24,
    width: 24,
  },
});

export default CustomTextInput;
