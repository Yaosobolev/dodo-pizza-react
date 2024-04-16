export type fetchPizzasArg = {
  selectPage: number;
  categotiType: number;
  sortType: number;
  handleSearch: string;
};

export type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  count: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  Items: PizzaItem[];
  status: Status;
}
