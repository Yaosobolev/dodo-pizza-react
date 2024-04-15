import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  setUniqPizzas,
  setPizzas,
  setDecrementPizza,
  setAmount,
  setRemovePizza,
  selectCart,
} from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../redux/store";

type CartPizzaProps = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: string;
  count: number;
};

type CountSelectedPizza = number | undefined;
type NameSelectedPizza = CartPizzaProps | undefined;

const CartPizza: React.FC<CartPizzaProps> = ({
  id,
  type,
  size,
  title,
  price,
  imageUrl,
}) => {
  const dispatch = useAppDispatch();
  const { uniqPizzas } = useSelector(selectCart);

  const countSelectedPizza = uniqPizzas.map((item: CartPizzaProps) => {
    if (id === item.id && type === item.type && size === item.size) {
      return item.count;
    }
  });
  const nameSelectedPizza = uniqPizzas.map((item: CartPizzaProps) => {
    if (title === item.title && type === item.type && size === item.size) {
      return item;
    }
  });

  const checkCountSelectedPizza = countSelectedPizza.filter(
    (item: CountSelectedPizza) => item !== undefined
  );

  const checkNameSelectedPizza = nameSelectedPizza.filter(
    (item: CartPizzaProps | undefined): item is CartPizzaProps =>
      item !== undefined
  );
  const [counts, setCount] = useState<number>(Number(checkCountSelectedPizza));

  const handlerIncrement = (data: CartPizzaProps) => {
    setCount(counts + 1);
    dispatch(setPizzas(data));
    dispatch(setUniqPizzas());
  };

  useEffect(() => {
    setCount(Number(checkCountSelectedPizza) + 1);
    dispatch(setAmount());
  }, [checkCountSelectedPizza]);

  const handlerDecrement = (): void => {
    dispatch(setDecrementPizza(checkNameSelectedPizza));
    dispatch(setUniqPizzas());
    dispatch(setAmount());
  };

  const handlerRemovePizza = (): void => {
    dispatch(setRemovePizza(checkNameSelectedPizza));
    dispatch(setUniqPizzas());
    dispatch(setAmount());
  };

  const pizza = {
    imageUrl: imageUrl,
    title: title,
    size: size,
    type: type,
    price: price,
    id: id,
    count: counts,
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} тесто, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        {/* ------------------------------ */}
        <div
          onClick={() => handlerDecrement()}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            ></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            ></path>
          </svg>
        </div>
        <b>{checkCountSelectedPizza}</b>
        {/* +++++++++++++++++ */}
        <div
          onClick={() => handlerIncrement(pizza)}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            ></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            ></path>
          </svg>
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price} ₽</b>
      </div>
      <div onClick={() => handlerRemovePizza()} className="cart__item-remove">
        <div className="button button--outline button--circle">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            ></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default CartPizza;
