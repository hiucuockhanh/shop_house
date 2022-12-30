import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderBackCustom from '../../component/HeaderBackCustom';
import Images from '../../util/util';
import CustomTextInput from '../../component/CustomTextInput';
import Colors from '../../util/Colors';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addAddress} from '../../redux/action/action';
import ModalAlert from '../../component/ModalAlert';

const ItemAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [company, setCompany] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isEmptyPhone, setIsEmptyPhone] = useState(false);
  const [isEmptyAddress, setIsEmptyAddress] = useState(false);
  const [isEmptyCity, setIsEmptyCity] = useState(false);
  const [isEmptyCompany, setIsEmptyCompany] = useState(false);
  const [isEmptyZipcode, setIsEmptyZipcode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const validateForm = () => {
    if (phone === '') {
      setIsEmptyPhone(true);
    } else {
      setIsEmptyPhone(false);
    }
    if (address === '') {
      setIsEmptyAddress(true);
    } else {
      setIsEmptyAddress(false);
    }
    if (city === '') {
      setIsEmptyCity(true);
    } else {
      setIsEmptyCity(false);
    }
    if (company === '') {
      setIsEmptyCompany(true);
    } else {
      setIsEmptyCompany(false);
    }
    if (zipcode === '') {
      setIsEmptyZipcode(true);
    } else {
      setIsEmptyZipcode(false);
    }
  };
  const onPressBackIcon = () => {
    navigation.goBack();
  };
  const onPress = () => {
    console.log('DONE');
    validateForm();
    dispatch(addAddress({phone, address, city, company, zipcode}));
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.goBack();
    }, 1500);
  };
  return (
    <View style={styles.container}>
      <HeaderBackCustom title={'New Address'} onPressBack={onPressBackIcon} />
      <CustomTextInput
        value={phone}
        onChangeText={value => {
          setPhone(value);
          setIsEmptyPhone(false);
        }}
        icon={Images.IC_PHONE}
        keyboardType={'number-pad'}
        placeholder={'Enter your phone number'}
        borderColor={isEmptyPhone ? Colors.error : Colors.black}
        borderWidth={isEmptyPhone ? 2 : 1}
      />
      <CustomTextInput
        value={address}
        onChangeText={value => {
          setAddress(value);
          setIsEmptyAddress(false);
        }}
        icon={Images.IC_ADDRESS}
        placeholder={'Enter your address'}
        borderColor={isEmptyAddress ? Colors.error : Colors.black}
        borderWidth={isEmptyAddress ? 2 : 1}
      />
      <CustomTextInput
        value={city}
        onChangeText={value => {
          setCity(value);
          setIsEmptyCity(false);
        }}
        icon={Images.IC_CITY}
        placeholder={'Enter your city'}
        borderColor={isEmptyCity ? Colors.error : Colors.black}
        borderWidth={isEmptyCity ? 2 : 1}
      />
      <CustomTextInput
        value={company}
        onChangeText={value => {
          setCompany(value);
          setIsEmptyCompany(false);
        }}
        icon={Images.IC_COMPANY}
        placeholder={'Enter your company'}
        borderColor={isEmptyCompany ? Colors.error : Colors.black}
        borderWidth={isEmptyCompany ? 2 : 1}
      />
      <CustomTextInput
        value={zipcode}
        onChangeText={value => {
          setZipcode(value);
          setIsEmptyZipcode(false);
        }}
        icon={Images.IC_ZIPCODE}
        keyboardType={'number-pad'}
        placeholder={'Enter your zipcode'}
        borderColor={isEmptyZipcode ? Colors.error : Colors.black}
        borderWidth={isEmptyZipcode ? 2 : 1}
      />
      <View style={{alignItems: 'center', marginTop: 20}}>
        <CustomButton
          title={'Done'}
          onPress={onPress}
          bgColor={Colors.tabbar}
          textColor={Colors.white}
        />
      </View>
      <ModalAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Created Address'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ItemAddress;
