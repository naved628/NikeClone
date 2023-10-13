// @ts-nocheck
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "./screens/ProductScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { cartSlice } from "./store/cartSlice";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const numofSelectedItems = useSelector((state) => state.cart.items);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Shopping Carts")}
                style={styles.iconStyle}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={styles.iconText}>{numofSelectedItems.length}</Text>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Shopping Carts" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    flexDirection: "row",
    marginRight: 10,
  },
  iconText: {
    marginLeft: 5,
    fontWeight: "500",
  },
});

export default Navigation;
