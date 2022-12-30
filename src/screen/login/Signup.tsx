import React, {useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Images from '../../util/util';
import CustomTextInput from '../../component/CustomTextInput';
import CustomButton from '../../component/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../util/Colors';
import ModalAlert from '../../component/ModalAlert';
import {useCreateAccount} from '../../hook/user/useLogin';
import {createNewUser} from '../../service/urls';

const SignUp = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);
  const [isEmptyConfirmPassword, setIsEmptyConfirmPassword] = useState(false);
  const avatar = 'https://api.lorem.space/image/face?w=640&h=480';
  const onSuccess = () => {
    setModalVisible(true);
    setTimeout(() => {
      // @ts-ignore
      navigation.navigate('Login');
      setModalVisible(false);
    }, 2000);
  };

  const param = {name, email, password, avatar};

  const {isLoading, mutateAsync} = useCreateAccount(onSuccess);

  const validateEmail = (emailValidate: string) => {
    const regex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(emailValidate);
  };

  const validateForm = () => {
    if (name === '') {
      setIsEmptyName(true);
      setIsValid(false);
    } else {
      setIsEmptyName(false);
      setIsValid(true);
    }
    if (email === '' || !validateEmail(email)) {
      setIsEmptyEmail(true);
      setIsValid(false);
    } else {
      setIsEmptyEmail(false);
      setIsValid(true);
    }
    if (password === '') {
      setIsEmptyPassword(true);
      setIsValid(false);
    } else {
      setIsEmptyPassword(false);
      setIsValid(true);
    }
    if (confirmPassword === '') {
      setIsEmptyConfirmPassword(true);
      setIsValid(false);
    } else {
      setIsEmptyConfirmPassword(false);
      setIsValid(true);
    }
    if (password !== confirmPassword) {
      Alert.alert('Wrong!', 'Invalid password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setIsValid(false);
    }
  };

  const onPress = async (params: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  }) => {
    console.log('Is valid: ', isValid);
    console.log(`Value: ${email} : ${password} : ${confirmPassword}`);
    validateForm();

    if (isValid) {
      const result = await fetch(createNewUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          avatar: 'https://api.lorem.space/image/face?w=640&h=480',
        }),
      });
      if (result.status === 201) {
        console.log(JSON.stringify(result));
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('name', name);
        setModalVisible(true);
        setTimeout(() => {
          // @ts-ignore
          navigation.navigate('Login');
          setModalVisible(false);
        }, 1000);
      } else {
        console.log('Login fail!!!');
        Alert.alert('Account does not exist', 'Invalid email or password', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
      return result;
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={Images.LoginBackground} />
      <Image style={styles.logo} source={Images.BackgroundImage} />
      <Text style={styles.login}>Create Account</Text>
      <CustomTextInput
        value={name}
        onChangeText={value => setName(value)}
        icon={Images.IC_USER}
        placeholder={'Enter your name'}
        borderColor={isEmptyName ? Colors.error : Colors.black}
        borderWidth={isEmptyName ? 2 : 1}
      />
      <CustomTextInput
        value={email}
        onChangeText={value => setEmail(value)}
        icon={Images.IC_EMAIL}
        placeholder={'Enter your email'}
        borderColor={isEmptyEmail ? Colors.error : Colors.black}
        borderWidth={isEmptyEmail ? 2 : 1}
      />
      <CustomTextInput
        value={password}
        onChangeText={value => setPassword(value)}
        icon={Images.IC_PASSWORD}
        placeholder={'Enter your password'}
        type={'password'}
        borderColor={isEmptyPassword ? Colors.error : Colors.black}
        borderWidth={isEmptyPassword ? 2 : 1}
      />
      <CustomTextInput
        value={confirmPassword}
        onChangeText={value => setConfirmPassword(value)}
        icon={Images.IC_PASSWORD}
        placeholder={'Confirm password'}
        type={'password'}
        borderColor={isEmptyConfirmPassword ? Colors.error : Colors.black}
        borderWidth={isEmptyConfirmPassword ? 2 : 1}
      />
      <CustomButton
        title={'Sign Up'}
        onPress={() => onPress(param)}
        bgColor={Colors.primary}
        textColor={Colors.white}
      />
      <Text
        style={styles.signup}
        onPress={() => {
          navigation.goBack();
        }}>
        Already have account?
      </Text>
      <ModalAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Registration Successfully'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  background: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    resizeMode: 'cover',
    borderRadius: 50,
    marginTop: 40,
  },
  login: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 40,
    alignSelf: 'center',
  },
  signup: {
    marginTop: 60,
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
