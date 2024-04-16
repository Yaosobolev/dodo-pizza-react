import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type fetchPizzasArg = {
  selectPage: number;
  categotiType: number;
  sortType: number;
  handleSearch: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], fetchPizzasArg>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { selectPage, categotiType, sortType, handleSearch } = params;

    const Sortw = (index: number) => {
      if (index === 0) return "rating";
      else if (index === 1) return "price";
      else return "title";
    };
    const pizzaUrl = `https://65341c62e1b6f4c5904691be.mockapi.io/items?&page=${selectPage}&limit=4&${
      categotiType > 0 ? `category=${categotiType}` : ""
    }&sortBy=${Sortw(sortType)}&order=desc${handleSearch}`;
    const { data } = await axios.get<PizzaItem[]>(pizzaUrl);
    return data;
  }
);

type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  count: number;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  Items: PizzaItem[];
  status: Status;
}

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

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
