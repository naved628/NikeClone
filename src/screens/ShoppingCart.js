// @ts-nocheck
import {
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
  cartSlice,
} from '../store/cartSlice';
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from '../store/apiSlice';
import { useStripe } from '@stripe/stripe-react-native';
import ShoppingCartTotals from './ShoppingCartTotals';
import CartListItem from '../components/CartListItem';

const ShoppingCart = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
    });
    if (response.error) {
      Alert.alert('Something went wrong');
      return;
    }

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'notJust.dev',
      paymentIntentClientSecret: response.data.paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }

    // 4. If payment ok -> create the order
    onCreateOrder();
  };

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: 'Vadim',
        address: 'My home',
        email: 'vadim@notjust.dev',
      },
    });

    if (result.data?.status === 'OK') {
      Alert.alert(
        'Order has been submitted',
        `Your order reference is: ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  };

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable onPress={onCheckout} style={styles.button}>
        <Text style={styles.buttonText}>
          Checkout
          {isLoading && <ActivityIndicator />}
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ShoppingCart;