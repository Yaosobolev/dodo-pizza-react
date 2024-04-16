import { CartPizza } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartPizza[]) => {
  return items.reduce((sum: number, item: CartPizza) => {
    return item.count * item.price + sum;
  }, 0);
};
