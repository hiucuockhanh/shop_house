import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './screen/splash';
import Login from './screen/login';
import SignUp from './screen/login/Signup';
import BottomTabNavigator from './screen/BottomTabNavigator';
import ProductList from './screen/product_list';
import Product from './screen/product';
import Address from './screen/address';
import ItemAddress from './screen/address/ItemAddress';
import EditProfile from './screen/edit_profile';
import ImageSliders from './screen/product/ImageSlider';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'} screenOptions={() => ({})}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Signup"
          component={SignUp}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Bottom"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Product"
          component={Product}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Address"
          component={Address}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ProductList"
          component={ProductList}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ItemAddress"
          component={ItemAddress}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ImageSlider"
          component={ImageSliders}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
