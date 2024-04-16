import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaItem, PizzaSliceState, Status, fetchPizzasArg } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliceState = {
  Items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.Items = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.Items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.Items = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.Items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
