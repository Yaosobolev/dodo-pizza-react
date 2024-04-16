import { useSelector } from "react-redux";
import { setSelectPage } from "../../redux/filter/slice";

import style from "./CountPage.module.scss";
import { useAppDispatch } from "../../redux/store";
import { memo } from "react";
import { selectFilter } from "../../redux/filter/selectors";

type CountPageProps = {
  index: number;
};

export const CountPage: React.FC<CountPageProps> = memo(({ index }) => {
  const { selectPage } = useSelector(selectFilter);
  const dispatch = useAppDispatch();

  const CountPageHandler = (index: number): void => {
    dispatch(setSelectPage(index));
  };

  return (
    <>
      <div
        onClick={() => CountPageHandler(index)}
        className={index === selectPage ? style.selected : style.root}
      >
        {index}
      </div>
    </>
  );
});
