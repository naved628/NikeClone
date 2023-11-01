import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import {StripeProvider} from '@stripe/stripe-react-native';

import { store } from "./src/store";
import Navigation from "./src/navigation";

export default function App() {
  
  const STRIPEKEY = 'pk_test_51O7LWKSIHJUOV15yd9KlZOU6gD9i2cWmBuyvHFJNnyd5b22IACaOxpUBqOG1jp5c0joTDveAWZQvX3RqRFWRxjI5007lKiIEW0';
  
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPEKEY}>
        <Navigation />
        <StatusBar style="auto" />
      </StripeProvider>
    </Provider>
  );
}

