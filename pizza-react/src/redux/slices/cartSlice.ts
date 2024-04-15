import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import unick, { isEqual } from "lodash";

import cloneDeep from "lodash/cloneDeep";
import { RootState } from "../store";

type CartPizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: string;
  count: number;
};

interface CartSliceState {
  pizzas: CartPizza[];
  amount: number;
  uniqPizzas: CartPizza[];
  sortPizzas: CartPizza[];
}

const initialState: CartSliceState = {
  pizzas: [],
  amount: 0,
  uniqPizzas: [],
  sortPizzas: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<CartPizza>) => {
      state.pizzas.push(action.payload);
    },
    setAmount: (state) => {
      state.amount = state.pizzas.reduce((sum, item) => {
        return sum + item.price;
      }, 0);
    },
    setUniqPizzas: (state) => {
      state.sortPizzas = unick.orderBy(state.pizzas, "count", "desc");

      state.uniqPizzas = unick.uniqWith(state.sortPizzas, (item1, item2) => {
        return (
          item1.id === item2.id &&
          item1.size === item2.size &&
          item1.type === item2.type
        );
      });
    },

    setDecrementPizza: (state, action: PayloadAction<CartPizza[]>) => {
      const curPizza = action.payload;
      const reversedData = cloneDeep(state.pizzas).reverse();
      let removed = false;

      const filteredData = reversedData.filter((item) => {
        if (
          !removed &&
          item.title === curPizza[0].title &&
          item.size === curPizza[0].size &&
          item.type === curPizza[0].type
        ) {
          removed = true;
          return false;
        }
        return true;
      });

      state.pizzas = filteredData.reverse();
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

export const selectCart = (state: RootState) => state.cart;

export const {
  setPizzas,
  setAmount,
  setUniqPizzas,

  setDecrementPizza,
  setRemovePizza,
  setRemovePizzas,
} = cartSlice.actions;

export default cartSlice.reducer;
