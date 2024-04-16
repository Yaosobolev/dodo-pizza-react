import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountPage = createAsyncThunk<number>(
  "filter/fetchCountPageStatus",
  async () => {
    const coutPageUrl = `https://65341c62e1b6f4c5904691be.mockapi.io/items?`;
    const { data } = await axios.get(coutPageUrl);

    return data.length;
  }
);
