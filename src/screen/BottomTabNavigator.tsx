import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Images from '../util/util';
import Colors from '../util/Colors';
import Search from './search';
import Wishlist from './wishlist';
import Home from './home';
import Profile from './profile';
import ShoppingCart from './cart';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/store';

const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <BottomTab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.tabbar,
        tabBarIcon: ({focused}) => {
          let iconName: ImageSourcePropType = 0;
          if (route.name === 'Home') {
            iconName = Images.IC_HOME;
          } else if (route.name === 'Search') {
            iconName = Images.IC_SEARCH;
          } else if (route.name === 'Shopping Cart') {
            iconName = Images.IC_CART;
          } else if (route.name === 'Wishlist') {
            iconName = Images.IC_WISHLIST;
          } else if (route.name === 'Profile') {
            iconName = Images.IC_USER;
          }
          return (
            <Image
              source={iconName}
              style={{
                height: 24,
                width: 24,
                tintColor: focused ? Colors.tabbar : Colors.black,
              }}
            />
          );
        },
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
        },
      })}>
      <BottomTab.Screen name={'Home'} component={Home} />
      <BottomTab.Screen name={'Search'} component={Search} />
      <BottomTab.Screen
        name={'Shopping Cart'}
        options={{headerShown: true, tabBarBadge: cart.length}}
        component={ShoppingCart}
      />
      <BottomTab.Screen
        name={'Wishlist'}
        options={{
          headerShown: true,
          tabBarBadge: wishlist.length,
        }}
        component={Wishlist}
      />
      <BottomTab.Screen name={'Profile'} component={Profile} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
