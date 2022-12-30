import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  bgColor: string;
  textColor: string;
}

const CustomButton: React.FunctionComponent<Props> = ({
  title,
  onPress,
  bgColor,
  textColor,
}) => {
  return (
    <View style={{width: '85%'}}>
      <TouchableOpacity
        onPress={onPress}
        style={[{backgroundColor: bgColor}, styles.button]}>
        <Text style={{color: textColor, fontSize: 18}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
});

export default CustomButton;
