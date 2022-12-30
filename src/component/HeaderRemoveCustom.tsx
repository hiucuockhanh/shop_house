import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FunctionComponent} from 'react';
import Images from '../util/util';
import Colors from '../util/Colors';

interface Props {
  title?: string;
  onPressBack?: () => void;
  style?: StyleProp<ViewStyle>;
  rightIcon?: ImageSourcePropType | number;
  onPressRightIcon?: () => void;
}

const HeaderRemoveCustom: FunctionComponent<Props> = ({
  onPressBack,
  title,
  style,
  rightIcon,
  onPressRightIcon,
}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: Colors.white,
          paddingTop: top,
        },
        style,
      ]}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
          <Image
            source={Images.IC_X}
            style={{
              width: 16,
              height: 16,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {
                color: Colors.black,
              },
            ]}>
            {title}
          </Text>
        </View>

        {rightIcon ? (
          <TouchableOpacity
            style={styles.rightButton}
            onPress={onPressRightIcon}>
            <Image
              source={rightIcon}
              style={{
                width: 18,
                height: 18,
                // tintColor: Colors.tabbar
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.rightButton} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingTop: 0,
    marginBottom: 1,
  },

  container: {
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  backButton: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  rightButton: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    lineHeight: 20,
    fontSize: 18,
    alignItems: 'center',
    fontWeight: '500',
  },
  label: {
    // color: 'red',
    display: 'flex',
    alignItems: 'center',
    lineHeight: 20,
    fontSize: 14,
  },
});

export default HeaderRemoveCustom;
