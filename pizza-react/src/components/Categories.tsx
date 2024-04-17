import { memo } from "react";

type CategoriesProps = {
  categotiType: number;
  setCategoriType: (id: number) => void;
};

export const Categories: React.FC<CategoriesProps> = memo(
  ({ categotiType, setCategoriType }) => {
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
  }
);
