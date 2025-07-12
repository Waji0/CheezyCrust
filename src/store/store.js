import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { persistStore } from "redux-persist";
import ordersReducer from "./ordersSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer
  },
  middleware: (getDefaultMiddlerware) => {
    return getDefaultMiddlerware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/FLUSH', 'persist/REHYDRATE'], // 'persist/REHYDRATE' , 'persist/FLUSH' deepseek
        ignoredPaths: ['payload.result'] // Add this line
      }
    })
  }
});

export const persistor = persistStore(store);