import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screen/HomeScreen';
import ProductDetailsScreen from '../Screen/ProductDetailsScreen';
import AddToCartScreen from '../Screen/AddToCartScreen';
import {Icon} from '../utils/vectorIcon';
import {useAppSelector} from '../Hooks/useSelector';
import {themeColor} from '../utils/theme';
import { RootParaList } from './RootParamList';

const Stack = createNativeStackNavigator<RootParaList>();

const Main = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: () => (
          <>
            {cartItems.length > 0 && (
              <View style={styles.cartNumberContainer}>
                <Text style={styles.cartNumber}>
                  {cartItems.reduce((acc, t) => acc + t.quantity, 0)}
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('addToCart')}
              style={styles.cartButton}>
              <Icon name="cart-outline" size={24} color={themeColor.black} />
            </TouchableOpacity>
          </>
        ),
      })}>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="productDetails"
        component={ProductDetailsScreen}
        options={{title: 'Product Detail'}}
      />
      <Stack.Screen
        name="addToCart"
        component={AddToCartScreen}
        options={{title: 'Product Cart'}}
      />
    </Stack.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cartNumberContainer: {
    position: 'absolute',
    top: -14,
    backgroundColor: themeColor.danger,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  cartNumber: {
    color: themeColor.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartButton: {
    marginRight: 15,
  },
});
