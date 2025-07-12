import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    items: []
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        createOrder: (state, action) => {
            const maskedCCRegex = /\d(?=(?:\D*\d){4})/g;
            const maskedCCNumber = action.payload.creditCardNum.replace(
                maskedCCRegex,
                '*'
            );
            const newOrder = {
                ...action.payload,
                creditCardNum: maskedCCNumber
            }
            state.items.push(newOrder);
        },
        removeOrder: (state, action) => {
            state.items = state.items.filter(item => {
                return item.id !== action.payload.id;
            });
        }
    }
});

export const { createOrder, removeOrder } = ordersSlice.actions;

const ordersReducer = ordersSlice.reducer;

export default persistReducer({
    key: 'orders',
    storage
}, ordersReducer);

