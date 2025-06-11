import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import subscriptionReducer from "./subscription/subscriptionSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    subscription: subscriptionReducer,
  },
});
