import { CartPizza } from "../redux/slices/cartSlice";

export const countPizzas = (items: CartPizza[]) => {
  return items.reduce((sum: number, item: CartPizza) => {
    return item.count + sum;
  }, 0);
};
