import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { setPizzas, setAmount } from "../../redux/cart/slice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { selectCart } from "../../redux/cart/selectors";

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  count: number;
};

type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: string;
  count: number;
};

type CountSelectedPizza = number | undefined;

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  price,
  types,
  sizes,
}) => {
  const dispatch = useAppDispatch();

  const [sizeActive, setSizeActive] = useState<number>(0);
  const [typeActive, setTypeActive] = useState<number>(0);

  const { pizzas } = useSelector(selectCart);

  const isMounted = useRef<boolean>(false);

  const typeName = ["тонкое", "традиционное", "толстое"];
  const sizeName = ["26", "30", "40"];

  const handlerPizza = (data: Pizza): void => {
    dispatch(setPizzas(data));
    dispatch(setAmount());
  };

  const countSelectedPizza = pizzas.map((item: Pizza) => {
    if (
      id === item.id &&
      typeName[typeActive] === item.type &&
      sizeName[sizeActive] === item.size
    ) {
      return item.count;
    }
  });

  const checkCountSelectedPizza = countSelectedPizza.filter(
    (item: CountSelectedPizza) => item !== undefined
  );
  const pizza = {
    imageUrl: imageUrl,
    title: title,
    size: sizeName[sizeActive],
    type: typeName[typeActive],
    price: price,
    id: id,
    count: Number(checkCountSelectedPizza),
  };

  useEffect(() => {
    const json = JSON.stringify(pizzas);

    if (isMounted.current) {
      localStorage.setItem("pizza", json);
    }
    isMounted.current = true;
  }, [pizzas]);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => {
              return (
                <li
                  key={type}
                  onClick={() => setTypeActive(type)}
                  className={typeActive === type ? "active" : " "}
                >
                  {typeName[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li
                  onClick={() => setSizeActive(index)}
                  key={index}
                  className={sizeActive === index ? "active" : " "}
                >
                  {size} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={() => handlerPizza(pizza)}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>
              {checkCountSelectedPizza.length !== 0
                ? Number(checkCountSelectedPizza)
                : 0}
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};
