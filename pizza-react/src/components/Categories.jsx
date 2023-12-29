import { React, useState } from "react";

const Categories = (props) => {
  // const [active, setActive] = useState(0);
  // const [active, setCategoriType] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const handlerActive = (index) => {
    setActive(index);
  };
  // console.log();
  return (
    <div className="categories">
      <ul>
        {categories.map((categori, id) => {
          return (
            <li
              onClick={() => props.setCategoriType(id)}
              className={props.categotiType === id ? "active" : ""}
              key={id}
            >
              {categori}
              {/* {console.log(props.categotiType)} */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
