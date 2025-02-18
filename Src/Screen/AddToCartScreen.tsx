import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../Hooks/useSelector';
import {removeFromCart, clearCart} from '../redux/AddToCartScreenReducer';
import {ProductItem} from '../Api/HomeScreenApi';
import {themeColor} from '../utils/theme';

const AddToCartScreen = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const totalAmount = cartItems.reduce(
    (acc, e) => acc + e.price * e.quantity,
    0,
  );

  const totalItem = cartItems.length;

  const renderItem = ({item}: {item: ProductItem}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.price}>Item Price: ₹{item.price}</Text>
            <Text style={styles.quantity}>
              Total Price: ₹{item.price * item.quantity}
            </Text>
          </View>
          <Text style={styles.quantity}>Qty: {item.quantity}</Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => dispatch(removeFromCart(item.id))}
          activeOpacity={0.7}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const PriceDetails = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerHeader}>
        Price Details {`(${totalItem} Items)`}
      </Text>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Total MRP</Text>
        <Text style={styles.footerText}>₹ {totalAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Discount on MRP</Text>
        <Text style={styles.footerDisText}>0%</Text>
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Shipping Fee</Text>
        <Text style={styles.footerDisText}>FREE</Text>
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.footerTextBold}>Total Amount</Text>
        <Text style={styles.footerTextBold}>₹ {totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {totalItem === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <PriceDetails />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => dispatch(clearCart())}
            activeOpacity={0.7}>
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AddToCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: themeColor.white,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: themeColor.disableColor,
    padding: 10,
    borderRadius: 6,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  price: {
    fontSize: 14,
    color: themeColor.link,
  },
  quantity: {
    fontSize: 14,
    color: themeColor.black,
  },
  removeButton: {
    backgroundColor: themeColor.primary,
    borderRadius: 10,
    padding: 10,
  },
  removeButtonText: {
    color: themeColor.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  footerContainer: {
    backgroundColor: themeColor.white,
    padding: 16,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: themeColor.secondary,
  },
  footerHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    color: themeColor.gray,
  },
  footerDisText: {
    fontSize: 14,
    color: themeColor.success,
  },
  footerTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearCartButton: {
    backgroundColor: themeColor.danger,
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
  },
  clearCartText: {
    color: themeColor.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: themeColor.danger,
    borderRadius: 10,
    padding: 16,
  },
  clearButtonText: {
    color: themeColor.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
