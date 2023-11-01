// @ts-nocheck
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import ProductScreen from "./screens/ProductScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import TrackOrder from './screens/TrackOrder';
import {selectNumberOfItems } from "./store/cartSlice";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numofSelectedItems = useSelector(selectNumberOfItems);

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
                onPress={() => navigation.navigate('Cart')}
                style={styles.iconStyle}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={styles.iconText}>{numofSelectedItems}</Text>
              </Pressable>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
              onPress={() => navigation.navigate('Track Order')}
                name="truck-delivery"
                size={22}
                color="gray"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
        <Stack.Screen name="Track Order" component={TrackOrder} />
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
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default Navigation;
