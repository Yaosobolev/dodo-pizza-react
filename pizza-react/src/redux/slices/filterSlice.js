import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountPage = createAsyncThunk(
  "filter/fetchCountPageStatus",
  async () => {
    const coutPageUrl = `https://65341c62e1b6f4c5904691be.mockapi.io/items?`;
    const { data } = await axios.get(coutPageUrl);

    return data;
  }
);

const initialState = {
  categotiType: 0,
  sortType: 0,
  countPages: [],
  selectPage: 1,
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategotiType: (state, action) => {
      state.categotiType = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setCountPages: (state, action) => {
      state.countPages = action.payload;
    },
    setSelectPage: (state, action) => {
      state.selectPage = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchCountPage.pending, (state) => {
      state.countPages = [];
    });
    builder.addCase(fetchCountPage.fulfilled, (state, action) => {
      state.countPages = action.payload;
    });
    builder.addCase(fetchCountPage.rejected, (state) => {
      state.countPages = [];
    });
  },
});

export const selectFilter = (state) => state.filter;

export const {
  setCategotiType,
  setSortType,
  setCountPages,
  setSelectPage,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
