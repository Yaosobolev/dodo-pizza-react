import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchCountPage = createAsyncThunk<number>(
  "filter/fetchCountPageStatus",
  async () => {
    const coutPageUrl = `https://65341c62e1b6f4c5904691be.mockapi.io/items?`;
    const { data } = await axios.get(coutPageUrl);

    return data.length;
  }
);

interface FilterSliceState {
  categotiType: number;
  sortType: number;
  countPages: number;
  selectPage: number;
  searchValue: string;
}

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

export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategotiType,
  setSortType,
  setCountPages,
  setSelectPage,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
