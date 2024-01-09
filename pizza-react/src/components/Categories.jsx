const Categories = (props) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
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
