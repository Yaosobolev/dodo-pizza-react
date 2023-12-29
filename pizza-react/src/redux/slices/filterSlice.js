import { createSlice } from "@reduxjs/toolkit";

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
});

export const {
  setCategotiType,
  setSortType,
  setCountPages,
  setSelectPage,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
