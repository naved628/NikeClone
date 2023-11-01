// @ts-nocheck
import { FlatList, Image, StyleSheet, Pressable, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productSlice } from "../store/productsSlice";
import { useGetProductsQuery } from "../store/apiSlice";

const ProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products: {error.error}</Text>;
  }

  const products = data.data;
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            // update selected product
            // dispatch(productSlice.actions.setSelectedProducts(item.id))
            navigation.navigate("Product Details",{id: item._id})
        }
    }
          style={styles.itemContainer}
        >
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 1,
  },
});

export default ProductScreen;
