import { createSlice } from "@reduxjs/toolkit";
import unick, { isEqual } from "lodash";

import cloneDeep from "lodash/cloneDeep";

const initialState = {
  pizzas: [],
  amount: 0,
  uniqPizzas: [],
  sortPizzas: [],

  countPizza: 0,
  index: [],
  selectedIndex: [],

  reversedData: [],
  filteredData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas.push(action.payload);
    },
    setAmount: (state) => {
      // state.amount += action.payload;
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

      // state.uniqPizzas.push(action.payload);
    },

    setCountPizza: (state, action) => {
      state.countPizza = action.payload;
    },
    setIndex: (state, action) => {
      state.index.push(action.payload);
    },
    setSelectedIndex: (state) => {
      state.selectedIndex = unick.uniqWith(state.index, isEqual);
    },

    setDecrementPizza: (state, action) => {
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
    setRemovePizza: (state, action) => {
      const curPizza = action.payload;
      const reversedData = cloneDeep(state.pizzas).reverse();

      console.log(reversedData);

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

export const selectCart = (state) => state.cart;

export const {
  setPizzas,
  setAmount,
  setUniqPizzas,
  setCountPizzas,
  setCountPizza,
  setIndex,
  setSelectedIndex,
  setDecrementPizza,
  setRemovePizza,
  setRemovePizzas,
} = cartSlice.actions;

export default cartSlice.reducer;
