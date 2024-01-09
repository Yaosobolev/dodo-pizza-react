import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPizzas,
  setUniqPizzas,
  setAmount,
} from "../../redux/slices/pizzaSlice";

const PizzaBlock = (props) => {
  const dispatch = useDispatch();

  const [sizeActive, setSizeActive] = useState(0);
  const [typeActive, setTypeActive] = useState(0);
  const uniqPizzas = useSelector((state) => state.pizza.uniqPizzas);

  const typeName = ["тонкое", "традиционное", "толстое"];
  const sizeName = ["26", "30", "40"];

  const handlerPizza = (data) => {
    dispatch(setPizzas(data));
    dispatch(setAmount());
    dispatch(setUniqPizzas());
    setCount(counts + 1);
  };

  const countSelectedPizza = uniqPizzas.map((item) => {
    if (
      props.id === item.id &&
      typeName[typeActive] === item.type &&
      sizeName[sizeActive] === item.size
    ) {
      return item.count;
    }
  });

  const checkCountSelectedPizza = countSelectedPizza.filter(
    (item) => item !== undefined
  );
  const [counts, setCount] = useState(1);

  useEffect(() => {
    setCount(
      checkCountSelectedPizza.length !== 0
        ? Number(checkCountSelectedPizza) + 1
        : 1
    );
  }, [sizeName, typeName]);

  const pizza = {
    imageUrl: props.imageUrl,
    title: props.title,
    size: sizeName[sizeActive],
    type: typeName[typeActive],
    price: props.price,
    id: props.id,
    count: counts,
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={props.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{props.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {props.types.map((type) => {
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
            {props.sizes.map((size, index) => {
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
          <div className="pizza-block__price">от {props.price} ₽</div>
          <button
            onClick={(data) => handlerPizza(pizza)}
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

export default PizzaBlock;
