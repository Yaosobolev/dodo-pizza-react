import { createSlice } from "@reduxjs/toolkit";
import unick, { isEqual } from "lodash";

const initialState = {
  pizzas: [],
  amount: 0,
  uniqPizzas: [],
  sortPizzas: [],

  countPizza: 0,
  index: [],
  selectedIndex: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas.push(action.payload);
    },
    setAmount: (state, action) => {
      state.amount += action.payload;
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
  },
});

export const {
  setPizzas,
  setAmount,
  setUniqPizzas,
  setCountPizzas,
  setCountPizza,
  setIndex,
  setSelectedIndex,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
