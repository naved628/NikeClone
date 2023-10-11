import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import products from "../data/products";

const ProductScreen = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={products}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </View>
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
