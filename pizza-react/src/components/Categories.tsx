type CategoriesProps = {
  categotiType: number;
  setCategoriType: any;
};

const Categories: React.FC<CategoriesProps> = ({
  categotiType,
  setCategoriType,
}) => {
  const categories: string[] = [
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
              onClick={() => setCategoriType(id)}
              className={categotiType === id ? "active" : ""}
              key={id}
            >
              {categori}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
