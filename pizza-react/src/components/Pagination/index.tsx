import style from "./Pagination.module.scss";
import { CountPage } from "./CountPage";
import { memo } from "react";

type PaginationProps = {
  countPage: number;
};

export const Pagination: React.FC<PaginationProps> = memo(({ countPage }) => {
  const paginationName = new Array(countPage).fill(null).map((_, i) => {
    return i + 1;
  });

  return (
    <div className={style.root}>
      {paginationName.map((_, index) => {
        return <CountPage key={index} index={index + 1} />;
      })}
    </div>
  );
});
