// import { Pizza } from "../data/menu-items";
import { createSlice } from "@reduxjs/toolkit";
import { formatPrice } from "../utils/price-util";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const initialState = {
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const matchingPizza = state.items.find(existingItem => {
                return existingItem.id == action.payload.id;
            });
            if (!matchingPizza) {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });
            } else {
                matchingPizza.quantity++;
            }
        },
        removeItem: (state, action) => {
            const matchingPizza = state.items.find(existingItem => {
                return existingItem.id === action.payload.id;
            });

            if (matchingPizza) {
                matchingPizza.quantity--;

                if (matchingPizza.quantity <= 0) {  
                    state.items = state.items.filter(item => {
                        return item.id !== matchingPizza.id;
                    });
                }
            }
        },
        deleteItem: (state, action) => {
            const matchingPizza = state.items.find(existingItem => {
                return existingItem.id == action.payload.id;
            });

            if (matchingPizza) {
                state.items = state.items.filter(item => {
                    return item.id !== matchingPizza.id;
                });
            }
        },
        resetCart: (state) => {
            state.items = [];
        }
    }
}); 

export const { addItem, removeItem, deleteItem, resetCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default persistReducer({
    key: 'cart',
    storage
}, cartReducer);

export const selectCartItems = (state) => {
    return state.cart.items;
};

export const selectItemQuantity = (item) => {
  return (state) => {
    const matchingCartItem = state.cart.items.find(existingItem => {
      return existingItem.id === item.id;
    });
    return matchingCartItem?.quantity || 0;
  }
};

export const selectPizzasCount = (state) => {
    return state.cart.items.reduce((acc, nextItem) => {
        return acc + nextItem.quantity;
    }, 0);
};

export const selectCartTotal = (state) => {
    const totalPrice = state.cart.items.reduce((acc, nextItem) => {
        return acc + (nextItem.quantity * nextItem.price);
    }, 0);
    return formatPrice(totalPrice);
};