import { FlatList, Image, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productSlice } from "../store/productsSlice";

const ProductScreen = ({ navigation }) => {
  // @ts-ignore
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            dispatch(productSlice.actions.setSelectedProducts(item.id))
            navigation.navigate("Product Details")
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
