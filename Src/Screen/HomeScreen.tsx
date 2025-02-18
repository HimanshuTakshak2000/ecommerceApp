import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import type {ProductItem} from '../Api/HomeScreenApi';
import {useAppDispatch, useAppSelector} from '../Hooks/useSelector';
import {getAllProducts} from '../redux/HomeScreenReducer';
import StarRating from '../Components/StarRating';
import {themeColor} from '../utils/theme';
import { RootParaList } from '../Navigation/RootParamList';
import {StackNavigationProp} from '@react-navigation/stack';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootParaList, 'home'>;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const {productListing, loading} = useAppSelector(
    state => state.getAllProduct,
  );
  const [displayData, setDisplayData] = useState<ProductItem[]>([]);
  const [breakState, setBreakState] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productListing) {
      setDisplayData(productListing);
    }
  }, [productListing]);

  useEffect(() => {
    if (loading == 'idle') {
      setTimeout(() => {
        setBreakState(true);
      }, 4000);
    }
  }, [loading]);

  const handleEmpty = () => {
    return (
      <View style={styles.handleEmptyContainer}>
        <Text style={styles.title}> No data present!</Text>
      </View>
    );
  };
  const renderItem = ({item}: {item: ProductItem}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('productDetails', {
            productId: item.id,
          })
        }
        activeOpacity={0.7}>
        <Image
          source={{uri: item.image}}
          style={styles.itemImage}
          resizeMode="contain"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.title.length > 20
              ? `${item.title.slice(0, 20)}...`
              : item.title}
          </Text>

          <Text style={styles.price}>₹ {item.price}</Text>
          <StarRating rating={item.rating.rate} starSize={16} />
        </View>
      </TouchableOpacity>
    );
  };

  return loading === 'loading' ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={themeColor.link} />
    </View>
  ) : (
    <FlatList
      data={displayData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListEmptyComponent={breakState ? handleEmpty : null}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemContainer: {
    width: '48%',
    backgroundColor: themeColor.white,
    borderRadius: 8,
    shadowColor: themeColor.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    height: 168,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  handleEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: themeColor.gray,
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
    color: themeColor.link,
  },
});
