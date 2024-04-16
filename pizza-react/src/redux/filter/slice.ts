import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState } from "./types";
import { fetchCountPage } from "./asyncActions";

const initialState: FilterSliceState = {
  categotiType: 0,
  sortType: 0,
  countPages: 0,
  selectPage: 1,
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategotiType: (state, action: PayloadAction<number>) => {
      state.categotiType = action.payload;
    },
    setSortType: (state, action: PayloadAction<number>) => {
      state.sortType = action.payload;
    },
    setCountPages: (state, action: PayloadAction<number>) => {
      state.countPages = action.payload;
    },
    setSelectPage: (state, action: PayloadAction<number>) => {
      state.selectPage = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchCountPage.pending, (state) => {
      state.countPages = 0;
    });
    builder.addCase(fetchCountPage.fulfilled, (state, action) => {
      state.countPages = action.payload;
    });
    builder.addCase(fetchCountPage.rejected, (state) => {
      state.countPages = 0;
    });
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
