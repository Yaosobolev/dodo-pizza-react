import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem, fetchPizzasArg } from "./types";
import axios from "axios";

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
