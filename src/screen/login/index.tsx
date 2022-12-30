import React, {useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import Images from '../../util/util';
import CustomTextInput from '../../component/CustomTextInput';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../util/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalLoader from '../../component/ModalLoader';
import {useCustomerLogin} from '../../hook/user/useLogin';
import {loginUser} from '../../service/urls';

const Login = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);

  const onSuccess = () => {
    setModalVisible(true);
    setTimeout(() => {
      // @ts-ignore
      navigation.navigate('Bottom');
      setModalVisible(false);
    }, 2000);
  };
  const {isLoading, mutate} = useCustomerLogin(onSuccess);

  const validateEmail = (emailValidate: string) => {
    const regex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(emailValidate);
  };

  const validateForm = () => {
    if (email === '' || !validateEmail(email)) {
      setIsEmptyEmail(true);
    } else {
      setIsEmptyEmail(false);
    }
    if (password === '') {
      setIsEmptyPassword(true);
    } else {
      setIsEmptyPassword(false);
    }
  };

  const onPress = async () => {
    validateForm();
    let result = await fetch(loginUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({email: email, password: password}),
    });
    if (result.status === 201) {
      console.log(JSON.stringify(result));
      AsyncStorage.setItem('email', email);
      setModalVisible(true);
      setTimeout(() => {
        // @ts-ignore
        navigation.navigate('Bottom');
        setModalVisible(false);
      }, 1200);
    } else {
      console.log('Login fail!!!');
      Alert.alert('Account does not exist', 'Invalid email or password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    console.log(`Value: ${email} : ${password}`);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={Images.LoginBackground} />
      <Image style={styles.logo} source={Images.BackgroundImage} />
      <Text style={styles.login}>Sign In</Text>
      <CustomTextInput
        value={email}
        onChangeText={value => {
          setEmail(value);
          setIsEmptyEmail(false);
        }}
        icon={Images.IC_EMAIL}
        placeholder={'Enter your email'}
        borderColor={isEmptyEmail ? Colors.error : Colors.black}
        borderWidth={isEmptyEmail ? 2 : 1}
      />
      <CustomTextInput
        value={password}
        onChangeText={value => {
          setPassword(value);
          setIsEmptyPassword(false);
        }}
        icon={Images.IC_PASSWORD}
        placeholder={'Enter your password'}
        type={'password'}
        borderColor={isEmptyPassword ? Colors.error : Colors.black}
        borderWidth={isEmptyPassword ? 2 : 1}
      />
      <CustomButton
        title={'Sign In'}
        onPress={onPress}
        bgColor={Colors.primary}
        textColor={Colors.white}
      />
      <Text
        style={styles.signup}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Signup');
        }}>
        Create New Account
      </Text>
      <ModalLoader
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 130,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    resizeMode: 'cover',
    borderRadius: 50,
  },
  background: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  login: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 40,
    alignSelf: 'center',
  },
  signup: {
    marginTop: 60,
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default Login;
