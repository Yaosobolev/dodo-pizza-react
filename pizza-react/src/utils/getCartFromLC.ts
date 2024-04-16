import { CartPizza } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLC = () => {
  const data = localStorage.getItem("pizza");
  const items = data ? JSON.parse(data) : [];

  const totalPrice = calcTotalPrice(items);
  return {
    items,
    totalPrice,
  };
};
