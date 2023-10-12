import {
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import products from "../data/products";
import { useNavigation } from "@react-navigation/native";

const ProductScreen = ({navigation}) => {
//   const navigation = useNavigation();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={products}
      renderItem={({ item }) => (
        <Pressable
          // @ts-ignore
          onPress={() => navigation.navigate("Product Details")}
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
