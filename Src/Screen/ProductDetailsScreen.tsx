import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../Hooks/useSelector';
import {addToCart} from '../redux/AddToCartScreenReducer';
import {ProductItem} from '../Api/HomeScreenApi';
import {useIsFocused} from '@react-navigation/native';
import {themeColor} from '../utils/theme';
import {FontAwesome} from '../utils/vectorIcon';
import { RootParaList } from '../Navigation/RootParamList';
import {StackNavigationProp} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type ProductDetailsRouteProp = RouteProp<RootParaList, 'productDetails'>;
type ProductDetailScreenProps = {
  navigation: StackNavigationProp<RootParaList, 'productDetails'>;
  route: ProductDetailsRouteProp;

};
const ProductDetailScreen = ({route}: ProductDetailScreenProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const dispatch = useAppDispatch();
  const isFoucoused = useIsFocused();
  const {productId} = route.params;

  const product = useAppSelector(state =>
    state.getAllProduct.productListing.find(
      (item: ProductItem) => item.id === productId,
    ),
  );

  const cartItem = useAppSelector(state =>
    state.cart.items.filter(e => e.id == productId),
  );

  useEffect(() => {
    if (cartItem.length > 0) setQuantity(cartItem[0].quantity);
    else setQuantity(1);
    if (product?.totalQuantity) setMaxQuantity(product.totalQuantity);
  }, [isFoucoused]);

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Product not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.mrp}>MRP </Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </View>

      <View style={styles.ratingContainer}>
        <View style={styles.ratingSubContainer}>
          <Text style={styles.ratingText}>{product.rating.rate}</Text>
          <FontAwesome
            name="star"
            color={themeColor.white}
            size={16}
            style={styles.iconStyle}
          />
        </View>

        <Text style={styles.ratingCount}>{product.rating.count} Ratings</Text>
      </View>

      <Text style={styles.descriptionHeader}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityHeader}>Quantity</Text>
        <View style={styles.quantityPlusMinusContainer}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              quantity == 1 && {backgroundColor: themeColor.disableColor},
            ]}
            onPress={() => reduceQuantity()}
            disabled={quantity == 1}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              quantity == maxQuantity && {
                backgroundColor: themeColor.disableColor,
              },
            ]}
            onPress={() => addQuantity()}
            disabled={quantity == maxQuantity}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          quantity !== 0 && dispatch(addToCart({...product, quantity}))
        }
        disabled={quantity == 0}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: themeColor.white,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  mrp: {
    fontSize: 16,
    color: themeColor.black,
  },
  price: {
    fontSize: 16,
    color: themeColor.link,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingSubContainer: {
    backgroundColor: themeColor.success,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 4,
    alignSelf: 'center',
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
    color: themeColor.white,
  },
  iconStyle: {
    alignSelf: 'center',
  },
  ratingCount: {
    fontSize: 14,
    color: themeColor.gray,
    marginLeft: 8,
  },
  descriptionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: themeColor.gray,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 20,
  },
  quantityPlusMinusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },
  quantityButton: {
    backgroundColor: themeColor.secondary,
    padding: 10,
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityValue: {
    marginHorizontal: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 26,
    backgroundColor: themeColor.primary,
  },
  buttonText: {
    color: themeColor.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
