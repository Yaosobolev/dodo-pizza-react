import style from "./Pagination.module.scss";
import { CountPage } from "./CountPage";

type PaginationProps = {
  countPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({ countPage }) => {
  const array = new Array(countPage).fill(null).map((_, i) => {
    return i + 1;
  });

  return (
    <div className={style.root}>
      {array.map((item, index) => {
        return <CountPage name={item} key={index} index={index + 1} />;
      })}
    </div>
  );
};
