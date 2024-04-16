import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import cloneDeep from "lodash/cloneDeep";
import { RootState } from "../store";
import { getCartFromLC } from "../../utils/getCartFromLC";
import { CartPizza, CartSliceState } from "./types";

const { items, totalPrice } = getCartFromLC();
const initialState: CartSliceState = {
  pizzas: items,
  amount: totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<CartPizza>) => {
      const { id, type, size } = action.payload;
      const existingPizza = state.pizzas.find(
        (pizza) => pizza.id === id && pizza.type === type && pizza.size === size
      );
      if (existingPizza) {
        existingPizza.count += 1;
      } else {
        state.pizzas.push({ ...action.payload, count: 1 });
      }
    },
    setAmount: (state) => {
      state.amount = state.pizzas.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },

    setDecrementPizza: (state, action: PayloadAction<CartPizza>) => {
      const { id, type, size } = action.payload;
      state.pizzas = state.pizzas.filter((pizza) => {
        if (pizza.id === id && pizza.type === type && pizza.size === size) {
          pizza.count -= 1;
          return pizza.count > 0;
        }
        return true;
      });
    },

    setRemovePizza: (state, action: PayloadAction<CartPizza[]>) => {
      const curPizza = action.payload;
      const reversedData = cloneDeep(state.pizzas).reverse();

      const filteredData = reversedData.filter(
        (item) =>
          item.title !== curPizza[0].title ||
          item.size !== curPizza[0].size ||
          item.type !== curPizza[0].type
      );

      state.pizzas = filteredData.reverse();
    },
    setRemovePizzas: (state) => {
      state.pizzas = [];
    },
  },
});

export const {
  setPizzas,
  setAmount,

  setDecrementPizza,
  setRemovePizza,
  setRemovePizzas,
} = cartSlice.actions;

export default cartSlice.reducer;
