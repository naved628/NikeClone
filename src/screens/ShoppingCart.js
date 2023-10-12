import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import cart from "../data/cart";
import CartListItem from "../../components/CartListItem";
import ShoppingCartTotals from "./ShoppingCartTotals";

const ShoppingCart = () => {
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ShoppingCart;
