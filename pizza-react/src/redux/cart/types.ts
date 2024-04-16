export type CartPizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: string;
  count: number;
};

export interface CartSliceState {
  pizzas: CartPizza[];
  amount: number;
}
