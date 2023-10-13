// @ts-nocheck
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CartListItem from "../../components/CartListItem";
import ShoppingCartTotals from "./ShoppingCartTotals";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  // @ts-ignore
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
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
