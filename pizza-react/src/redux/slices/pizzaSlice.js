import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { selectPage, categotiType, sortType, handleSearch } = params;

    const Sortw = (index) => {
      if (index === 0) return "rating";
      else if (index === 1) return "price";
      else return "title";
    };
    const pizzaUrl = `https://65341c62e1b6f4c5904691be.mockapi.io/items?&page=${selectPage}&limit=4&${
      categotiType > 0 ? `category=${categotiType}` : ""
    }&sortBy=${Sortw(sortType)}&order=desc${handleSearch}`;
    const { data } = await axios.get(pizzaUrl);
    return data;
  }
);

const initialState = {
  Items: [],
  status: "loading", //loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.Items = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.Items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.Items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.Items = [];
    });
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
